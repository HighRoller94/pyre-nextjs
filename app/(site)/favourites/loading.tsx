"use client";

import TitleSkel from "@/components/Skels/TitleSkel";
import TracksContainerSkel from "@/components/Skels/TracksContainerSkel";
import MediaContainerSkel from "@/components/Skels/MediaContainerSkel";

export default function loading() {
  return (
    <>
      <TitleSkel />
      <TracksContainerSkel count={8} twoCol={true} />
      <TitleSkel />
      <MediaContainerSkel />
      <TitleSkel />
      <MediaContainerSkel />
    </>
  );
}
