import React from "react";

const ImageCard = ({ image, onEditImage }) => {
  return (
    <div className="card">
      <img
        key={image.id}
        src={image.urls.small}
        alt={image.alt_description}
      ></img>
      <div className="button-container">
        <button
          type="submit"
          className="addcaption"
          onClick={() => onEditImage(image)}
        >
          Add Caption
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
