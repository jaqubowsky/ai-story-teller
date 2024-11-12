import { create } from 'zustand';
import { Character } from '../types/characters';

export const languages = {
  en: 'English',
  pl: 'Polish',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ru: 'Russian',
  zh: 'Chinese',
  ja: 'Japanese',
  ko: 'Korean',
  ar: 'Arabic',
  tr: 'Turkish',
  hi: 'Hindi',
} as const;

type StoryStore = {
  selectedChars: Pick<Character, 'id'>[];
  selectedType: string;
  additionalInstructions: string;
  language: keyof typeof languages;
  setSelectedChars: (selectedChars: Pick<Character, 'id'>[]) => void;
  setSelectedType: (selectedType: string) => void;
  setAdditionalInstructions: (instructions: string) => void;
  setLanguage: (language: keyof typeof languages) => void;
};

const useStoryStore = create<StoryStore>((set) => ({
  selectedChars: [],
  selectedType: '',
  additionalInstructions: '',
  language: 'en',
  setSelectedChars: (selectedChars) => set({ selectedChars }),
  setSelectedType: (selectedType) => set({ selectedType }),
  setAdditionalInstructions: (instructions) =>
    set({ additionalInstructions: instructions }),
  setLanguage: (language) => set({ language }),
}));

export default useStoryStore;
