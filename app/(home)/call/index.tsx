import { Text } from "react-native";
import {
  CallContent,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY || "";
const userId = "d32b0f94-4a07-4eca-b9f2-7b2c01381594";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZDMyYjBmOTQtNGEwNy00ZWNhLWI5ZjItN2IyYzAxMzgxNTk0In0.PTzo40B2APbGNEyIhGLGKzgwYJNGuS_R2Y34UpHMpfA";
const callId = "default_e0ed46f6-01eb-4415-b1aa-31173a950bee";
const user: User = { id: userId };

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

export default function CallScreen() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallContent />
      </StreamCall>
    </StreamVideo>
  );
}
