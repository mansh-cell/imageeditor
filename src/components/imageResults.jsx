import React, { useEffect } from "react";
import ImageCard from "./imageCard";

const ImageResults = ({ images, onEditImage }) => {
  useEffect(() => {
    console.log(images);
  }, [images]);

  if (!Array.isArray(images)) {
    return <div> No images Found </div>;
  }

  return (
    <>
      <div className="image-results">
        {images.length > 0 &&
          images.map((image) => {
            return <ImageCard image={image} onEditImage={onEditImage} />;
          })}
      </div>
    </>
  );
};

export default ImageResults;
