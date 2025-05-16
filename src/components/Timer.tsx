import { useState, useEffect } from 'react'
import { Button } from './ui/button';
import { useContext } from 'react';
import { TimerContext } from '@/context/TimerStateContext';
function Timer() {
    const timerState = useContext(TimerContext);

    if(!timerState) {
        throw new Error("TimerContext is not defined");
    }

    const time = timerState.time; // updated value from context

    const initial = time; // initial value for updated timer

    const [start, setStart] = useState(time);

    useEffect(() => {
        setStart(time);
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

    if(start === 0)
        resetTimer();

  return (
    <div className='flex justify-center items-center'>
        <p>{ start }s</p>
        <Button variant="ghost" onClick={() => {setIsActive(!isActive); return (isActive? stopTimer(): startTimer())}}>
            {isActive? <p>Stop</p>: <p>Start</p>}
        </Button>
        <Button variant="ghost" onClick={ resetTimer }>
            <p>Reset</p>
        </Button>
    </div>
  )
}

export default Timer