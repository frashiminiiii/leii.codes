export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row gap-5 mt-5">
      <div className="bg-teal-50 h-60 rounded-3xl w-full md:w-2/3 border-2 border-teal-200 shadow-md p-5">
        <h2 className="text-xl font-light text-blue-900">CURATED SEARCH</h2>
        <h1 className="text-3xl text-blue-900 mt-1">
          Find the mood. Build the board.
        </h1>
        <p className="text-blue-900 mt-1">
          Explore premium imagery with a clean, fintech-inspired experience.
          Search by theme, vibe, or subject and curate the visuals you need.
        </p>
      </div>

      <div className="bg-teal-50 h-60 rounded-3xl w-full md:w-1/3 border-2 border-teal-200 shadow-md p-5">
        <h2 className="text-sm font-light text-blue-900">INSIGHT</h2>
        <h1 className="text-2xl text-blue-800 mt-3">24</h1>
        <p className="text-sm text-blue-900">Images per search</p>
        <h1 className="text-2xl text-blue-800 mt-3">Unsplash</h1>
        <p className="text-sm text-blue-900">Trusted provider</p>
      </div>
    </div>
  );
}
