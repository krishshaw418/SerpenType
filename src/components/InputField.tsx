import { useState, useEffect, useRef } from "react";
import { generate } from "random-words";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RestartIcon from "../assets/refresh_20dp_000000_FILL0_wght400_GRAD0_opsz20.png";

function WordsDisplayArea() {
  const [words, setWords] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const setRandomWords = () => {
    setWords(generate(30) as string[]);
    setUserInput("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    setRandomWords();
    // const focusInput = () => {
    //   inputRef.current?.focus();
    // };
    // window.addEventListener("keydown", focusInput);
    // return () => window.removeEventListener("keydown", focusInput);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const inputWords = userInput.split(" ");
  console.log(inputWords);

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-150 w-screen" onClick={() => inputRef.current?.focus()}>
      {/* Typing capture input (invisible) */}
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0 pointer-events-none"
        value={userInput}
        onChange={handleChange}
        autoFocus
      />

      {/* Display Area */}
      <div className="justify-center flex flex-wrap overflow-hidden max-w-5xl">
        {words.map((word, idx) => (
          <p key={idx} className="font-mono text-2xl p-2 inline">
            {word}
          </p>
        ))}
      </div>

      {/* Restart Button */}
      <div className="flex items-center gap-5">
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
}

export default WordsDisplayArea;
