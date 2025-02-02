import { mutationKeys } from "@/data/mutation-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStory,
  deleteStory,
  getStories,
  retryStory,
} from "../server/story";
import { Status, Story } from "../types/story";

export const useCreateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [mutationKeys.CREATE_STORY],
    mutationFn: async (unsafeData: unknown) => await createStory(unsafeData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [mutationKeys.GET_STORIES],
      });
    },
  });
};

export const useDeleteStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [mutationKeys.DELETE_STORY],
    mutationFn: async (unsafeData: unknown) => await deleteStory(unsafeData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [mutationKeys.GET_STORIES],
      });
    },
  });
};

export const useRetryStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [mutationKeys.DELETE_STORY],
    mutationFn: async (unsafeData: unknown) => await retryStory(unsafeData),
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
    refetchOnWindowFocus: true,
    refetchInterval: (data) =>
      data.state.data?.data.some((story: Story) =>
          story.status === Status.GENERATING || story.status === Status.QUEUED
        )
        ? 1000
        : false,
  });
};
