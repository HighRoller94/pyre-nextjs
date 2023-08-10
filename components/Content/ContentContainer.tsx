"use client";

import { useState } from "react";
import DynamicComponent from "./DynamicComponent";
import TitleComponent from "../Base/TitleComponent";

interface ContentContainerProps {
  header: string;
  subHeader?: string;
  content: any;
  contentType: string;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  header,
  subHeader,
  content,
  contentType,
}) => {
  const [displayedContent, setDisplayContent] = useState(8);
  const visibleContent = content.slice(0, displayedContent);
  
  const showContent = () => {
    setDisplayContent(content.length);
  };

  const hideContent = () => {
    setDisplayContent(8);
  };

  const getComponentType = (contentType) => {
    switch (contentType) {
      case "Album":
        return "AlbumItem";
      case "Playlist":
        return "PlaylistItem";
      default:
        return "ArtistItem";
    }
  };

  return (
    <div className="flex flex-col my-1">
      <TitleComponent 
        header={header}
        subHeader={subHeader}
        displayedContent={displayedContent}
        contentCount={content.length}
        showContent={showContent}
        hideContent={hideContent}
      />
      <div className="pl-6 pr-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 my-4">
        {visibleContent.map((content, index) => (
          <DynamicComponent
            componentType={getComponentType(contentType)}
            key={content.id}
            data={content}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentContainer;
