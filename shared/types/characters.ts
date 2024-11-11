export enum Gender {
  'male',
  'female',
}

export type Character = {
  id: string;
  name: string;
  age?: number;
  interests?: string;
  gender?: Gender;
};
