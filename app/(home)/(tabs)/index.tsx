import { ChannelList } from "stream-chat-expo";

import { Link, router, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function MainTabScreen() {
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*");
    };

    fetchUsers();
  }, []);

  return (
    user && (
      <>
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
