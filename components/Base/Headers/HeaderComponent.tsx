import PlaylistHeader from "@/components/Base/Headers/PlaylistHeader";
import AlbumHeader from "@/components/Base/Headers/AlbumHeader";
import ArtistHeader from "@/components/Base/Headers/ArtistHeader";
import ProfileHeader from "@/components/Base/Headers/ProfileHeader";

type HeaderComponentType =
  | "PlaylistHeader"
  | "AlbumHeader"
  | "ArtistHeader"
  | "ProfileHeader";

const headerMap: Record<HeaderComponentType, React.ComponentType<any>> = {
  PlaylistHeader,
  AlbumHeader,
  ArtistHeader,
  ProfileHeader,
};

interface HeaderComponentProps {
  headerType: HeaderComponentType;
  data: any;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ headerType, data }) => {
  const ComponentToRender = headerMap[headerType];

  if (!ComponentToRender) {
    // Handle the case when an unsupported component type is provided
    return <div>Unsupported Component Type</div>;
  }

  return <ComponentToRender data={data} />;
};

export default HeaderComponent;
