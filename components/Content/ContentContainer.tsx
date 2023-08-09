"use client";

import { useState } from "react";
import DynamicComponent from "./DynamicComponent";

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
    <div className="flex flex-col">
      <div className="p-6 w-full flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-white text-4xl font-bold">{header}</h1>
          <p className="text-neutral-400 text-lg pt-4 truncate">{subHeader}</p>
        </div>
        <div>
          {content.length > displayedContent ? (
            <button
              className="text-neutral-400 cursor-pointer hover:text-white transition flex justify-end items-end pr-6"
              onClick={showContent}
            >
              Show More
            </button>
          ) : (
            <>
              {content.length > 8 && (
                <button
                  className="text-neutral-400 cursor-pointer hover:text-white transition flex justify-end items-end pr-6"
                  onClick={hideContent}
                >
                  See Less
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="pl-6 pr-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
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
