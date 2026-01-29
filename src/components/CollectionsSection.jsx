import React from "react";

const CollectionsSection = ({ handleSearch }) => {
  const collections = [
    "Calm Study",
    "Smart Work",
    "Urban Lines",
    "Green Escape",
  ];

  return (
    <div className="flex justify-center my-10 px-4">
      <div className="rounded-2xl w-full max-w-5xl flex flex-col items-center p-6 border-2 border-teal-200 bg-teal-50 shadow-md">
        <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-blue-900">COLLECTIONS</p>
          <p className="text-xs text-blue-800 mt-1">Curated starting points</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-4">
          {collections.map((item) => (
            <div
              key={item}
              onClick={() => {
                handleSearch(item);
                document
                  .getElementById("gallery")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="h-40 bg-white rounded-3xl border border-teal-200 shadow-md flex items-center justify-center cursor-pointer hover:shadow-xl hover:scale-105 transition transform duration-300"
            >
              <p className="text-xs font-semibold text-blue-900 text-center px-2">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsSection;
