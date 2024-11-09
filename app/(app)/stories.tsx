import StoryPreview from '@/features/stories/components/story-preview';
import { LinearGradient } from 'expo-linear-gradient';
import { WandIcon } from 'lucide-react-native';
import React, { useLayoutEffect, useRef } from 'react';
import { Animated, ScrollView, Text, View } from 'react-native';

const stories = [
  { title: 'The Magic Treehouse', image: 'https://via.placeholder.com/100' },
  { title: 'Space Explorers', image: 'https://via.placeholder.com/100' },
  { title: "Fairy's Garden", image: 'https://via.placeholder.com/100' },
  { title: 'Dinosaur Adventure', image: 'https://via.placeholder.com/100' },
  { title: "Pirate's Treasure", image: 'https://via.placeholder.com/100' },
  { title: 'Enchanted Forest', image: 'https://via.placeholder.com/100' },
];

export default function StoriesScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <LinearGradient colors={['#a855f7', '#ec4899']} className="flex-1">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="mb-4">
          <View className="flex-row items-center mb-4 justify-center gap-2">
            <WandIcon size={24} color="white" />
            <Text className="text-2xl font-bold text-white">
              Your Magical Stories
            </Text>
          </View>
          <Animated.View
            style={{ opacity: fadeAnim }}
            className="flex-row flex-wrap justify-between"
          >
            {stories.map((story, index) => (
              <StoryPreview key={index} story={story} />
            ))}
          </Animated.View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
