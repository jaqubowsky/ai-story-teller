import Button from '@/shared/components/button';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { createStoryTypeForm } from '../schemas/create-story-schema';

type AdditionalInstructionsStepProps = {
  form: UseFormReturn<createStoryTypeForm>;
  onSubmit: (data: createStoryTypeForm) => void;
};

const AdditionalInstructionsStep = ({
  form,
  onSubmit,
}: AdditionalInstructionsStepProps) => {
  return (
    <View className="flex-col gap-4">
      <Text className="text-white text-base font-bold mb-4 ml-3">
        Add additional instructions:
      </Text>
      <Controller
        control={form.control}
        name="additionalInstructions"
        render={({ field }) => (
          <TextInput
            {...field}
            placeholder="Type your instructions here..."
            className="bg-white text-black p-4 rounded-lg"
            multiline
          />
        )}
      />
      {form.formState.errors.additionalInstructions && (
        <Text className="text-red-500">
          {form.formState.errors.additionalInstructions.message}
        </Text>
      )}
      <Button
        onPress={form.handleSubmit(onSubmit)}
        title="Submit"
        disabled={form.formState.isSubmitting}
      />
    </View>
  );
};

export default AdditionalInstructionsStep;
