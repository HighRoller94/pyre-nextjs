import MediaSkel from "./MediaSkel";

const MediaContainerSkel = () => {
  return (
    <div className="px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 my-4">
      {[...Array(8).keys()].map((i) => (
        <MediaSkel />
      ))}
    </div>
  );
};

export default MediaContainerSkel;
