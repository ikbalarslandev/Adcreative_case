const loadingItem = () => {
  return (
    <div
      className="border-y px-3 py-2 flex gap-3 items-center justify-start w-full cursor-pointer animate-pulse"
      tabIndex={0}
    >
      {/* checkbox */}
      <div className="border border-gray-500 rounded-sm w-3 h-3"></div>

      {/* image */}
      <div className="w-7 h-7 rounded-lg bg-gray-600"></div>
      <div className="flex flex-col items-start justify-center gap-1">
        <div className="w-20 h-2 bg-gray-600 rounded"></div>
        <div className="w-16 h-2 bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};

export default loadingItem;
