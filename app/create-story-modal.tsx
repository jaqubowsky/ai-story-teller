import AdditionalInstructionsStep from '@/features/stories/components/additional-instructions-step';
import StoryTypeStep from '@/features/stories/components/story-type-step';
import { useCreateStory } from '@/features/stories/mutations/story';
import {
  createStoryFormSchema,
  createStoryType,
  createStoryTypeForm,
} from '@/features/stories/schemas/create-story-schema';
import { useSession } from '@/providers/session/session-provider';
import Background from '@/shared/components/background';
import useStoryStore from '@/shared/stores/story-generator-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Redirect, router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

const STEPS = {
  STORY_TYPE: 0,
  ADDITIONAL_INSTRUCTIONS: 1,
};

export default function CreateStoryModal() {
  const { isLoggedIn } = useSession();
  const [currentStep, setCurrentStep] = useState(STEPS.STORY_TYPE);

  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  const { mutate: createStory } = useCreateStory();
  const { selectedChars: characters, language } = useStoryStore();

  const form = useForm({
    resolver: zodResolver(createStoryFormSchema),
  });

  const onSubmit = async (data: createStoryTypeForm) => {
    const completeData = {
      ...data,
      characters,
      language,
    } as createStoryType;

    createStory(completeData, {
      onSuccess: (mutationData) => {
        form.reset();
        router.push('/stories');
        Alert.alert(
          'Success',
          mutationData?.message || 'Story created successfully'
        );
      },
      onError: (error) => {
        Alert.alert('Error', error?.message || 'An error occurred');
      },
    });
  };

  return (
    <Background>
      {currentStep === STEPS.STORY_TYPE && (
        <StoryTypeStep
          form={form}
          onNext={() => setCurrentStep(STEPS.ADDITIONAL_INSTRUCTIONS)}
        />
      )}
      {currentStep === STEPS.ADDITIONAL_INSTRUCTIONS && (
        <AdditionalInstructionsStep form={form} onSubmit={onSubmit} />
      )}
    </Background>
  );
}
