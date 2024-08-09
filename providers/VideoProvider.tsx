import { tokenProvider } from "@/utils/tokenProvider";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/lib/supabase";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY || "";

export default function VideoProvider({ children }: PropsWithChildren) {
  const [videoClient, setvideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const { profile } = useAuth();

  useEffect(() => {
    if (!profile) {
      return;
    }
    const initVideoClient = async () => {
      const user = {
        id: profile.id,
        name: profile.full_name,
        image: supabase.storage.from("avatars").getPublicUrl(profile.avatar_url)
          .data.publicUrl,
      };

      const client = new StreamVideoClient({ apiKey, user, tokenProvider });

      setvideoClient(client);
    };

    initVideoClient();

    return () => {
      if (videoClient) {
        videoClient.disconnectUser();
      }
    };
  }, [profile?.id]);

  if (!videoClient) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}
