import React, { createContext, useState } from "react";

type MetricsContextType = {
    wpm: number;
    accuracy: number;
    raw: number;
    characterCount: number;
    correctCharCount: number;
    incorrectCharCount: number;
    setIncorrectCharCount: React.Dispatch<React.SetStateAction<number>>;
    setCorrectCharCount: React.Dispatch<React.SetStateAction<number>>;
    setCharacterCount: React.Dispatch<React.SetStateAction<number>>;
    setWpm: React.Dispatch<React.SetStateAction<number>>;
    setAccuracy: React.Dispatch<React.SetStateAction<number>>;
    setRaw: React.Dispatch<React.SetStateAction<number>>;
}

export const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

export const MetricsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [raw, setRaw] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);
    const [correctCharCount, setCorrectCharCount] = useState(0);
    const [incorrectCharCount, setIncorrectCharCount] = useState(0);

    return (
        <MetricsContext.Provider value={{ wpm, setWpm, accuracy, setAccuracy, raw, setRaw, characterCount, setCharacterCount, correctCharCount, setCorrectCharCount, incorrectCharCount, setIncorrectCharCount }}>
          {children}
        </MetricsContext.Provider>
      );
}