/**
 * Typing Effect Component
 * Design: Hacker Zine - terminal-style typing animation
 * Features: type text, pause, delete, loop through phrases
 */

import { useEffect, useState } from 'react';

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number; // ms per character
  deletingSpeed?: number; // ms per character (faster)
  pauseDuration?: number; // ms to pause after typing complete
  cursorBlink?: boolean;
}

export default function TypingEffect({
  phrases = ['Hello World!!!', 'I am Ousu', 'a student', 'security research'],
  typingSpeed = 100,
  deletingSpeed = 40,
  pauseDuration = 7000, // 7 seconds
  cursorBlink = true,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor blink effect
  useEffect(() => {
    if (!cursorBlink) return;
    
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    
    return () => clearInterval(blinkInterval);
  }, [cursorBlink]);

  // Main typing effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const isComplete = displayText === currentPhrase;

    // If waiting after typing complete
    if (isWaiting) {
      const waitTimer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(waitTimer);
    }

    // If deleting
    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }

      const deleteTimer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deletingSpeed);

      return () => clearTimeout(deleteTimer);
    }

    // If typing
    if (!isComplete) {
      const typeTimer = setTimeout(() => {
        setDisplayText((prev) => currentPhrase.slice(0, prev.length + 1));
      }, typingSpeed);

      return () => clearTimeout(typeTimer);
    }

    // If typing complete, start waiting
    if (isComplete && !isWaiting && !isDeleting) {
      setIsWaiting(true);
    }
  }, [displayText, phraseIndex, isDeleting, isWaiting, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div className="inline-block">
      <span
        className="font-mono text-4xl md:text-6xl font-bold"
        style={{
          color: 'var(--color-blue)',
          letterSpacing: '0.05em',
        }}
      >
        {displayText}
      </span>
      <span
        className={`inline-block w-1 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          height: '1.2em',
          background: 'var(--color-blue)',
          transition: 'opacity 0.1s',
        }}
      />
    </div>
  );
}
