import { mutationKeys } from "@/data/mutation-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStoryType } from "../schemas/create-story-schema";
import { createStory, getStories } from "../server/story";

export const useCreateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [mutationKeys.CREATE_STORY],
    mutationFn: async (unsafeData: createStoryType) =>
      await createStory(unsafeData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [mutationKeys.GET_STORIES],
      });
    },
  });
};

export const useGetStories = () => {
  return useQuery({
    queryKey: [mutationKeys.GET_STORIES],
    queryFn: async () => await getStories(),
    initialData: { data: [], message: "" },
  });
};
