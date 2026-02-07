import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import photo1 from "./assets/photo1.jpg";
import photo2 from "./assets/photo2.jpg";
import photo3 from "./assets/photo3.jpg";

const slides = [
  { image: photo1, text: "Your love built our family 💕" },
  { image: photo2, text: "Every moment together is a blessing 💖" },
  { image: photo3, text: "Happy Anniversary Mom & Dad 🌸" }
];

const emojis = ["🌸", "💖", "❤️", "💐", "✨", "🌼"];

export default function App() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);

  const isLastSlide = index === slides.length;
  const isPhotoSlide = index < slides.length;

  return (
    <div className="container">
      <FloatingEmojis />

      <AnimatePresence mode="wait">
        {/* 🌟 INTRO */}
        {!started && (
          <motion.div
            key="intro"
            className="card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1>Happy Marriage Anniversary 💐</h1>
            <p>Mom & Dad</p>

            <div className="heart-btn" onClick={() => setStarted(true)}>
              <span>Start the<br />Journey</span>
            </div>
          </motion.div>
        )}

        {/* 📸 PHOTO SLIDES */}
        {started && isPhotoSlide && (
          <motion.div
            key={`slide-${index}`}
            className="card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <img src={slides[index].image} alt="memory" />
            <p>{slides[index].text}</p>

            <div className="buttons">
              {index > 0 && (
                <button onClick={() => setIndex(index - 1)}>◀ Prev</button>
              )}
              <button onClick={() => setIndex(index + 1)}>Next ▶</button>
            </div>
          </motion.div>
        )}

        {/* ❤️ FINAL LOVE PAGE */}
        {started && isLastSlide && (
          <motion.div
            key="final"
            className="card love-page"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1>❤️ Love You Mom & Dad ❤️</h1>

            <p className="love-text">
              Thank you for every sacrifice, every smile,  
              and for showing us what true love means.  
              <br /><br />
              We are blessed to have you.  
              Forever grateful. 🌸
            </p>

            <button
              onClick={() => {
                setStarted(false);
                setIndex(0);
              }}
            >
              🔁 Go to Start
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 🌸 FLOATING EMOJIS */
function FloatingEmojis() {
  return (
    <div className="emoji-layer">
      {Array.from({ length: 25 }).map((_, i) => {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const size = Math.random() * 18 + 18;
        const duration = Math.random() * 10 + 12;

        return (
          <motion.span
            key={i}
            className="emoji"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${size}px`
            }}
            initial={{ y: "120vh", opacity: 0 }}
            animate={{ y: "-120vh", opacity: 1 }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            {emoji}
          </motion.span>
        );
      })}
    </div>
  );
}
