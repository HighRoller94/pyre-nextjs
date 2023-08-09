"use client";

import HeaderComponent from "./HeaderComponent";

interface DynamicHeaderProps {
  headerType: string;
  data: any;
}

const DynamicHeader: React.FC<DynamicHeaderProps> = ({
  data,
  headerType,
}) => {
  const getHeaderType = (headerType) => {
    switch (headerType) {
      case "Artist":
        return "ArtistHeader";
      case "Album":
        return "AlbumHeader";
      case "Playlist":
        return "PlaylistHeader";
      default:
        return "ProfileHeader";
    }
  };

  return <HeaderComponent data={data} headerType={getHeaderType(headerType)} />;
};

export default DynamicHeader;