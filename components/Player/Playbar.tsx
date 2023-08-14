import * as Progress from "@radix-ui/react-progress";

const Playbar = ({ playDuration, totalDuration }) => {
  const startTime = "0:00";

  const timeStringToSeconds = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;
  };

  const getPercentageProgress = (startTime, totalDuration, playDuration) => {
    const startTimeInSeconds = timeStringToSeconds(startTime);
    const endTimeInSeconds = timeStringToSeconds(totalDuration);
    const currentTimeInSeconds = timeStringToSeconds(playDuration);

    const totalDurationInSeconds = endTimeInSeconds - startTimeInSeconds;
    const currentDurationInSeconds = currentTimeInSeconds - startTimeInSeconds;

    let progressPercentage =
      (currentDurationInSeconds / totalDurationInSeconds) * 100;

    // Ensure progressPercentage does not exceed 100%
    progressPercentage = Math.min(progressPercentage, 100);

    return progressPercentage;
  };

  const percentageProgress = getPercentageProgress(
    startTime,
    totalDuration,
    playDuration
  );

  return (
    <Progress.Root
      className="flex relative overflow-hidden w-screen md:w-full md:max-w-[400px] h-[5px] bg-neutral-600 md:rounded-full"
      value={percentageProgress}
    >
      <Progress.Indicator
        className="bg-orange-500 w-full h-full"
        style={{ transform: `translateX(-${100 - percentageProgress}%)` }}
      />
    </Progress.Root>
  );
};

export default Playbar;
