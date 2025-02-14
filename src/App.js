import React, { useState, useRef } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import loveImage from './love.jpg';
import newImage from './yippee-happy.gif';
import boomImage from './boom.gif';
import heartsGif from './hearts.gif'; // Import the hearts GIF
import loveSong from './love-song.mp3';
import jabadabado from './jabadabado.mp3'; // Import the new audio file

export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSideImages, setShowSideImages] = useState(false);
  const [imageSize, setImageSize] = useState(500);
  const [imageSrc, setImageSrc] = useState(loveImage);
  const [showHearts, setShowHearts] = useState(false); // State for showing the hearts GIF
  const noButtonRef = useRef(null);
  const audioRef = useRef(new Audio(loveSong));
  const jabadabadoRef = useRef(new Audio(jabadabado)); // Reference for the new MP3 file

  const handleYesClick = () => {
    setShowConfetti(true);
    setShowSideImages(true);
    setImageSize(600);
    setImageSrc(newImage);
    setShowHearts(true); // Show hearts when "Yes" is clicked
    jabadabadoRef.current.play();
    jabadabadoRef.current.onplay = () => {
      audioRef.current.play();
    };
  };

  const handleMouseMove = (event) => {
    const button = noButtonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const distance = Math.hypot(
        event.clientX - (rect.left + rect.width / 2),
        event.clientY - (rect.top + rect.height / 2)
      );
      const distanceThreshold = 150; // Only move the button if the mouse is within this distance

      if (distance < distanceThreshold) {
        // Random position for button when close to mouse
        button.style.position = "absolute";
        button.style.left = `${Math.random() * 80 + 10}%`;
        button.style.top = `${Math.random() * 80 + 10}%`;
      } else {
        // Reset position to its original place when mouse is farther
        button.style.position = "relative";
        button.style.left = "0";
        button.style.top = "0";
      }
    }
  };

  return (
    <div
      className="flex justify-center fill items-center min-h-screen bg-pink-1000 absolute"
      style={{
        backgroundImage: showHearts ? `url(${heartsGif})` : 'none',
        backgroundRepeat: 'repeat', // Don't repeat the GIF
        backgroundAttachment: 'relative', // Make sure the background stays fixed during scrolling
        zIndex: -1, // Make sure the GIF stays behind all other elements
      }}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={10000} // Adjust number of pieces
          gravity={20} // Adjust gravity to slow down the fall
          recycle={true}
          colors={["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ffff00"]}
          initialVelocityY={25} // Add initial speed for pieces
          wind={0.1} // Add wind for randomness
          angle={Math.random() * 360} // Random angle for each piece to come from
        />
      )}

      {/* Left Image (Only appears when Yes is clicked) */}
      {showSideImages && (
        <div className="absolute left-10 transform translate-y-1/2">
          <img
            src={boomImage}
            alt="Boom!"
            className="animate-bounce side-image left-image"
            style={{ width: "500px", height: "500px" }}
          />
        </div>
      )}

      <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-2xl text-center relative z-10">
        <motion.img
          src={imageSrc}
          alt="Will you be my Valentine?"
          className="mb-6 rounded-full shadow-lg"
          animate={{ width: imageSize, height: imageSize, rotate: showConfetti ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        <h2 className="text-2xl font-bold mb-4 text-gray-800 items-center justify-center absolute">Will you be my Valentine's? 💖</h2>
        <div className="flex flex-col justify-center items-center gap-6">
          <button
            onClick={handleYesClick}
            className="px-10 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 text-lg font-semibold justify-center"
          >
            Yes
          </button>
          <button
            ref={noButtonRef}
            onMouseMove={handleMouseMove}
            className="px-10 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 text-lg font-semibold"
          >
            No
          </button>
        </div>
      </div>

      {/* Right Image (Only appears when Yes is clicked) */}
      {showSideImages && (
        <div className="absolute right-10 transform translate-y-1/2">
          <img
            src={boomImage}
            alt="Boom!"
            className="animate-bounce side-image right-image"
            style={{ width: "500px", height: "500px" }}
          />
        </div>
      )}
    </div>
  );
}
