import React, { useState, useRef } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import loveImage from './love.jpeg';
import newImage from './yippee-happy.gif';
import boomImage from './boom.gif';
import heartsGif from './hearts.gif'; // Import the hearts GIF
import loveSong from './love-song.mp3';
import jabadabado from './jabadabado.mp3'; // Import the new audio file

export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSideImages, setShowSideImages] = useState(false);
  const [imageSize, setImageSize] = useState("50vw"); // Make image responsive
  const [imageSrc, setImageSrc] = useState(loveImage);
  const [showHearts, setShowHearts] = useState(false);
  const noButtonRef = useRef(null);
  const audioRef = useRef(new Audio(loveSong));
  const jabadabadoRef = useRef(new Audio(jabadabado));

  const handleYesClick = () => {
    setShowConfetti(true);
    setShowSideImages(true);
    setImageSize("60vw");
    setImageSrc(newImage);
    setShowHearts(true);
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
      const distanceThreshold = 150;

      if (distance < distanceThreshold) {
        button.style.position = "absolute";
        button.style.left = `${Math.min(Math.random() * 80 + 10, 90)}vw`;
        button.style.top = `${Math.min(Math.random() * 80 + 10, 90)}vh`;
      } else {
        button.style.position = "relative";
        button.style.left = "0";
        button.style.top = "0";
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-pink-1000 relative"
      style={{
        backgroundImage: showHearts ? `url(${heartsGif})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        zIndex: -1,
      }}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={10000}
          gravity={0.1}
          recycle={true}
          colors={["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ffff00"]}
          initialVelocityY={15}
        />
      )}

      {showSideImages && (
        <div className="absolute left-10 transform translate-1/2">
          <img
            src={boomImage}
            alt="Boom!"
            className="animate-bounce"
            style={{ width: "30vw", maxWidth: "150px", height: "auto" }}
          />
        </div>
      )}

      <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-2xl text-center relative z-10 max-w-[90%] md:max-w-[60%]">
        <motion.img
          src={imageSrc}
          alt="Will you be my Valentine?"
          className="mb-4 rounded-full shadow-lg"
          animate={{ width: imageSize, height: "auto", rotate: showConfetti ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{ maxWidth: "300px" }} // Limit size on mobile
        />
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Will you be my Valentine? 💖</h2>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleYesClick}
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 text-lg font-semibold"
          >
            Yes
          </button>
          <button
            ref={noButtonRef}
            onMouseMove={handleMouseMove}
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 text-lg font-semibold"
          >
            No
          </button>
        </div>
      </div>

      {showSideImages && (
        <div className="absolute right-10 transform translate-1/2">
          <img
            src={boomImage}
            alt="Boom!"
            className="animate-bounce"
            style={{ width: "30vw", maxWidth: "150px", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}