const BadgeDetails = () => (
  <div className="flex flex-col">
    <div className="mb-10 flex w-full">
      <div className="w-full md:w-1/2">
        <p className="mb-2 text-gray-600">Category</p>
        <p className="text-base font-semibold">Participation</p>
      </div>
      <div className="w-full md:w-1/2">
        <p className="mb-2 text-gray-600">Project</p>
        <p className="text-base font-semibold">Polygon</p>
      </div>
    </div>
    <div className="flex w-full">
      <div className="w-full md:w-1/2">
        <p className="mb-2 text-gray-600">Category</p>
        <p className="text-base font-semibold">Participation</p>
      </div>
      <div className="w-full md:w-1/2">
        <p className="mb-2 text-gray-600">Number of People Issued</p>
        <p className="text-base font-semibold">100</p>
      </div>
    </div>
  </div>
);

export { BadgeDetails };
