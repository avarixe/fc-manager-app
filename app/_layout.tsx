import { sessionAtom } from "@/atoms";
import { supabase } from "@/utils/supabase";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider as JotaiProvider, useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Root() {
  return (
    <JotaiProvider>
      <RootNavigator />
    </JotaiProvider>
  );
}

function RootNavigator() {
  const [session, setSession] = useAtom(sessionAtom);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setSession]);

  if (!ready) {
    SplashScreen.hideAsync();
  }

  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack.Protected>

      <StatusBar style="auto" />
    </Stack>
  );
}
