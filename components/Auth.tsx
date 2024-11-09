import { supabase } from '@/lib/supabase';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function () {
  GoogleSignin.configure({
    scopes: ['email', 'profile'],
    iosClientId: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_GOOGLE_CLIENT_ID,
  });

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();

          const userInfo = await GoogleSignin.signIn();
          if (userInfo.type !== 'success')
            throw new Error('Google Sign In failed');

          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: userInfo.data.idToken as string,
          });

          console.log(data);
        } catch (error) {
          console.log(error);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      }}
    />
  );
}
