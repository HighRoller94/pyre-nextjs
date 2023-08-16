"use client";

import TracksContainerSkel from "@/components/Skels/TracksContainerSkel";
import HeaderSkel from "@/components/Skels/HeaderSkel";

export default function loading() {
  return (
    <>
      <HeaderSkel />
      <TracksContainerSkel count={10} />
    </>
  );
}
