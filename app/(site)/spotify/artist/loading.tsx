"use client";

import TracksContainerSkel from "@/components/Skels/TracksContainerSkel";
import HeaderSkel from "@/components/Skels/HeaderSkel";
import TitleSkel from "@/components/Skels/TitleSkel";

export default function loading() {
  return (
    <>
      <HeaderSkel />
      <TitleSkel />
      <TracksContainerSkel count={6} twoCol={true} />
      <TitleSkel />
    </>
  );
}
