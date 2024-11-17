import { create } from "zustand";
import { Character } from "../types/characters";
import { Language } from "../types/languages";

export const LANGUAGES = [
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "ja",
  "ko",
  "zh",
] as const;

type StoryStore = {
  selectedChars: Character[];
  language: Language;
  setSelectedChars: (selectedChars: Character[]) => void;
  setLanguage: (language: Language) => void;
};

const useStoryStore = create<StoryStore>((set) => ({
  selectedChars: [],
  language: "en",
  setSelectedChars: (selectedChars) => set({ selectedChars }),
  setLanguage: (language) => set({ language }),
}));

export default useStoryStore;
