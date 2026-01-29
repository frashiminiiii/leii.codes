export default function ImageGallery({ images, loading, error }) {
  if (loading) {
    return <div className="text-center text-blue-900 mt-6">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500 mt-6">{error}</div>;
  }
  if (!images.length) {
    return (
      <div className="text-center text-blue-900 mt-6">No Images Found</div>
    );
  }

  return (
    <div id="gallery" className="mt-7 px-4 pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="relative group">
            <img
              src={img.urls.small}
              alt={img.alt_description || "Unsplash Image"}
              className="w-full h-60 object-cover rounded-xl shadow-md group-hover:shadow-xl group-hover:scale-105 transition transform duration-300"
              loading="lazy"
            />
            {img.alt_description && (
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition">
                <p className="text-white text-sm font-medium drop-shadow-md truncate">
                  {img.alt_description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
