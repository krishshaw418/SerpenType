import React, { createContext, useState } from "react";
type TimerContextType = {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
};

export const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [time, setTime] = useState(30);
  return (
    <TimerContext.Provider value={{ time, setTime }}>
      {children}
    </TimerContext.Provider>
  );
};
