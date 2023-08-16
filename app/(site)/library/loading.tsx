"use client";

import HeaderSkel from "@/components/Skels/HeaderSkel";
import TracksContainerSkel from "@/components/Skels/TracksContainerSkel";

export default function loading() {
  return (
    <>
      <HeaderSkel />
      <TracksContainerSkel count={10} twoCol={false} />
    </>
  );
}
