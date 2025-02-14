import React, { useState, useRef } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import loveImage from './love.jpeg'; // Initial image (you can change this)
import newImage from './yippee-happy.gif'; // New image for "Yes" click

export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [imageSize, setImageSize] = useState(200);
  const [imageSrc, setImageSrc] = useState(loveImage); // Initial image
  const noButtonRef = useRef(null);

  const handleYesClick = () => {
    setShowConfetti(true);
    setImageSize(500);  // Change size of image
    setImageSrc(newImage);  // Change to the new image
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
    <div className="flex flex-col items-center p-5 bg-white rounded-lg shadow-lg relative" onMouseMove={handleMouseMove}>
      {showConfetti && <Confetti />}
      <motion.img
        src={imageSrc}  // Use the imageSrc state here
        alt="Will you be my Valentine's?"
        className="mb-4 rounded-full shadow-lg"
        animate={{ width: imageSize, height: imageSize, rotate: showConfetti ? 10 : 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
      <h2 className="text-xl font-bold mb-3 text-gray-800 items-center">Will you be my Valentine? 💖</h2>

      <div className="flex gap-4">
        <button
          onClick={handleYesClick}
          className="px-10 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600"
        >
          Yes
        </button>
        <button
          ref={noButtonRef}
          className="px-10 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600"
        >
          No
        </button>
      </div>
    </div>
  );
}
