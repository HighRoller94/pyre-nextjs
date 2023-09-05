function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
        <div className="w-8 h-8 bg-orange-400 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-orange-400 rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
