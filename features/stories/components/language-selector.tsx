import Background from '@/shared/components/background';
import Button from '@/shared/components/button';
import { cn } from '@/shared/lib/twMerge';
import useStoryStore, {
  LANGUAGES,
} from '@/shared/stores/story-generator-store';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

type LanguageSelectorProps = {
  disabled?: boolean;
};

const LanguageSelector = ({ disabled }: LanguageSelectorProps) => {
  const { language, setLanguage } = useStoryStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <View className="relative">
      <TouchableOpacity
        disabled={disabled}
        onPress={toggleModal}
        className={cn(
          'bg-purple-500',
          'rounded-md flex-row gap-3 items-center justify-center w-16 h-11 disabled:opacity-50',
          'px-4 py-2'
        )}
      >
        <Text className="font-bold text-white">{language?.toUpperCase()}</Text>
      </TouchableOpacity>
      <Modal
        visible={isOpen}
        transparent={false}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <Background>
          <Text className="text-white text-2xl font-bold text-center mb-4">
            Select a language
          </Text>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <ScrollView
              contentContainerStyle={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {LANGUAGES.map((lang) => (
                <Button
                  key={lang}
                  onPress={() => {
                    setLanguage(lang);
                    setIsOpen(false);
                  }}
                  title={lang.toUpperCase()}
                  variant="primary"
                  size="medium"
                />
              ))}
            </ScrollView>
            <Button
              onPress={toggleModal}
              variant="secondary"
              title="Close"
              style={{ marginTop: 17 }}
            />
          </View>
        </Background>
      </Modal>
    </View>
  );
};

export default LanguageSelector;
