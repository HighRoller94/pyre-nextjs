import React from "react";
import TrackSkel from "./TrackSkel";

interface TracksContainerSkelProps {
  twoCol?: boolean;
  count?: number;
}

const TracksContainerSkel: React.FC<TracksContainerSkelProps> = ({
  twoCol,
  count,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex flex-col gap-y-2 gap-x-6 w-full px-6 my-4 ${
          twoCol && "lg:grid lg:grid-cols-2"
        }`}
      >
        {[...Array(count).keys()].map((i) => (
          <div className="flex items-center gap-x-4 w-full" key={i}>
            <div className="w-full">
              <TrackSkel />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TracksContainerSkel;
