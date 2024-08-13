import {
  CallContent,
  RingingCallContent,
  StreamCall,
  useCall,
  useCalls,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

// const callId = "default_e0ed46f6-01eb-4415-b1aa-31173a950bee";
export default function CallScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const calls = useCalls();

  const call = calls[0];

  // const client = useStreamVideoClient();

  // const call = client?.call("default", id);

  if (!call) {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
    return null;
  } else {
    return (
      <StreamCall call={call}>
        <RingingCallContent />
      </StreamCall>
    );
  }
}
