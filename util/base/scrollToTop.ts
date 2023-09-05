"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export const ScrollToTop = (divId) => {
  const divElement = document.getElementById(divId);
  if (divElement) {
    divElement.scrollTop = 0;
  }
};