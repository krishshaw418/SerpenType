import React, { createContext, useState } from "react";

type MetricsContextType = {
    wpm: number;
    accuracy: number;
    raw: number;
    setWpm: React.Dispatch<React.SetStateAction<number>>;
    setAccuracy: React.Dispatch<React.SetStateAction<number>>;
    setRaw: React.Dispatch<React.SetStateAction<number>>;
}

export const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

export const MetricsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [raw, setRaw] = useState(0);

    return (
        <MetricsContext.Provider value={{ wpm, setWpm, accuracy, setAccuracy, raw, setRaw }}>
          {children}
        </MetricsContext.Provider>
      );
}