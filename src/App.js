import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import loveImage from './love.jpeg';
import newImage from './yippee-happy.gif';
import boomImage from './boom.gif';
import heartsGif from './hearts.gif';
import loveSong from './love-song.mp3';
import jabadabado from './jabadabado.mp3';

export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSideImages, setShowSideImages] = useState(false);
  const [imageSize, setImageSize] = useState("50vw");
  const [imageSrc, setImageSrc] = useState(loveImage);
  const [showHearts, setShowHearts] = useState(false);
  const noButtonRef = useRef(null);
  const audioRef = useRef(new Audio(loveSong));
  const jabadabadoRef = useRef(new Audio(jabadabado));
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      const distanceThreshold = windowSize.width < 768 ? 80 : 150; // Reduce threshold for smaller screens

      if (distance < distanceThreshold) {
        const newX = Math.random() * (windowSize.width - rect.width);
        const newY = Math.random() * (windowSize.height - rect.height - 100);
        button.style.position = "absolute";
        button.style.left = `${newX}px`;
        button.style.top = `${newY}px`;
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-pink-200 relative overflow-hidden"
      style={{
        backgroundImage: showHearts ? `url(${heartsGif})` : 'none',
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
      }}
    >
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={windowSize.width < 768 ? 500 : 2000} // Reduce confetti on mobile
          gravity={0.2}
          recycle={false}
          colors={["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ffff00"]}
          wind={0.1}
        />
      )}

      {/* Left Image */}
      {showSideImages && (
        <div className="absolute left-5 bottom-10 hidden md:block">
          <img
            src={boomImage}
            alt="Boom!"
            className="animate-bounce"
            style={{ maxWidth: "30vw", height: "auto" }}
          />
        </div>
      )}

      <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl text-center relative z-10 w-11/12 md:w-3/4 lg:w-1/2">
        <motion.img
          src={imageSrc}
          alt="Will you be my Valentine?"
          className="mb-4 rounded-full shadow-lg"
          animate={{ width: imageSize, height: imageSize, rotate: showConfetti ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{ maxWidth: "80%", height: "auto" }}
        />
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Will you be my Valentine? 💖</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <button
            onClick={handleYesClick}
            className="px-8 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 text-lg font-semibold"
          >
            Yes
          </button>
          <button
            ref={noButtonRef}
            onMouseMove={handleMouseMove}
            className="px-8 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 text-lg font-semibold relative"
          >
            No
          </button>
        </div>
      </div>

      {/* Right Image */}
      {showSideImages && (
        <div className="absolute right-5 bottom-10 hidden md:block">
          <img
            src={boomImage}
            alt="Boom!"
            className="animate-bounce"
            style={{ maxWidth: "30vw", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}