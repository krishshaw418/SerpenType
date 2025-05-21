import React, { useEffect, useRef, useState } from "react";
import { generate } from "random-words";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RestartIcon from "../assets/refresh_20dp_000000_FILL0_wght400_GRAD0_opsz20.png";
import pointerIcon from "@/assets/arrow_selector_tool_20dp_000000_FILL0_wght400_GRAD0_opsz20.png";
import { useContext } from 'react';
import { TimerContext } from '@/context/TimerStateContext';
import { useNavigate } from "react-router-dom";
// import { Button } from "./ui/button";

const WordDisplayArea = () => {
  const navigate = useNavigate();
  const timerState = useContext(TimerContext);
  if(!timerState) {
        throw new Error("TimerContext is not defined");
    }
  const time = timerState.time; // updated value from context

  const initial = time; // initial value for updated timer

  const [start, setStart] = useState(time); // To store the state of the timer as time flows
  const [words, setWords] = useState<string[]>([]); // To hold the words genrated
  const [userInput, setUserInput] = useState<string[][]>([]); // To hold the user input 
  const [wordIdx, setWordIdx] = useState(0); // To store the index of the word in the array 
  const [charIdx, setCharIdx] = useState(0); // To store the index of the character inside the current word
  const [isBlur, setBlur] = useState(false); // To store the blur state of the div
  const [isHidden, setHidden] = useState(false); // To hide the words when refreshed
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to set random words for Display Area
  const setRandomWords = () => {
    resetTimer();
    setHidden(true);
    setTimeout(() => {
      const generatedWords = generate(30) as string[];
      setWords(generatedWords);
      setUserInput(generatedWords.map((w) => Array(w.length).fill("")));
      setWordIdx(0);
      setCharIdx(0);
      setHidden(false);
    }, 290);
  }

  useEffect(() => {
    // Generate 30 random words on mount
        setRandomWords();
  }, []);

  useEffect(() => {
    containerRef.current?.focus();
  }, [words]);

  useEffect(() => {
        setStart(time);
        setRandomWords(); // To refresh the set of words for new set time
  }, [time]);

  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
      let interval: undefined | ReturnType<typeof setTimeout>;
      if(isActive) {
          interval = setInterval(() => {
              setStart((prev) => prev - 1);
          }, 1000);
      }
      return () => clearInterval(interval);
  }, [isActive]);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);
  const resetTimer = () => {
      setIsActive(false);
      setStart(initial);
  }

  if(start === 0){
    resetTimer();
    stopTimer();
    setHidden(true);
    setTimeout(()=>{
      navigate('/metrics');
    },225)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    startTimer();
    if (words.length === 0) return;

    // const currentWord = userInput[wordIdx];
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
      <div className={"outline-none text-3xl font-mono items-center flex flex-col h-150 justify-center gap-5"}>
      {/* overlay message */}
      {isBlur && (
        <p className={`${isHidden? "hidden" : "top-[350px] absolute text-2xl font-bold flex items-center flex-row gap-3 pointer-events-none z-10"} `}>
          <img
            className="w-[22px] h-[22px] dark:invert"
            src={pointerIcon}
            alt="pointer-icon"
          />
          Click to focus
        </p>
      )}
      {/* Timer */}
      <p className={`${isHidden ? "hidden" : "font-sans text-[20px]"}`}>{ start }s</p>
      {/* Words */}
      <div 
      onBlur={() => {stopTimer(); setTimeout(()=>{setBlur(true);},250)}} 
      ref={containerRef} onKeyDown={handleKeyDown} 
      onFocus={() => setBlur(false)} 
      tabIndex={0} 
      className={` ${isHidden ? "hidden" : ""} ${isBlur ? "outline-none flex justify-center flex-wrap max-w-5xl w-fit items-center gap-2 blur-xs" : "outline-none flex justify-center flex-wrap max-w-5xl w-fit items-center gap-2 "}`}>
        {words.map((word, wIdx) => (
        <span key={wIdx} className="mr-4">
          {word.split("").map((char, cIdx) => {
            const typedChar = userInput[wIdx]?.[cIdx] || "";
            const isCursor = wordIdx === wIdx && charIdx === cIdx;

            return (
              <span
                key={cIdx}
                className={`${getCharClass(typedChar, char, isCursor)}`}>
                {char}
              </span>
            );
          })}
        </span>
      ))}
      </div>
      <div className={`${isHidden ? "hidden" : ""} "flex items-center"`}>
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
