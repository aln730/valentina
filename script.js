import React, { useState, useRef } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [imageSize, setImageSize] = useState(200);
  const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/200");
  const noButtonRef = useRef(null);

  const handleYesClick = () => {
    setShowConfetti(true);
    setImageSize(300);
    setImageSrc("https://via.placeholder.com/300");
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleMouseMove = (event) => {
    const button = noButtonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const distance = Math.hypot(
        event.clientX - (rect.left + rect.width / 2),
        event.clientY - (rect.top + rect.height / 2)
      );
      if (distance < 100) {
        button.style.position = "absolute";
        button.style.left = `${Math.random() * 80 + 10}%`;
        button.style.top = `${Math.random() * 80 + 10}%`;
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 relative">
      {showConfetti && <Confetti />}
      <div
        className="flex flex-col items-center p-5 bg-white rounded-lg shadow-lg relative"
        onMouseMove={handleMouseMove}
      >
        <motion.img
          src={imageSrc}
          alt="Surprise"
          className="mb-4"
          animate={{ width: imageSize, height: imageSize }}
        />
        <div className="flex gap-4">
          <button
            onClick={handleYesClick}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600"
          >
            Yes
          </button>
          <button
            ref={noButtonRef}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
