import { fetchProfileById, fetchProfilePlaylists } from "@/util/spotify/fetchProfile";

import DynamicHeader from "@/components/Base/Headers/DynamicHeader";
import ProfileHeader from "../../../../components/Base/Headers/ProfileHeader";
import ContentContainer from "@/components/Content/ContentContainer";

export const revalidate = 0;

interface SearchProps {
  params: {
    id: string;
  };
}

export default async function UserPage({ params }: SearchProps) {
  const profileData = await fetchProfileById(params.id);
  const profilePlaylists = await fetchProfilePlaylists(params.id)

  return (
    <div>
      <DynamicHeader data={profileData} headerType="Profile"/>
      <ContentContainer
        header="Spotify Playlists"
        contentType="Playlist"
        content={profilePlaylists ? profilePlaylists : []}
      />
    </div>
  );
}
