import { generate } from 'random-words';
import { useEffect, useState, useRef } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import RestartIcon from "../assets/refresh_20dp_000000_FILL0_wght400_GRAD0_opsz20.png"

function InputField() {
    const [words, setWords] = useState<String[]>([]);
    const [userInput, setUserInput] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const setRandomWords = () => {
      containerRef.current?.focus();
      const randomWords: String[] = generate(30) as String[];
      setWords(randomWords);
    };
    useEffect(() => {
        setRandomWords();
    },[])

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
    const allChars = words.join(' ').split('');
    const inputChars = userInput.split('');

    return (
    <div className='flex flex-col items-center justify-center h-150 w-screen min-h-[100px]'> 
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="outline-none font-mono text-xl flex flex-wrap gap-x-2 p-4 max-w-5xl w-fit justify-center"
    >
      {words.map((word, wordIdx) => (
        <div key={wordIdx} className="flex gap-[1px]">
          {word.split('').map((char, charIdx) => {
            const globalIdx =
              words.slice(0, wordIdx).join(' ').length + wordIdx + charIdx;
            const typedChar = inputChars[globalIdx];
            const isCurrent = globalIdx === userInput.length;

            let className = 'text-gray-500';
            if (typedChar != null) {
              className = typedChar === char ? 'text-green-600' : 'text-red-600';
            }

            return (
              <span key={charIdx} className="relative">
                <span className={className}>{char}</span>
                {isCurrent && (
                  <span className="absolute left-0 bottom-0 w-[2px] h-full bg-black animate-caret-blink invert-0 dark:invert" />
                )}
              </span>
            );
          })}
        </div>
      ))}
    </div>
    <div className="flex items-center gap-5">
        <TooltipProvider>
          <Tooltip>
          <TooltipTrigger className="h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5" onClick={() => {setRandomWords()}}>
            <img src={RestartIcon} alt="download icon" className="invert-0 dark:invert"/>
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

export default InputField;