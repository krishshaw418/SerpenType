import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DownloadIcon from "../assets/download_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.png";
// import infoIcon from "../assets/info_i_20dp_000000_FILL0_wght500_GRAD0_opsz20.png";
import keyboardIcon from "../assets/keyboard_20dp_000000_FILL0_wght400_GRAD0_opsz20.png";
import crownIcon from "../assets/crown_20dp_000000_FILL0_wght400_GRAD0_opsz20.png";
import { useContext, useEffect } from "react";
import { TimerContext } from "@/context/TimerStateContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import About from "@/Pages/About";
function Toolbar() {
    const navigate = useNavigate();
    const timerState = useContext(TimerContext);
        if(!timerState) {
            throw new Error("TimerContext is not defined");
        }
        useEffect(()=>{
          const timerPreference = localStorage.getItem('timer');
          const parsedTime = parseInt(timerPreference ?? '30', 10);
          if(!isNaN(parsedTime)){
            timerState.setTime(parsedTime);
          }
        },[]);
  return (
    <div className="flex flex-row gap-5 justify-center">
        <div className="flex items-center gap-5">
        <TooltipProvider>
          <Tooltip>
          <TooltipTrigger className="h-8 rounded-md has-[>svg]:px-2.5 cursor-pointer" onClick={() => navigate("/metrics")}>
            <img src={crownIcon} alt="info-icon" className="w-[20px] h-[20px] dark:invert"/>
          </TooltipTrigger>
          <TooltipContent>
            <p>Latest Best</p>
          </TooltipContent>
          </Tooltip>
        </TooltipProvider>
          {/* <img src={infoIcon} alt="info-icon" className="w-[19px] h-[19px] dark:invert"/> */}
          <About/>
        <TooltipProvider>
          <Tooltip>
          <TooltipTrigger className="h-8 rounded-md has-[>svg]:px-2.5 cursor-pointer" onClick={() => navigate("/metrics")}>
            <img src={DownloadIcon} alt="download icon" className="invert-100 dark:invert-0"/>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download Metrics</p>
          </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
          <TooltipTrigger className="h-8 rounded-md has-[>svg]:px-2.5 cursor-pointer" onClick={() => navigate("/metrics")}>
            <img src={keyboardIcon} alt="info-icon" className="w-[23px] h-[25px] dark:invert"/>
          </TooltipTrigger>
          <TooltipContent>
            <p>Start Test</p>
          </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div>
        <Button 
        className={`cursor-pointer ${timerState.time===15?"text-blue-700":""}`} 
        variant="ghost" 
        onClick={() => {
        timerState.setTime(15);
        localStorage.setItem('timer', '15');
        }}>15s</Button>
        <Button 
        className={`cursor-pointer ${timerState.time===30?"text-blue-700":""}`} 
        variant="ghost" 
        onClick={() => {
        timerState.setTime(30);
        localStorage.setItem('timer', '30');
        }}>30s</Button>
        <Button 
        className={`cursor-pointer ${timerState.time===60?"text-blue-700":""}`} 
        variant="ghost" 
        onClick={() => {
        timerState.setTime(60);
        localStorage.setItem('timer', '60');
        }}>60s</Button>
        </div>
        </div>
    </div>
  )
}

export default Toolbar