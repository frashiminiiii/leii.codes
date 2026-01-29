import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SearchSection from "./components/SearchSection";
import ImageGallery from "./components/ImageGallery";
import Pagination from "./components/Pagination";
import CollectionsSection from "./components/CollectionsSection";

function App() {
  const API_URL = "https://api.unsplash.com/search/photos";
  const IMAGES_PER_PAGE = 24;

  const [query, setQuery] = useState("unsplash");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  // Focus input and load default images
  useEffect(() => {
    inputRef.current?.focus();
    handleSearch("Unsplash", 1);
  }, []);

  const handleSearch = async (searchQuery, page = 1) => {
    const q = searchQuery || query;
    if (!q) return;

    setQuery(q);
    setCurrentPage(page);
    setLoading(true);
    setError(""); // clear previous errors

    try {
      const { data } = await axios.get(
        `${API_URL}?query=${q}&page=${page}&per_page=${IMAGES_PER_PAGE}`,
        {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH}`,
          },
        },
      );
      setImages(data.results);
      setTotalResults(data.total);
    } catch (err) {
      console.error(err);
      setImages([]); // clear images
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalResults / IMAGES_PER_PAGE));

  // Visible page numbers max 5
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);
  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) visiblePages.push(i);

  return (
    <div className="bg-slate-50 min-h-screen px-6 md:px-10 lg:px-16">
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <HeroSection />

      {/* SEARCH SECTION */}
      <SearchSection
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        inputRef={inputRef}
      />

      {/* IMAGE GALLERY */}
      <ImageGallery images={images} loading={loading} error={error} />

      {/* PAGINATION */}
      <Pagination
        images={images}
        currentPage={currentPage}
        totalPages={totalPages}
        visiblePages={visiblePages}
        handleSearch={handleSearch}
        query={query}
      />

      {/* COLLECTIONS SECTION */}
      <CollectionsSection handleSearch={handleSearch} />
    </div>
  );
}

export default App;
