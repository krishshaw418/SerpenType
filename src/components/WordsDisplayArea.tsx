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
import { MetricsContext } from "@/context/MetricsStateContext";

const WordDisplayArea = () => {
  const navigate = useNavigate();
  const timerState = useContext(TimerContext); // Timer context to access timer state
  const metricsState = useContext(MetricsContext); // Metrics context to access metrics state
  if(!metricsState){
    throw new Error("MetricsContext is not defined");
  }
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
  const [isLoading, setIsLoading] = useState(true); // For the Loader
  const containerRef = useRef<HTMLDivElement>(null); // For referencing the div element to focus
  // const [incorrectCharCount, setIncorrectCharCount] = useState(0); // For counting total number of incorrect characters typed
  // Function to set random words for Display Area
  const setRandomWords = () => {
    metricsState?.setRaw(0);
    console.log("Raw reset to:", metricsState?.raw);
    metricsState?.setWpm(0);
    metricsState?.setAccuracy(0);
    metricsState?.setCharacterCount(0);
    metricsState?.setCorrectCharCount(0);
    metricsState?.setIncorrectCharCount(0);
    resetTimer();
    setHidden(true);
    setTimeout(() => {
      const generatedWords = generate(30) as string[];
      setWords(generatedWords);
      setUserInput(generatedWords.map((w) => Array(w.length).fill("")));
      setWordIdx(0);
      setCharIdx(0);
      setHidden(false);
      setIsLoading(false);
    }, 290);
  }

  useEffect(() => {
    // Generate 30 random words on mount
        setRandomWords();
  }, []);

  // To focus on the div each time Restart Test is clicked
  useEffect(() => {
    containerRef.current?.focus();
  }, [words]);

  useEffect(() => {
        setStart(time);
        setRandomWords(); // To refresh the set of words for new set time
  }, [time]);

  // Timer Logic 
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

  useEffect(() => {
    if(start === 0){
    resetTimer();
    stopTimer();
    setHidden(true);
    const correct = metricsState?.correctCharCount || 0;
    const total = metricsState?.characterCount || 0;
    setTimeout(()=>{
      const raw =  Math.round((metricsState.characterCount/5)/(initial / 60)); // RAW logic
      const wpm = Math.round((metricsState?.correctCharCount / 5) / (initial / 60)); // WPM logic
      const accuracy = Math.round((correct / total) * 100);
      console.log("Total characters typed:", metricsState?.characterCount);
      console.log("Total correct charcters typed: ", metricsState?.correctCharCount);
      console.log("Accuracy: ", accuracy);
      metricsState?.setRaw?.(raw);
      metricsState?.setWpm?.(wpm);
      metricsState?.setAccuracy?.(accuracy);
      navigate('/metrics');
    },225)
  }
  }, [start]);

  // keydown event handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  startTimer();
  if (words.length === 0) return;
  e.preventDefault();

  const word = words[wordIdx];
  const wordLength = word.length;
  const updated = [...userInput];

  if (e.key === "Backspace") {
    if (charIdx > 0) {
      const prevChar = updated[wordIdx][charIdx - 1];
      if (prevChar !== "") {
        metricsState?.setCharacterCount(prev => Math.max(0, prev - 1));

        // Correct or incorrect removal
        if (prevChar === word[charIdx - 1]) {
          metricsState?.setCorrectCharCount(prev => Math.max(0, prev - 1));
        } else {
          metricsState?.setIncorrectCharCount(prev => Math.max(0, prev - 1));
        }
      }

      updated[wordIdx][charIdx - 1] = "";
      setUserInput(updated);
      setCharIdx(charIdx - 1);
    } else if (wordIdx > 0) {
      setWordIdx(wordIdx - 1);
      setCharIdx(words[wordIdx - 1].length);
    }

  } else if (e.key === " ") {
  metricsState?.setCharacterCount(prev => prev + 1);

  const typedWord = updated[wordIdx].join("");
  const isWordCorrect = typedWord === word;

  if (isWordCorrect) {
    // metricsState?.setCorrectWordCount?.(prev => prev + 1);
    metricsState?.setCorrectCharCount(prev => prev + 1);
  } else {
    metricsState?.setIncorrectCharCount(prev => prev + 1);
  }

  setWordIdx(prev => Math.min(prev + 1, words.length - 1));
  setCharIdx(0);
}else if (e.key.length === 1) {
    if (charIdx < wordLength) {
      updated[wordIdx][charIdx] = e.key;
      setUserInput(updated);

      metricsState?.setCharacterCount(prev => prev + 1);

      if (e.key === word[charIdx]) {
        metricsState?.setCorrectCharCount(prev => prev + 1);
      } else {
        metricsState?.setIncorrectCharCount(prev => prev + 1);
      }

      setCharIdx(charIdx + 1);
    }
  }
};

  // css for typing check
  const getCharClass = (typed: string, expected: string, isCursor: boolean) => {
    if (typed === "") return isCursor ? "border-b-2 border-blue-500" : "text-gray-400";
    if (typed === expected) return "text-green-500";
    return "text-red-500";
  };

  return (
      <>
      {isLoading?<p className="flex flex-col justify-center items-center h-150">Loading...</p>:<div className={"outline-none text-3xl font-mono items-center flex flex-col h-150 justify-center gap-5"}>
      {/* overlay message */}
      {isBlur && (
        <p className={`${isHidden? "hidden" : "top-[280px] absolute text-2xl font-bold flex items-center flex-row gap-3 pointer-events-none z-10"} `}>
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
      {/* Restart Button */}
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
    </div>}
      </>
  );
};

export default WordDisplayArea;
