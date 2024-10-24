"use client";

import { useEffect, useState } from "react";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
  isSignIn: boolean;
}

export default function TypingAnimation({
  text,
  duration = 200,
  isSignIn,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false); // To track whether we are typing or deleting

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (!isDeleting && i < text.length) {
        // Typing forward
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else if (isDeleting && i > 0) {
        // Deleting backward
        setDisplayedText(text.substring(0, i - 1));
        setI(i - 1);
      } else if (i === text.length && !isDeleting) {
        // Start deleting after fully typed
        setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
      } else if (i === 0 && isDeleting) {
        // Start typing after fully deleted
        setIsDeleting(false);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [i, isDeleting, text, duration]);

  return (
    <h1 className="text-center">
      <span className="font-raleway text-2xl sm:text-4xl font-bold w-auto leading-[5rem] tracking-[-0.02em] drop-shadow-sm">
        Find Your Skills
      </span>
      {!isSignIn && (
        <span className="font-raleway text-palette-primary text-2xl sm:text-4xl font-bold w-auto leading-[5rem] tracking-[-0.02em] drop-shadow-sm">
          {displayedText}
        </span>
      )}
      {isSignIn && (
        <span className="font-raleway text-palette-secondary text-2xl sm:text-4xl font-bold w-auto leading-[5rem] tracking-[-0.02em] drop-shadow-sm">
          {displayedText}
        </span>
      )}
    </h1>
  );
}
