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
    <div className="p-6 w-full flex justify-between">
      <div className="flex flex-col">
        {header && (
          <h1
            className={`text-white text-4xl font-bold ${
              pageTitle && "text-4xl"
            }`}
          >
            {header}
          </h1>
        )}
        {subHeader && (
          <p className="text-neutral-400 text-lg pt-2 truncate">{subHeader}</p>
        )}
      </div>
      <div className="flex justify-end">
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