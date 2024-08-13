import { useCalls } from "@stream-io/video-react-native-sdk";
import { router, useSegments } from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CallProvider({ children }: PropsWithChildren) {
  const calls = useCalls();
  const call = calls[0];

  const { top } = useSafeAreaInsets();
  const segements = useSegments();

  const isOnCallScreen = segements[1] === "call";

  useEffect(() => {
    if (!call) {
      return;
    }

    console.log(call.state.callingState);
    if (!isOnCallScreen && call.state.callingState === "ringing") {
      router.push(`/call/${call.id}`);
    }
  }, [calls, isOnCallScreen]);

  return (
    <>
      {children}
      {call && !isOnCallScreen && (
        <Pressable
          style={{
            position: "absolute",
            backgroundColor: "lightgreen",
            top: top + 40,
            left: 10,
            right: 10,
            padding: 10,
          }}
          onPress={() => router.push(`/call/${call.id}`)}
        >
          <Text>Active Call is Ongoing</Text>
        </Pressable>
      )}
    </>
  );
}
