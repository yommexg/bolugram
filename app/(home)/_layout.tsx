import { useAuth } from "@/providers/AuthProvider";
import CallProvider from "@/providers/CallProvider";
import ChatProvider from "@/providers/ChatProvider";
import NotificationsProvider from "@/providers/NotificationsProvider";
import VideoProvider from "@/providers/VideoProvider";
import { Redirect, Stack } from "expo-router";

export default function HomeLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <ChatProvider>
      <NotificationsProvider>
        <VideoProvider>
          <CallProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </CallProvider>
        </VideoProvider>
      </NotificationsProvider>
    </ChatProvider>
  );
}
