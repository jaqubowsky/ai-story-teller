import OpenAI from "https://deno.land/x/openai@v4.69.0/mod.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import {
  getSystemPrompt,
  getUserPrompt,
} from "../_shared/prompts/generate-story/index.ts";
import { Story } from "../_shared/types/story.ts";

class StoryGenerationEvent extends Event {
  readonly taskPromise: Promise<void>;

  constructor(taskPromise: Promise<void>) {
    super("storyGeneration");
    this.taskPromise = taskPromise;
  }
}

globalThis.addEventListener("storyGeneration", async (event) => {
  const taskPromise = (event as StoryGenerationEvent).taskPromise;
  try {
    await taskPromise;
  } catch (error) {
    console.error("Background task error:", error);
  }
});

Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization");
  const { characters, storyType, language, additionalInstructions } = await req
    .json();

  if (!authHeader) return new Response("msg_unauthorized", { status: 401 });

  const openai = new OpenAI({
    apiKey: Deno.env.get("EDGE_OPENAI_API_KEY"),
  });

  const supabaseClient = createClient(
    Deno.env.get("EDGE_SUPABASE_URL")!,
    Deno.env.get("EDGE_SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data: user, error } = await supabaseClient.from("profiles").select(
    "*",
  ).single();
  if (error || !user) return new Response("msg_unauthorized", { status: 401 });

  const storiesLimit = user.tokens;

  const { data: stories, error: storiesError } = await supabaseClient
    .from("stories")
    .select("*")
    .gte(
      "created_at",
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString(),
    );

  if (storiesError) {
    return new Response("msg_error_fetching_stories", { status: 500 });
  }

  const storiesGeneratedInThisMonth = stories.length;

  if (storiesGeneratedInThisMonth >= storiesLimit) {
    return new Response("msg_stories_limit_reached", { status: 403 });
  }

  const systemPrompt = getSystemPrompt();
  const userPrompt = getUserPrompt({
    characters,
    storyType,
    language,
    additionalInstructions,
  });

  const { data: story, error: storyError } = await supabaseClient.from(
    "stories",
  ).insert([{
    title: "Generating...",
    description: "Generating...",
    content: "Generating...",
    status: "GENERATING",
    author: user.id,
  }]).select().single();

  if (storyError) {
    return new Response("msg_error_creating_story", { status: 500 });
  }

  const taskPromise = openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    model: "gpt-4o-mini",
    stream: false,
  })
    .then(async (chatCompletion) => {
      const storyContent = chatCompletion.choices[0].message.content;
      if (!storyContent) throw new Error("Story generation failed");

      const parsedStory = JSON.parse(storyContent) as Story;

      const { error } = await supabaseClient.from("stories").update({
        title: parsedStory.title,
        description: parsedStory.description,
        content: parsedStory.content,
        status: "COMPLETED",
      }).eq("id", story.id);

      if (error) throw new Error("Error updating story");
    })
    .catch((error) => {
      console.error("Chat completion error:", error);

      return supabaseClient.from("stories").delete().eq("id", story.id);
    });

  const event = new StoryGenerationEvent(taskPromise);
  globalThis.dispatchEvent(event);

  return new Response("msg_started_story_generation", {
    status: 200,
  });
});
