interface TitleComponentProps {
  header: string;
  subHeader?: string;
  pageTitle?: boolean;
  displayedContent?: number;
  contentCount?: number;
  showContent?: () => void;
  hideContent?: () => void;
}

const TitleComponent: React.FC<TitleComponentProps> = ({
  header,
  subHeader,
  pageTitle,
  displayedContent,
  contentCount,
  showContent,
  hideContent,
}) => {
  return (
    <div className="p-6 py-5 md:py-4 w-full flex flex-col sm:flex-row sm:justify-between">
      <div className="flex flex-col">
        {header && (
          <h1
            className={`text-white text-2xl md:text-3xl font-bold ${
              pageTitle && "text-3xl md:text-5xl"
            }`}
          >
            {header}
          </h1>
        )}
        {subHeader && (
          <p className="text-neutral-400 text-lg pt-2 truncate">{subHeader}</p>
        )}
      </div>
      <div className="justify-end hidden sm:flex">
        {contentCount > displayedContent ? (
          <button
            className="text-neutral-400  mt-2 sm:mt-0 cursor-pointer hover:text-white transition flex justify-end items-end pr-2 sm:pr-6"
            onClick={showContent}
          >
            Show More
          </button>
        ) : (
          <>
            {contentCount > 8 && (
              <button
                className="text-neutral-400  mt-2 sm:mt-0 cursor-pointer hover:text-white transition flex justify-end items-end pr-2 sm:pr-6"
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
