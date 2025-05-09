import { useState, useEffect } from 'react'
import { Button } from './ui/button';
function Timer() {
    let time = 15;
    const [seconds, setSeconds] = useState(time);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: undefined | ReturnType<typeof setTimeout>;
        if(isActive) {
            interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const startTimer = () => setIsActive(true);
    const stopTimer = () => setIsActive(false);
    const resetTimer = () => {
        setIsActive(false);
        setSeconds(time);
    }

  return (
    <div className='flex justify-center items-center'>
        <p>{seconds}s</p>
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