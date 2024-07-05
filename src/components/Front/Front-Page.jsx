import React, { useEffect, useRef } from "react";
import "../../styles/front-page.scss"; // Import your custom styles
import soundFile from "../../assets/bubles.wav"; // Adjust the path to your sound file


const FrontPage = () => {
 const audioRef = useRef(null);
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


 // Function to play the audio when triggered by user interaction
 const playAudio = () => {
   const audio = audioRef.current;
   if (audio) {
     audio.currentTime = 0; // Reset audio to start
     audio.loop = false; // Ensure audio loops only once
     audio.muted = false; // Unmute audio
     audio.play().catch(error => {
       // Handle error (if any)
       console.error('Failed to play audio:', error);
     });
   }
 };


 // Function to handle the user interaction (e.g., click)
 const handleInteraction = () => {
   playAudio();
   // You can add other actions here that require user interaction
 };


 return (
   <div className="front-page" onClick={handleInteraction}>
     {/* Animation container */}
     <a href="/home">
       <div className="animation-container">
         {/* Video element */}
         <video autoPlay loop muted ref={videoRef}>
           <source src="./src/animations/Picture_clash.webm" type="video/webm" />
           Your browser does not support the video tag.
         </video>
        
         {/* Audio element */}
         <audio ref={audioRef} src={soundFile} />
       </div>
     </a>
   </div>
 );
};


export default FrontPage;