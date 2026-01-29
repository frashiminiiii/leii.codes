import React from "react";
import Collections from "./Collections";

function SearchBar({ query, setQuery, handleSearch, inputRef }) {
  const handleCollectionClick = (item) => {
    setQuery(item);
    handleSearch();
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-4">
      {/* Search input row */}
      <div className="flex space-x-4">
        <input
          ref={inputRef}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search images..."
          value={query}
          type="text"
          className="w-[85%] py-3 px-5 rounded-2xl border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          onClick={handleSearch}
          className="w-[15%] rounded-2xl bg-teal-500 text-white hover:bg-teal-600 transition"
        >
          Search
        </button>
      </div>

      {/* Collections Buttons */}
      <Collections handleClick={handleCollectionClick} />
    </div>
  );
}

export default SearchBar;
