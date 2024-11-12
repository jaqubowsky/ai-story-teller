import Button from '@/shared/components/button';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

type AdditionalInstructionsStepProps = {
  onSubmit: () => void;
};

const AdditionalInstructionsStep = ({
  onSubmit,
}: AdditionalInstructionsStepProps) => {
  const [instructions, setInstructions] = useState('');

  return (
    <View className="flex-col gap-4">
      <Text className="text-white text-base font-bold mb-4 ml-3">
        Add additional instructions:
      </Text>
      <TextInput
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Type your instructions here..."
        className="bg-white text-black p-4 rounded-lg"
        multiline
      />
      <Button
        onPress={onSubmit}
        title="Submit"
        disabled={!instructions.trim()}
      />
    </View>
  );
};

export default AdditionalInstructionsStep;
