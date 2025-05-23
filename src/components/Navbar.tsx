import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Avatar,
  // AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import DownloadIcon from "../assets/download_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.png";
import { ModeToggle } from "./mode-toggle";
// import { useContext, useEffect } from "react";
// import { TimerContext } from "@/context/TimerStateContext";
// import infoIcon from "../assets/info_i_20dp_000000_FILL0_wght700_GRAD0_opsz20.png";
// import keyboardIcon from "../assets/keyboard_20dp_000000_FILL0_wght700_GRAD0_opsz24.png";
// import crownIcon from "../assets/crown_20dp_000000_FILL0_wght700_GRAD0_opsz20.png";

function Navbar() {
  const navigate = useNavigate();
  // const timerState = useContext(TimerContext);
  //   if(!timerState) {
  //       throw new Error("TimerContext is not defined");
  //   }
  //   useEffect(()=>{
  //     const timerPreference = localStorage.getItem('timer');
  //     const parsedTime = parseInt(timerPreference ?? '30', 10);
  //     if(!isNaN(parsedTime)){
  //       timerState.setTime(parsedTime);
  //     }
  //   },[]);
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div className="text-2xl font-bold flex gap-2 items-center">
      <Avatar>
      <AvatarImage src="/2-removebg-preview.png" alt="@shadcn" className="invert-0 dark:invert w-8 h-8"/>
      </Avatar>
      <button className="cursor-pointer" onClick={() => navigate("/")}>SerpenType</button>
      </div>
      {/* <div className="flex gap-4 justify-center items-center">
        <img src={keyboardIcon} alt="info-icon" className="w-[20px] h-[20px] dark:invert"/>
        <img src={infoIcon} alt="info-icon" className="w-[19px] h-[19px] dark:invert"/>
        <img src={crownIcon} alt="info-icon" className="w-[20px] h-[20px] dark:invert"/>
      </div> */}
      <div className="hidden md:flex gap-4">
      {/* <Button 
      className={`cursor-pointer ${timerState.time===15?"text-blue-700":""} hover:text-white`} 
      variant="ghost" 
      onClick={() => {
        timerState.setTime(15);
        localStorage.setItem('timer', '15');
        }}>15s</Button>
      <Button 
      className={`cursor-pointer ${timerState.time===30?"text-blue-700":""} hover:text-white`} 
      variant="ghost" 
      onClick={() => {
        timerState.setTime(30);
        localStorage.setItem('timer', '30');
        }}>30s</Button>
      <Button 
      className={`cursor-pointer ${timerState.time===60?"text-blue-700":""} hover:text-white`} 
      variant="ghost" 
      onClick={() => {
        timerState.setTime(60);
        localStorage.setItem('timer', '60');
        }}>60s</Button>
        <div className="flex items-center gap-5">
        <TooltipProvider>
          <Tooltip>
          <TooltipTrigger className="h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 cursor-pointer" onClick={() => navigate("/metrics")}>
            <img src={DownloadIcon} alt="download icon" className="invert-100 dark:invert-0"/>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download Metrics</p>
          </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        </div> */}
        <ModeToggle/>
      </div>

      {/* Mobile Responsive Sheet */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Menu</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              <Button variant="outline">15s Mode</Button>
              <Button variant="outline">30s Mode</Button>
              <Button variant="outline">60s Mode</Button>
              <Button variant="outline">Restart</Button>
              <Button variant="outline">Settings</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar