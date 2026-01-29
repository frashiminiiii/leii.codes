import React from "react";

function ImageCard({ image }) {
  return (
    <div className="relative group overflow-hidden rounded-xl">
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className="w-full h-60 object-cover transition duration-300 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-3">
        <p className="text-white text-sm">
          {image.alt_description || "Untitled"}
        </p>
      </div>
    </div>
  );
}

export default ImageCard;
