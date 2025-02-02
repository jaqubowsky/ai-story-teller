export type Gender = "male" | "female";

export type Language =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "ja"
  | "ko"
  | "zh"
  | "ru";

export const enum Status {
  GENERATING = "GENERATING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  QUEUED = "QUEUED",
}

export type Character = {
  name: string;
  age?: number;
  interests?: string;
  gender?: Gender;
};

export type Story = {
  id: string;
  title: string;
  description: string;
  content: string;
  characters_snapshot: Character[];
  story_type: string;
  language: Language;
  prompt: string;
};
