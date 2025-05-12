import React, { useEffect, useRef, useState } from "react";
import { generate } from "random-words";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RestartIcon from "../assets/refresh_20dp_000000_FILL0_wght400_GRAD0_opsz20.png";


const WordDisplayArea = () => {
  const [words, setWords] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[][]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const setRandomWords = () => {
    const generatedWords = generate(30) as string[];
    setWords(generatedWords);
    setUserInput(generatedWords.map((w) => Array(w.length).fill("")));
    setWordIdx(0);
    setCharIdx(0);
  }

  useEffect(() => {
    // Generate 30 random words on mount
        setRandomWords();
  }, []);

  useEffect(() => {
    containerRef.current?.focus();
  }, [words]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (words.length === 0) return;

    const currentWord = userInput[wordIdx];
    const wordLength = words[wordIdx].length;

    if (e.key === "Backspace") {
      e.preventDefault();

      if (charIdx > 0) {
        const updated = [...userInput];
        updated[wordIdx][charIdx - 1] = "";
        setUserInput(updated);
        setCharIdx(charIdx - 1);
      } else if (wordIdx > 0) {
        setWordIdx(wordIdx - 1);
        setCharIdx(words[wordIdx - 1].length);
      }
    } else if (e.key === " ") {
      e.preventDefault();
      setWordIdx((prev) => Math.min(prev + 1, words.length - 1));
      setCharIdx(0);
    } else if (e.key.length === 1) {
      const updated = [...userInput];
      if (charIdx < wordLength) {
        updated[wordIdx][charIdx] = e.key;
        setUserInput(updated);
        setCharIdx(charIdx + 1);
      }
    }
  };

  const getCharClass = (typed: string, expected: string, isCursor: boolean) => {
    if (typed === "") return isCursor ? "border-b-2 border-blue-500" : "text-gray-400";
    if (typed === expected) return "text-green-500";
    return "text-red-500";
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="outline-none text-2xl font-mono items-center flex flex-col h-150 justify-center gap-5"
    >
      <div className="flex flex-wrap justify-center max-w-5xl w-fit items-center gap-2 overflow-hidden">
        {words.map((word, wIdx) => (
        <span key={wIdx} className="mr-4">
          {word.split("").map((char, cIdx) => {
            const typedChar = userInput[wIdx]?.[cIdx] || "";
            const isCursor = wordIdx === wIdx && charIdx === cIdx;

            return (
              <span
                key={cIdx}
                className={`${getCharClass(typedChar, char, isCursor)} ${
                  isCursor ? "bg-blue-100" : ""
                }`}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
      </div>
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className="h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 cursor-pointer"
              onClick={setRandomWords}
            >
              <img
                src={RestartIcon}
                alt="restart icon"
                className="invert-0 dark:invert"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Restart Test</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default WordDisplayArea;
