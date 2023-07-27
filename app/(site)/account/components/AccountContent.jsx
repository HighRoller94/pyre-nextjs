"use client";

import { useState, useEffect } from "react";
import SpotifySignIn from "@/components/SpotifySignIn";
import { useUser } from "@/hooks/useUser";

const AccountContent = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user?.app_metadata.provider === "spotify") {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [user?.app_metadata.provider]);

  return (
    <div className="flex flex-col justify-between w-4/12">
      <div className="flex gap-x-6 items-center my-8">
        {isChecked ? (
          <>Connected to Spotify</>
        ) : (
          <>
            <SpotifySignIn />
          </>
        )}
        <label className="flex cursor-pointer select-none items-center">
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              className="sr-only"
            />
            <div
              className={`box block h-8 w-14 rounded-full ${
                isChecked ? "bg-green-500" : "bg-neutral-600"
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                isChecked ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default AccountContent;
