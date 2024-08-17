import "expo-router/entry";
import messaging from "@react-native-firebase/messaging";
import { supabase } from "./lib/supabase";
import { StreamChat } from "stream-chat";
import { tokenProvider } from "./utils/tokenProvider";
import notifee from "@notifee/react-native";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //   console.warn("Remote Message", remoteMessage);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    console.log("ERROR: No active auth session");
    return;
  }

  const client = StreamChat.getInstance(
    process.env.EXPO_PUBLIC_STREAM_API_KEY!
  );

  // You can also provide tokenProvider instead of static token
  // await client._setToken({ id: userId }, tokenProvider)
  if (session) {
    client._setToken(
      {
        id: session?.user.id,
      },
      tokenProvider
    );
  }

  const message = await client.getMessage(remoteMessage.data.id);

  console.log(message);

  const channelId = await notifee.createChannel({
    id: "chat-messages",
    name: "Chat Messages",
  });

  const { stream, ...rest } = remoteMessage.data ?? {};
  const data = {
    ...rest,
    ...((stream as unknown as Record<string, string> | undefined) ?? {}), // extract and merge stream object if present
  };
  if (message.message.user) {
    await notifee.displayNotification({
      title: "New message from " + message.message.user.name,
      body: message.message.text,
      data,
      android: {
        channelId,
        // add a press action to open the app on press
        pressAction: {
          id: "default",
        },
      },
    });
  }
});
