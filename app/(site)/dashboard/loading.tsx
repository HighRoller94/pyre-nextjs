"use client";

import TitleSkel from "@/components/Skels/TitleSkel";
import MediaContainerSkel from "@/components/Skels/MediaContainerSkel";
import TracksContainerSkel from "@/components/Skels/TracksContainerSkel";

export default function loading() {
  return (
    <>
      <TitleSkel />
      <TracksContainerSkel count={6} twoCol={true} />
      <TitleSkel />
      <MediaContainerSkel />
    </>
  );
}
