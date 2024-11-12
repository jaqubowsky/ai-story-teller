import AdditionalInstructionsStep from '@/features/stories/components/additional-instructions-step';
import StoryTypeStep from '@/features/stories/components/story-type-step';
import { useSession } from '@/providers/session/session-provider';
import Background from '@/shared/components/background';
import { Redirect } from 'expo-router';
import { useState } from 'react';

const STEPS = {
  STORY_TYPE: 0,
  ADDITIONAL_INSTRUCTIONS: 1,
};

export default function CreateStoryModal() {
  const { isLoggedIn } = useSession();
  const [currentStep, setCurrentStep] = useState(STEPS.STORY_TYPE);

  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  const onSubmit = () => {
    console.log('creating story...');
  };

  return (
    <Background>
      {currentStep === STEPS.STORY_TYPE && (
        <StoryTypeStep
          onNext={() => setCurrentStep(STEPS.ADDITIONAL_INSTRUCTIONS)}
        />
      )}
      {currentStep === STEPS.ADDITIONAL_INSTRUCTIONS && (
        <AdditionalInstructionsStep onSubmit={onSubmit} />
      )}
    </Background>
  );
}
