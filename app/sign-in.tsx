import { Heading } from "@/components/ui/heading";
import { supabase } from "@/utils/supabase";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { View } from "react-native";

export default function SignIn() {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  });

  return (
    <View className="flex-1 justify-center items-center">
      <Heading size="2xl" className="mb-4">
        MyFC Manager
      </Heading>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo.data?.idToken) {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "google",
                token: userInfo.data.idToken,
              });
              console.log(error, data);
            } else {
              throw new Error("no ID token present!");
            }
          } catch (error: any) {
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
    </View>
  );
}
