import { useState, useEffect, useRef } from 'react';
import { generate } from 'random-words';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import RestartIcon from "../assets/refresh_20dp_000000_FILL0_wght400_GRAD0_opsz20.png";

function WordsDisplayArea() {
    const [words, setWords] = useState<String[]>([]);
    const [userInput, setUserInput] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const setRandomWords = () => {
        setWords(generate(30) as String[]);
        containerRef.current?.focus();
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key.length === 1 && e.key !== ' ') {
            setUserInput((prev) => prev + e.key);
          } else if (e.key === ' ') {
            setUserInput((prev) => prev + ' ');
          } else if (e.key === 'Backspace') {
            setUserInput((prev) => prev.slice(0, -1));
          }
      };

      const inputWords = userInput.split(' ');
      console.log(inputWords);

    useEffect(() => {
    setRandomWords();
    const handleKeyDown = () => {
      containerRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    }, []);

  return (
    <div className='flex flex-col gap-5 items-center justify-center h-150 w-screen'>
        {/* Words Display Area */}
        <div ref={containerRef} onKeyDown={handleKeyDown} tabIndex={0} className='outline-none justify-center flex flex-wrap overflow-hidden max-w-5xl'>
            {words.map((word, wordIdx) => { return <p key={wordIdx} className='font-mono text-2xl p-2 inline'>{word}</p>})}
        </div>
        {/* Refresh button */}
        <div className="flex items-center gap-5">
        <TooltipProvider>
          <Tooltip>
          <TooltipTrigger className="h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 cursor-pointer" onClick={() => {setUserInput(''); setRandomWords(); containerRef.current?.focus();}}>
            <img src={RestartIcon} alt="retart icon" className="invert-0 dark:invert"/>
          </TooltipTrigger>
          <TooltipContent>
            <p>Restart Test</p>
          </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </div>
    </div>
  )
}

export default WordsDisplayArea