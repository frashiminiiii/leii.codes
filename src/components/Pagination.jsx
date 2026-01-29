export default function Pagination({
  images,
  currentPage,
  totalPages,
  visiblePages,
  handleSearch,
  query,
}) {
  if (!images.length) return null;

  return (
    <div className="flex justify-center gap-2 mb-10">
      <button
        onClick={() => currentPage > 1 && handleSearch(query, currentPage - 1)}
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
  );
}
