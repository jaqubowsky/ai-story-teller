import { supabase } from "@/supabase";
import {
  createStorySchema,
  createStoryType,
} from "../schemas/create-story-schema";
import { Story } from "../types/story";

export const createStory = async (unsafeData: createStoryType) => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) throw new Error("User not authenticated");

  const { success, data } = createStorySchema.safeParse(unsafeData);
  if (!success) throw new Error("Invalid data provided. Please try again.");

  const response = await fetch(
    process.env.NEXT_PUBLIC_SUPABASE_URL + "/story",
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
    message: "Story created successfully",
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
