import AsyncAlert from "@/shared/components/async-alert";
import Button from "@/shared/components/button";
import { Trash2 } from "lucide-react-native";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { useDeleteStory, useRetryStory } from "../mutations/story";
import { Status, Story } from "../types/story";

const statusMap = {
  [Status.GENERATING]: {
    statusMessage: "Generating...",
    buttonText: "Please Wait",
    buttonDisabled: true,
  },
  [Status.COMPLETED]: {
    statusMessage: "Ready to Read",
    buttonText: "Read Now",
    buttonDisabled: false,
  },
  [Status.FAILED]: {
    statusMessage: "Failed to Generate",
    buttonText: "Retry",
    buttonDisabled: false,
  },
  [Status.QUEUED]: {
    statusMessage: "Queued for generation",
    buttonText: "Please Wait...",
    buttonDisabled: true,
  },
  DEFAULT: {
    statusMessage: "Unknown Status",
    buttonText: "N/A",
    buttonDisabled: true,
  },
};

const StoryPreview = ({
  id,
  title,
  status,
}: Pick<Story, "id" | "title" | "status">) => {
  const { mutate: deleteStory } = useDeleteStory();
  const { mutate: retryStory } = useRetryStory();

  const { statusMessage, buttonText, buttonDisabled } =
    statusMap[status] || statusMap.DEFAULT;

  const handleDeleteStory = async (storyId: string) => {
    const response = await AsyncAlert({
      title: "Delete Story",
      message: "Are you sure you want to delete this story?",
    });

    if (!response) return;

    deleteStory(storyId, {
      onSuccess: (mutationData) => {
        Alert.alert(
          "Success",
          mutationData?.message || "Story deleted successfully"
        );
      },
      onError: (error) => {
        Alert.alert("Error", error?.message || "An error occurred");
      },
    });
  };

  const handleRetryStory = async (storyId: string) => {
    retryStory(storyId, {
      onError: (error) => {
        Alert.alert("Error", error?.message || "An error occurred");
      },
    });
  };

  return (
    <View className="w-[48%] relative bg-white rounded-lg p-2 justify-start items-center">
      <Button
        icon={<Trash2 size={24} color="red" />}
        size="small"
        variant="icon"
        className="absolute top-0 right-1 z-10 bg-white rounded-md"
        onPress={() => handleDeleteStory(id)}
      />
      <Image
        source={{
          uri: "https://placehold.co/400.png",
        }}
        style={{ height: 100 }}
        className="w-full rounded-lg mb-2 object-cover"
      />
      {title ? (
        <Text className="text-sm font-bold text-center mb-2">{title}</Text>
      ) : null}
      <Text className="text-xs text-center mb-2">{statusMessage}</Text>
      <TouchableOpacity
        onPress={
          status === Status.FAILED ? () => handleRetryStory(id) : undefined
        }
        disabled={buttonDisabled}
        className="bg-gray-200 py-2 px-4 rounded-full disabled:opacity-50"
      >
        <Text className="text-gray-700 font-bold">{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoryPreview;
