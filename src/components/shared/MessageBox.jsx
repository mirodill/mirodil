import { useEffect, useState } from "react";

const words = ["Hello world!", "Frontend Developer", "Data Analyst"];

const MessageBox = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (charIndex < words[wordIndex].length) {
        setText(prev => prev + words[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        // Pause before next word
        setTimeout(() => {
          setText("");
          setCharIndex(0);
          setWordIndex(prev => (prev + 1) % words.length);
        }, 1500);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [charIndex, wordIndex]);

  return (
    <div className="flex justify-start p-4">
      <div
        className="
          relative
          bg-gray-200 dark:bg-gray-700
          text-black dark:text-white
          px-4 py-2
          rounded-2xl
          shadow-md
          max-w-xs sm:max-w-sm
          inline-flex
          items-center
          transition-all
          duration-300
        "
      >
        <span className="font-mono text-sm sm:text-base leading-snug">
          {text}
          <span className="animate-pulse">|</span>
        </span>
      </div>
    </div>
  );
};

export default MessageBox;
