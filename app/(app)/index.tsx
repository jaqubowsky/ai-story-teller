import { LinearGradient } from 'expo-linear-gradient';
import { WandIcon } from 'lucide-react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#a855f7', '#ec4899']} className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <View className="flex items-center justify-center flex-col w-full">
            <Animated.View entering={FadeIn.duration(1000)}>
              <Text className="text-2xl font-bold text-white mb-2">
                Let's Create Magic!
              </Text>
            </Animated.View>
            <Animated.View entering={FadeIn.duration(1500)}>
              <Text className="text-lg text-white mb-4">
                Your amazing story adventure begins here!
              </Text>
            </Animated.View>
            <Animated.View entering={FadeIn.duration(2000)}>
              <TouchableOpacity className="bg-white flex-row items-center py-3 px-6 rounded-full">
                <WandIcon size={24} color="black" />
                <Text className="text-black font-bold text-lg ml-2">
                  Start Your Story
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
