const collections = [
  "Student&School",
  "Technology",
  "Architecture",
  "Nature",
  "Food",
  "Travel",
  "Minimal",
  "Fitness",
];

export default function SearchSection({
  query,
  setQuery,
  handleSearch,
  inputRef,
}) {
  return (
    <div className="h-auto py-10 px-5 space-y-4 rounded-4xl mt-8 bg-teal-50 border-2 border-teal-200">
      <div className="flex space-x-4 mb-4">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search images..."
          className="w-[90%] py-3 px-5 rounded-2xl border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          onClick={() => handleSearch()}
          className="w-[10%] rounded-2xl bg-teal-500 text-white hover:bg-teal-600 transition"
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {collections.map((item) => (
          <button
            key={item}
            onClick={() => handleSearch(item)}
            className="py-2 px-4 rounded-2xl bg-teal-500 text-white hover:bg-teal-600 transition text-sm"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
