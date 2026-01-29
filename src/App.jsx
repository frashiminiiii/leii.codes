import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API_URL = "https://api.unsplash.com/search/photos";
  const IMAGES_PER_PAGE = 24;

  const [query, setQuery] = useState("unsplash");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    handleSearch(query, 1); // fetch initial images
  }, []);

  const handleSearch = async (searchQuery, page = 1) => {
    const q = searchQuery || query;
    if (!q) return;

    try {
      const { data } = await axios.get(
        `${API_URL}?query=${q}&page=${page}&per_page=${IMAGES_PER_PAGE}`,
        {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH}`,
          },
        },
      );

      setQuery(q);
      setCurrentPage(page);
      setImages(data.results);
      setTotalResults(data.total);
    } catch (error) {
      console.error(error);
    }
  };

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

  // PAGINATION LOGIC
  const totalPages = Math.max(1, Math.ceil(totalResults / IMAGES_PER_PAGE));
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);
  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) visiblePages.push(i);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* TOP BAR */}
      <div className="h-20 flex items-center bg-slate-50 ml-12">
        <div className="h-12 w-12 bg-teal-400 rounded-3xl border-2 border-teal-200"></div>
        <div className="ml-3 flex flex-col">
          <p className="text-lg text-teal-600 font-semibold">
            UNSPLASH GALLERY
          </p>
          <p className="text-sm text-teal-600 mt-1">FRANCIS PASCUA</p>
        </div>
      </div>

      {/* HERO BOXES */}
      <div className="flex gap-5 px-12 mt-5">
        <div className="bg-teal-50 h-60 rounded-4xl w-96 border-2 border-teal-200 shadow-md p-5">
          <h2 className="text-xl font-light text-blue-900">CURATED SEARCH</h2>
          <h1 className="mt-1 text-3xl text-blue-900">
            Find the mood. Build the board.
          </h1>
          <p className="text-blue-900 mt-1">
            Explore premium imagery with a clean, fintech-inspired experience.
            Search by theme, vibe, or subject and curate the visuals you need.
          </p>
        </div>
        <div className="bg-teal-50 h-60 rounded-4xl w-64 border-2 border-teal-200 shadow-md p-5">
          <h2 className="text-sm font-light text-blue-900">INSIGHT</h2>
          <h1 className="text-2xl text-blue-800 mt-3">24</h1>
          <p className="text-sm text-blue-900">Images per search</p>
          <h1 className="text-2xl text-blue-800 mt-3">Unsplash</h1>
          <p className="text-sm text-blue-900">Trusted provider</p>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div className="h-auto py-10 px-8 space-y-4 rounded-4xl mb-4 border-2 mt-8 mx-12 bg-teal-50 border-teal-200">
        <div className="flex justify-between items-start mb-4">
          <div className="text-sm text-blue-700 mt-1">
            Showing {totalResults} results
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <input
            ref={inputRef}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search images..."
            value={query}
            type="text"
            className="w-full py-3 px-5 rounded-2xl border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            onClick={() => handleSearch()}
            className="px-6 rounded-2xl bg-teal-500 text-white hover:bg-teal-600 transition"
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

      {/* IMAGE GALLERY */}
      <div className="mt-7 px-12 pb-4">
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {images.map((image) => (
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description}
                className="w-full h-60 object-cover rounded-xl shadow-md hover:shadow-xl transition"
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-blue-900">No Images Found</div>
        )}
      </div>

      {/* PAGINATION BUTTONS */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mb-10">
          <button
            onClick={() =>
              currentPage > 1 && handleSearch(query, currentPage - 1)
            }
            className="py-2 px-4 rounded-2xl bg-teal-200 text-blue-900 hover:bg-teal-300 transition"
          >
            Previous
          </button>

          {visiblePages.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handleSearch(query, pageNum)}
              className={`py-2 px-4 rounded-2xl transition ${
                currentPage === pageNum
                  ? "bg-teal-500 text-white"
                  : "bg-teal-200 text-blue-900 hover:bg-teal-300"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() =>
              currentPage < totalPages && handleSearch(query, currentPage + 1)
            }
            className="py-2 px-4 rounded-2xl bg-teal-200 text-blue-900 hover:bg-teal-300 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* BOTTOM SECTION */}
      <div className="flex justify-center my-10">
        <div className="rounded-2xl w-full max-w-7xl flex flex-col items-center p-6 border-2 border-teal-200 bg-teal-50 shadow-md">
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-blue-900">COLLECTIONS</p>
            <p className="text-xs text-blue-800 mt-1">
              Curated starting points
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4 w-full mt-4">
            {["Calm Study", "Smart Work", "Urban Lines", "Green Escape"].map(
              (item) => (
                <div
                  key={item}
                  onClick={() => handleSearch(item)}
                  className="h-40 bg-white rounded-3xl border border-teal-200 shadow-md flex items-center justify-center cursor-pointer hover:shadow-xl transition"
                >
                  <p className="text-xs font-semibold text-blue-900 text-center">
                    {item}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
