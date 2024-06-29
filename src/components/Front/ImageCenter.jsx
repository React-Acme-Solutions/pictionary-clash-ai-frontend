import React from "react";

const ImageCenter = ({ image, alt }) => {
  return (
    <div className="image-center">
      <img src={image} alt={alt} />
    </div>
  );
};

export default ImageCenter;
