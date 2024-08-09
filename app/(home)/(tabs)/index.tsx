import { ChannelList } from "stream-chat-expo";

import { Link, Redirect, router, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";

export default function MainTabScreen() {
  const { user } = useAuth();

  return (
    user && (
      <>
        {/* <Redirect href={"/(home)/call"} /> */}
        <Stack.Screen
          options={{
            headerRight: () => {
              return (
                <Link href={"/(home)\\users"} style={{ marginHorizontal: 15 }}>
                  <FontAwesome5 name="users" size={21} color="grey" />
                </Link>
              );
            },
          }}
        />
        <ChannelList
          filters={{ members: { $in: [user?.id] } }}
          onSelect={(channel) => router.push(`/channel\\${channel.cid}`)}
        />
      </>
    )
  );
}
