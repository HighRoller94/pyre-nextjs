"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ScrollToBottom() {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);
  return null;
}