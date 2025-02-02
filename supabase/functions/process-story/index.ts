import OpenAI from "https://deno.land/x/openai@v4.69.0/mod.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import {
  getSystemPrompt,
  getUserPrompt,
} from "../_shared/prompts/generate-story/index.ts";
import { Status, Story } from "../_shared/types/story.ts";

class StoryGenerationEvent extends Event {
  readonly taskPromise: Promise<void>;
  constructor(taskPromise: Promise<void>) {
    super("storyGeneration");
    this.taskPromise = taskPromise;
  }
}

globalThis.addEventListener("storyGeneration", (event) => {
  const taskPromise = (event as StoryGenerationEvent).taskPromise;

  taskPromise.then(
    () => console.log("Story generation task completed successfully."),
  ).catch((err) => {
    console.error("Background task error:", err);
  });
});

Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization");
  const expectedToken = `Bearer ${Deno.env.get("EDGE_AUTH_TOKEN")}`;
  if (authHeader !== expectedToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabaseClient = createClient(
    Deno.env.get("EDGE_SUPABASE_URL")!,
    Deno.env.get("EDGE_SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const openai = new OpenAI({
    apiKey: Deno.env.get("EDGE_OPENAI_API_KEY")!,
  });

  const batchSize = 5;
  const { data: stories, error: claimError } = await supabaseClient.rpc(
    "claim_queued_stories",
    { batch_size: batchSize },
  );

  if (claimError) {
    console.error("Error claiming stories:", claimError);
    return new Response("msg_error_claiming_stories", { status: 500 });
  }

  if (!stories || stories.length === 0) {
    console.log("No stories to process.");
    return new Response("No stories to process", { status: 200 });
  }

  (stories as Story[]).forEach((story) => {
    const taskPromise = (async () => {
      try {
        const systemPrompt = getSystemPrompt();
        const userPrompt = getUserPrompt({
          characters: story.characters_snapshot,
          storyType: story.story_type,
          language: story.language,
          additionalInstructions: story.prompt,
        });

        const chatCompletion = await openai.chat.completions.create({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
          model: "gpt-4o-mini",
          stream: false,
        });

        const storyContent = chatCompletion.choices[0].message.content;
        if (!storyContent) throw new Error("Story generation failed");

        const parsedStory = JSON.parse(storyContent) as Story;

        const { error: updateError } = await supabaseClient
          .from("stories")
          .update({
            title: parsedStory.title,
            description: parsedStory.description,
            content: parsedStory.content,
            status: Status.COMPLETED,
            updated_at: new Date().toISOString(),
          })
          .eq("id", story.id);

        if (updateError) {
          throw new Error("Error updating story " + story.id);
        }
      } catch (err) {
        console.error("Error processing story", story.id, err);

        await supabaseClient
          .from("stories")
          .update({
            status: Status.FAILED,
            updated_at: new Date().toISOString(),
          })
          .eq("id", story.id);
      }
    })();

    const eventObj = new StoryGenerationEvent(taskPromise);
    globalThis.dispatchEvent(eventObj);
  });

  return new Response("msg_stories_proceeded", { status: 200 });
});
