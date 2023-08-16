function HeaderSkel() {
  return (
    <div className="flex flex-col sm:flex-row p-10 sm:p-6 items-center justify-center sm:justify-start">
      <div className="relative bg-neutral-800 animate-pulse aspect-square rounded-md overflow-hidden border-full h-44 w-44 lg:h-52 lg:w-52"></div>
      <div className="flex flex-col w-full items-center justify-center text-center sm:ml-7 sm:justify-start sm:text-left sm:items-start mt-2 sm:mt-0">
        <div className="flex items-center gap-2 my-2 sm:my-0 sm:mb-1"></div>
        <h1 className="text-white text-5xl sm:text-6xl lg:text-6xl font-bold my-2 mb-4 bg-neutral-800 animate-pulse w-4/12 h-20"></h1>
        <div className="flex items-center justify-start w-100 bg-neutral-800 animate-pulse h-7  w-2/12">
        </div>
      </div>
    </div>
  );
}

export default HeaderSkel;
