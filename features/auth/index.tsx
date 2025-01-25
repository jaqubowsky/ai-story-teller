import { useSession } from "@/providers/session/session-provider";
import { supabase } from "@/supabase";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { Alert } from "react-native";

export default function () {
  GoogleSignin.configure({
    scopes: ["email", "profile"],
    iosClientId: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_GOOGLE_CLIENT_ID,
  });

  const { setIsLoggedIn } = useSession();

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();

          const userInfo = await GoogleSignin.signIn();
          if (userInfo.type !== "success") {
            throw new Error("Google Sign In failed");
          }

          const { error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: userInfo.data.idToken as string,
          });
          if (error) throw error;

          setIsLoggedIn(true);
          router.replace("/");
        } catch (error) {
          let errorMessage = "An unexpected error occurred. Please try again.";

          if (error instanceof Error) {
            errorMessage = error.message;
          } else if (error instanceof Object && "code" in error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              errorMessage = "Sign in was cancelled. Please try again.";
            } else if (error.code === statusCodes.IN_PROGRESS) {
              errorMessage =
                "Sign in is already in progress. Please try again.";
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              errorMessage =
                "Google Play Services are not available or outdated. Please try again.";
            }
          }
          Alert.alert("Error", errorMessage);
        }
      }}
    />
  );
}
