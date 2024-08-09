import { useAuth } from "@/providers/AuthProvider";
import ChatProvider from "@/providers/ChatProvider";
import VideoProvider from "@/providers/VideoProvider";
import { Redirect, Stack } from "expo-router";

export default function HomeLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <ChatProvider>
      <VideoProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </VideoProvider>
    </ChatProvider>
  );
}
