import { supabase } from "@/supabase";
import { createStorySchema } from "../schemas/create-story-schema";
import { deleteStorySchema } from "../schemas/delete-story-schema";
import { Story } from "../types/story";

const API_URL = process.env.EXPO_PUBLIC_SUPABASE_URL + "/functions/v1";

export const createStory = async (unsafeData: unknown) => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) throw new Error("User not authenticated");

  const { success, data } = createStorySchema.safeParse(unsafeData);
  if (!success) throw new Error("Invalid data provided. Please try again.");

  const response = await fetch(
    `${API_URL}/story`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionData.session.access_token}`,
      },
    },
  );
  if (!response.ok) throw new Error("Error creating story");

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
