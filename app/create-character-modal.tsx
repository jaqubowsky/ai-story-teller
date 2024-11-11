import CharacterForm from '@/features/characters/components/character-form';
import { useSession } from '@/providers/session/session-provider';
import Background from '@/shared/components/background';
import { Redirect } from 'expo-router';

export default function CreateCharacterModal() {
  const { isLoggedIn } = useSession();

  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  return (
    <Background>
      <CharacterForm />
    </Background>
  );
}
