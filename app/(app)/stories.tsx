import StoryPreview from "@/features/stories/components/story-preview";
import { useGetStories } from "@/features/stories/mutations/story";
import Background from "@/shared/components/background";
import Button from "@/shared/components/button";
import { useRouter } from "expo-router";
import { WandIcon } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Reanimated, { FadeIn } from "react-native-reanimated";

export default function StoriesScreen() {
  const router = useRouter();

  const { data, isLoading } = useGetStories();

  return (
    <Background>
      {!isLoading && data.data.length ? (
        <View className="flex-row items-center mb-4 justify-center gap-2">
          <WandIcon size={32} color="white" />
          <Text className="text-3xl px-4 pt-4 font-bold text-white">
            Your Magical Stories
          </Text>
        </View>
      ) : null}

      {!isLoading && !data.data.length ? (
        <View className="flex-col items-center mb-4 justify-center h-full gap-2">
          <Text className="text-3xl px-4 pt-4 font-bold text-white">
            No magical stories yet.
          </Text>
          <Button
            icon={<WandIcon size={24} color="white" />}
            variant="primary"
            size="small"
            title="Create your first one"
            className="w-auto px-6"
            onPress={() => router.push("./")}
          />
        </View>
      ) : null}

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 60 }}
      >
        <Reanimated.View
          className="flex-row flex-wrap justify-between gap-2"
          entering={FadeIn.duration(1000)}
        >
          {isLoading && !data.data.length ? (
            <ActivityIndicator color="#a855f7" />
          ) : null}
          {!isLoading && data.data.length
            ? data.data.map((story, index) => (
                <StoryPreview
                  id={story.id}
                  status={story.status}
                  title={story.title}
                  key={index}
                />
              ))
            : null}
        </Reanimated.View>
      </ScrollView>
    </Background>
  );
}
