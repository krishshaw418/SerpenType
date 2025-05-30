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
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [enableScroll, setEnableScroll] = useState(false);
  const [characterCountPerSec, setCharacterCountPerSec] = useState(0);
  const [correctCharCountPerSec, setCorrectCharCountPerSec] = useState(0);
  // const [rawWordPerMinute, setRawWordPerMinute] = useState<number[]>([]);
  // const rawRef = useRef<number[]>([0]);
  // const [wordPerMinute, setWordPerMinute] = useState<number[]>([]);
  // const wpmRef = useRef<number[]>([0]);
  const rawWordPerMinute = metricsState?.rawPerSec;
  const setRawWordPerMinute = metricsState?.setRawPerSec;
  const rawRef = metricsState?.rawRef;
  const wordPerMinute = metricsState?.wpmPerSec;
  const setWordPerMinute = metricsState?.setWpmPerSec;
  const wpmRef = metricsState?.wpmRef;

  // Function to set random words for Display Area
  const setRandomWords = () => {
    metricsState?.setRaw(0);
    metricsState?.setWpm(0);
    metricsState?.setAccuracy(0);
    metricsState?.setCharacterCount(0);
    metricsState?.setCorrectCharCount(0);
    metricsState?.setIncorrectCharCount(0);
    resetTimer();
    setHidden(true);
    setRawWordPerMinute([]);
    setWordPerMinute([]);
    setTimeout(() => {
      const generatedWords = generate(30) as string[];
      setWords(generatedWords);
      setUserInput(generatedWords.map((w) => Array(w.length).fill("")));
      setWordIdx(0);
      setCharIdx(0);
      setHidden(false);
      setIsLoading(false);
    }, 100);
  }

  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      setRandomWords();
    }
  }, []);

  // To focus on the div each time Restart Test is clicked
  useEffect(() => {
    containerRef.current?.focus();
  }, [words]);

  useEffect(() => {
  if (hasInitialized.current) {
    setStart(time);
    setRandomWords();
  }
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

  // To return the last non zero element from the metrics array
  // function getLastNonZero(arr: number[]): number {
  // for (let i = arr.length - 1; i >= 0; i--) {
  //   if (arr[i] !== 0) return arr[i];
  //   }
  //   return 0; 
  // }
  function getAverageNonZero(arr: number[]): number {
  const nonZero = arr.filter(n => n !== 0);
  if (nonZero.length === 0) return 0;
  const sum = nonZero.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / nonZero.length);
}



  useEffect(() => {
    if(!isActive) return;
    const elapsedTime = initial - start;
    if(elapsedTime >= 0){
      const raw =  Math.round((characterCountPerSec / 5)/(1 / 60));
      const wpm = Math.round((correctCharCountPerSec / 5)/(1 / 60));
      const newRawArray =
      rawWordPerMinute.length === 1 && rawWordPerMinute[0] === 0
        ? [raw]
        : [...rawWordPerMinute, raw];
      setRawWordPerMinute(newRawArray);
      rawRef.current = newRawArray;
      const newWpmArray =
      wordPerMinute.length === 1 && wordPerMinute[0] === 0
        ? [wpm]
        : [...wordPerMinute, wpm];
      setWordPerMinute(newWpmArray);  
      wpmRef.current = newWpmArray;
      console.log("raw: ", raw);
      console.log("wpm: ", wpm);
      setCharacterCountPerSec(0);
      setCorrectCharCountPerSec(0);
    }
    if(start === 0){
    resetTimer();
    stopTimer();
    setHidden(true);
    const lastValidRaw = getAverageNonZero(rawRef.current);
    const lastValidWpm = getAverageNonZero(wpmRef.current);
    setTimeout(()=>{
      console.log("Raw metrics:", rawRef.current);
      console.log("Wpm metrics:", wpmRef.current);
      metricsState?.setRaw(lastValidRaw);
      metricsState?.setWpm(lastValidWpm);
      navigate('/metrics');
      rawRef.current = [0];
      wpmRef.current = [0];
    },225);
    }
  }, [start]);

  useEffect(() => {
  if (!cursorRef.current || !containerRef.current) return;

  const cursor = cursorRef.current;
  const container = containerRef.current;

  const cursorRect = cursor.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const isCursorBelow = cursorRect.bottom > containerRect.bottom - 8;
  const isCursorAbove = cursorRect.top < containerRect.top;

  if (isCursorBelow || isCursorAbove) {
    setEnableScroll(true); // temporarily enable scroll

    container.scrollBy({
      top: cursorRect.bottom - containerRect.bottom + 8,
      behavior: "smooth",
    });

    // Lock scroll again after a short delay
    setTimeout(() => setEnableScroll(false), 100);
  }
  }, [charIdx, wordIdx]);

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
        setCharacterCountPerSec(prev => Math.max(0, prev - 1));

        if (prevChar === word[charIdx - 1]) {
          metricsState?.setCorrectCharCount(prev => Math.max(0, prev - 1));
          setCorrectCharCountPerSec(prev => Math.max(0, prev - 1));
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
    // Count the space
    metricsState?.setCharacterCount(prev => prev + 1);
    setCharacterCountPerSec(prev => prev + 1);

    const typedWord = updated[wordIdx].join("");
    const expectedWord = word;

    let correctChars = 0;
    for (let i = 0; i < expectedWord.length; i++) {
      if (typedWord[i] === expectedWord[i]) correctChars++;
    }

    const typedLength = updated[wordIdx].filter((c) => c !== "").length;

    metricsState?.setCorrectCharCount(prev => prev + correctChars);
    setCorrectCharCountPerSec(prev => prev + correctChars);
    metricsState?.setIncorrectCharCount(prev => prev + (typedLength - correctChars));

    // Move to next word
    setWordIdx(prev => Math.min(prev + 1, words.length - 1));
    setCharIdx(0);

  } else if (e.key.length === 1) {
    if (charIdx < wordLength) {
      const prevChar = updated[wordIdx][charIdx];
      updated[wordIdx][charIdx] = e.key;

      if (prevChar !== e.key) {
        metricsState?.setCharacterCount(prev => prev + 1);
        setCharacterCountPerSec(prev => prev + 1);

        if (e.key === word[charIdx]) {
          metricsState?.setCorrectCharCount(prev => prev + 1);
          setCorrectCharCountPerSec(prev => prev + 1);
        } else {
          metricsState?.setIncorrectCharCount(prev => prev + 1);
        }
      }

      setUserInput(updated);
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
      className={`
      ${isHidden ? "hidden" : ""}
      ${isBlur ? "blur-xs" : ""}
      ${enableScroll ? "overflow-y-auto" : "overflow-y-hidden"}
      hide-scrollbar h-32 pl-[38px] flex flex-wrap max-w-7xl items-center gap-2 outline-none
      `}>
        {words.map((word, wIdx) => (
        <span key={wIdx} className="mr-4">
          {word.split("").map((char, cIdx) => {
            const typedChar = userInput[wIdx]?.[cIdx] || "";
            const isCursor = wordIdx === wIdx && charIdx === cIdx;
            return (
              <span
              key={cIdx}
              ref={isCursor ? cursorRef : null} // only the active cursor gets the ref
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
