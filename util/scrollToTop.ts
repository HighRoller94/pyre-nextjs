"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}