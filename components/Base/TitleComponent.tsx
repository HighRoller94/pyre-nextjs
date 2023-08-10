import { twMerge } from "tailwind-merge";

interface TitleComponentProps {
  header: string;
  subHeader: string;
  className?: string;
  displayedContent?: number;
  contentCount?: number;
  showContent: () => void;
  hideContent: () => void;
}

const TitleComponent: React.FC<TitleComponentProps> = ({
  header,
  subHeader,
  className,
  displayedContent,
  contentCount,
  showContent,
  hideContent,
}) => {
  return (
    <div className="p-6 w-full flex justify-between">
      <div className="flex flex-col">
        <h1 className={twMerge(`text-white text-4xl font-bold`, className)}>{header}</h1>
        <p className="text-neutral-400 text-lg pt-4 truncate">{subHeader}</p>
      </div>
      <div>
        {contentCount > displayedContent ? (
          <button
            className="text-neutral-400 cursor-pointer hover:text-white transition flex justify-end items-end pr-6"
            onClick={showContent}
          >
            Show More
          </button>
        ) : (
          <>
            {contentCount > 8 && (
              <button
                className="text-neutral-400 cursor-pointer hover:text-white transition flex justify-end items-end pr-6"
                onClick={hideContent}
              >
                See Less
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TitleComponent;
