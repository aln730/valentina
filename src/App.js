import React, { useState, useRef } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import loveImage from './love.jpg';
import newImage from './yippee-happy.gif';
import boomImage from './boom.gif';
import heartsGif from './hearts.gif'; // Import the hearts GIF
import loveSong from './love-song.mp3';
import jabadabado from './jabadabado.mp3'; // Import the new audio file
import meImage from './me.jpg'; // Import the me.jpg image for waterfall effect

export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSideImages, setShowSideImages] = useState(false);
  const [imageSize, setImageSize] = useState("50vw"); // Make image responsive
  const [imageSrc, setImageSrc] = useState(loveImage);
  const [showHearts, setShowHearts] = useState(false);
  const [fallingImages, setFallingImages] = useState([]); // State to hold the falling images
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
    jabadabadoRef.current.onended = () => {
      audioRef.current.play();
    };

    // Create falling images
    const numberOfImages = 2000; // Adjust how many images fall
    let images = [];
    for (let i = 0; i < numberOfImages; i++) {
      images.push({
        id: i,
        left: `${Math.random() * 100}vw`, // Random horizontal position
        animationDuration: `${Math.random() * 3 + 3}s`, // Random speed
      });
    }
    setFallingImages(images); // Add falling images to state
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
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={9000}
          gravity={0.1}
          recycle={true}
          colors={["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ffff00"]}
          initialVelocityY={15}
        />
      )}

      {/* Falling images */}
      {fallingImages.map((image) => (
        <motion.div
          key={image.id}
          style={{
            position: "absolute",
            left: image.left,
            top: "-100px", // Start above the screen
            width: "30px", // Adjust size of the falling images
          }}
          animate={{
            top: "100vh", // Move image to the bottom of the screen
          }}
          transition={{
            duration: parseFloat(image.animationDuration),
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <img src={meImage} alt="Falling Image" />
        </motion.div>
      ))}

      {showSideImages && (
        <div className="absolute left-10 transform translate-1/2">
          <img
            src={boomImage}
            alt="Boom!"
            className="animate-bounce side-image left-image"
            style={{ width: "500px", height: "500px" }}
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

        </div>
      </div>

      {showSideImages && (
        <div className="absolute right-10 transform translate-1/2">
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
