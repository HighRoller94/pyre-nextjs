"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import Input from "../Base/Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    if (value) {
      const query = {
        title: debouncedValue,
      };

      const url = qs.stringifyUrl({
        url: "/search",
        query: query,
      });

      router.push(url);
    }
  }, [debouncedValue, router]);

  return (
    <div className="flex items-center w-full md:min-w-[400px] gap-4">
      <Input
        placeholder="What shall we listen to today?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {/* <div
        className={`${
          spotifySearch ? "bg-neutral-700" : "bg-neutral-800"
        } rounded-md transition py-3 px-4 ml-6 cursor-pointer max-h-[46px]`}
        onClick={() => {
          setSpotifySearch(!spotifySearch);
        }}
      >
        <FaSpotify size={22} className=" text-green-600" />
      </div> */}
    </div>
  );
};

export default SearchInput;
