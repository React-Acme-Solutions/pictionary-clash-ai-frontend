import React, { useEffect, useRef } from "react";
import CategoryFlipCard from "../CategoryFlipCard";
import ImageCenter from "./ImageCenter";

import "../../styles/front-page.scss"; // Import your custom styles

const FrontPage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current; 

    const handleVideoEnded = () => {
      // Pause the video when it ends
      video.pause();
    };

    // Add event listener to handle video end
    video.addEventListener("ended", handleVideoEnded);

    // Clean up: remove event listener when component unmounts
    return () => {
      video.removeEventListener("ended", handleVideoEnded);
    };
  }, []);

  // Function to play the video immediately on mount
  const playVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.play();
    }
  };

  useEffect(() => {
    playVideo(); // Call playVideo when component mounts
  }, []);

  return (
    <div className="front-page">
      {/* Animation container */}
      <a href="/home">
        <div className="animation-container">
          <video autoPlay loop muted ref={videoRef}>
            <source src="./src/animations/pictionary_clash.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </a>

      {/* Pass categories as props to CategoryFlipCard */}
      <CategoryFlipCard categories={["Category 1", "Category 2", "Category 3"]} />
    </div>
  );
};

export default FrontPage;
