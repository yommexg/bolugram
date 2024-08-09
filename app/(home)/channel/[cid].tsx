import { Ionicons } from "@expo/vector-icons";
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Channel as ChannelType } from "stream-chat";
import {
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
} from "stream-chat-expo";
import * as Crypto from "expo-crypto";

export default function ChannelScreen() {
  const [channel, setChannel] = useState<ChannelType | null>();

  const { cid } = useLocalSearchParams<{ cid: string }>();

  const { client } = useChatContext();

  const videoClient = useStreamVideoClient();

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });

      setChannel(channels[0]);
    };

    fetchChannel();
  }, [cid]);

  const joinCall = async () => {
    const videoCallMembers = channel
      ? Object.values(channel.state.members).map((member) => ({
          user_id: member.user_id ?? "unknown_id", // Provide a default value if user_id is undefined
        }))
      : [];

    // Create a call using channel memebers
    if (videoClient) {
      const call = videoClient.call("default", Crypto.randomUUID());

      await call.getOrCreate({
        data: {
          members: videoCallMembers,
        },
      });
    }

    // Navigate to the call screen
    router.push("/call");
  };

  if (!channel) {
    return <ActivityIndicator />;
  }

  const clientId = client.userID;
  const members = channel?.state.members;
  const otherMemberNames = Object.values(members)
    .filter((member) => member.user?.id !== clientId)
    .map((member) => member.user?.name ?? "Unknown");

  // console.log(JSON.stringify(channel.state.members, null, 2));

  return (
    <Channel channel={channel} audioRecordingEnabled>
      <Stack.Screen
        options={{
          title: otherMemberNames[0],
          headerRight: () => (
            <Ionicons name="call" size={20} color="gray" onPress={joinCall} />
          ),
        }}
      />
      <MessageList />
      <SafeAreaView edges={["bottom"]}>
        <MessageInput />
      </SafeAreaView>
    </Channel>
  );
}
