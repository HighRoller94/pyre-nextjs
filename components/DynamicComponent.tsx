import AlbumItem from "@/components/Album";
import ArtistItem from "@/components/Artist";
import PlaylistItem from "@/components/Playlist";

type DynamicComponentType = "ArtistItem" | "AlbumItem" | "PlaylistItem";

const componentMap: Record<DynamicComponentType, React.ComponentType<any>> = {
  AlbumItem,
  ArtistItem,
  PlaylistItem,
};

interface DynamicComponentProps {
  componentType: DynamicComponentType;
  data: Array<any>;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({
  componentType,
  data,
}) => {
  const ComponentToRender = componentMap[componentType];

  if (!ComponentToRender) {
    // Handle the case when an unsupported component type is provided
    return <div>Unsupported Component Type</div>;
  }

  return <ComponentToRender data={data} />;
};

export default DynamicComponent;