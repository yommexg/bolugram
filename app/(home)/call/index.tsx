import {
  CallContent,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";

const callId = "default_e0ed46f6-01eb-4415-b1aa-31173a950bee";

export default function CallScreen() {
  const client = useStreamVideoClient();

  const call = client?.call("default", callId);
  call?.join({ create: true });

  return (
    call && (
      <StreamCall call={call}>
        <CallContent />
      </StreamCall>
    )
  );
}
