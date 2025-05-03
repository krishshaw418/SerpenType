import { generate } from 'random-words';
import { useEffect, useState, useRef } from 'react';
function InputField() {
    const [words, setWords] = useState<String[]>([]);
    const [userInput, setUserInput] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        containerRef.current?.focus();
        const randomWords: String[] = generate(30) as String[];
        setWords(randomWords);
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

    return (<div className='flex items-center justify-center'>
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="outline-none font-mono text-xl flex flex-wrap gap-x-2 p-4 max-w-3xl"
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
    </div>
    )
}

export default InputField;