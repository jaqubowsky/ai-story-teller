import { supabase } from "@/supabase";
import { createStorySchema } from "../schemas/create-story-schema";
import { deleteStorySchema } from "../schemas/delete-story-schema";
import { retryStorySchema } from "../schemas/retry-story-schema";
import { Story } from "../types/story";

export const createStory = async (unsafeData: unknown) => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) throw new Error("User not authenticated");

  const { success, data } = createStorySchema.safeParse(unsafeData);
  if (!success) throw new Error("Invalid data provided. Please try again.");

  const {
    storyType: story_type,
    additionalInstructions: prompt,
    characters,
    language,
  } = data;

  const { error } = await supabase.from("stories").insert({
    story_type,
    prompt,
    language,
    characters_snapshot: characters,
    status: "QUEUED",
    author: sessionData.session?.user.id,
  });
  if (error) throw new Error(error.message);

  return {
    message: "Story generation started successfully",
  };
};

export const getStories = async (): Promise<{
  data: Story[] | [];
  message: string;
}> => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) throw new Error("User not authenticated");

  const { data: stories, error } = await supabase.from("stories").select("*");
  if (error) throw new Error("Error fetching stories");

  return {
    data: stories,
    message: "Stories fetched successfully",
  };
};

export const deleteStory = async (unsafeData: unknown) => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) throw new Error("User not authenticated");

  const { success, data: storyId } = deleteStorySchema.safeParse(unsafeData);
  if (!success) throw new Error("Invalid data provided. Please try again.");

  const { error } = await supabase.from("stories").delete().match({
    id: storyId,
  });
  if (error) throw new Error("Error deleting story");

  return {
    message: "Story deleted successfully",
  };
};

export const retryStory = async (unsafeData: unknown) => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) throw new Error("User not authenticated");

  const { success, data: storyId } = retryStorySchema.safeParse(unsafeData);
  if (!success) throw new Error("Invalid data provided. Please try again.");

  const { error } = await supabase.from("stories").update({
    status: "QUEUED",
  }).match({
    id: storyId,
  });
  if (error) throw new Error("Error retrying story.");

  return {
    message: "Story retried successfully",
  };
};
