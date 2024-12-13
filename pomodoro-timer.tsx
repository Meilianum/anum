
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "./ui/card";
// import { PauseIcon, PlayIcon, RefreshCwIcon, MinusIcon, PlusIcon } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";

// type TimerStatus = "idle" | "running" | "paused";
// type SessionType = "work" | "break";

// interface PomodoroState {
//   workDuration: number;
//   breakDuration: number;
//   currentTime: number;
//   currentSession: SessionType;
//   timerStatus: TimerStatus;
// }

// export default function PomodoroComponent() {
//   const [state, setState] = useState<PomodoroState>({
//     workDuration: 25 * 60,
//     breakDuration: 5 * 60,
//     currentTime: 25 * 60,
//     currentSession: "work",
//     timerStatus: "idle",
//   });

//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (state.timerStatus === "running" && state.currentTime > 0) {
//       timerRef.current = setInterval(() => {
//         setState((prevState) => ({
//           ...prevState,
//           currentTime: prevState.currentTime - 1,
//         }));
//       }, 1000);
//     } else if (state.currentTime === 0) {
//       clearInterval(timerRef.current as NodeJS.Timeout);
//       handleSessionSwitch();
//     }
//     return () => clearInterval(timerRef.current as NodeJS.Timeout);
//   }, [state.timerStatus, state.currentTime]);

//   const handleSessionSwitch = (): void => {
//     setState((prevState) => ({
//       ...prevState,
//       currentSession: prevState.currentSession === "work" ? "break" : "work",
//       currentTime:
//         prevState.currentSession === "work"
//           ? prevState.breakDuration
//           : prevState.workDuration,
//     }));
//   };

//   const handleStartPause = (): void => {
//     if (state.timerStatus === "running") {
//       setState({ ...state, timerStatus: "paused" });
//       clearInterval(timerRef.current as NodeJS.Timeout);
//     } else {
//       setState({ ...state, timerStatus: "running" });
//     }
//   };

//   const handleReset = (): void => {
//     clearInterval(timerRef.current as NodeJS.Timeout);
//     setState({
//       ...state,
//       currentTime: state.workDuration,
//       currentSession: "work",
//       timerStatus: "idle",
//     });
//   };

//   const handleDurationChange = (type: SessionType, increment: boolean): void => {
//     setState((prevState) => {
//       const durationChange = increment ? 60 : -60;
//       if (type === "work") {
//         return {
//           ...prevState,
//           workDuration: Math.max(60, prevState.workDuration + durationChange),
//           currentTime:
//             prevState.currentSession === "work"
//               ? Math.max(60, prevState.workDuration + durationChange)
//               : prevState.currentTime,
//         };
//       } else {
//         return {
//           ...prevState,
//           breakDuration: Math.max(60, prevState.breakDuration + durationChange),
//           currentTime:
//             prevState.currentSession === "break"
//               ? Math.max(60, prevState.breakDuration + durationChange)
//               : prevState.currentTime,
//         };
//       }
//     });
//   };

//   const formatTime = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
//       <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
//         <div className="flex flex-col items-center justify-center gap-6">
//           <h1 className="text-4xl font-serif">Pomodoro Timer</h1>
//           <div className="text-2xl font-medium">
//             {state.currentSession === "work" ? "Work" : "Break"}
//           </div>
//           <div className="text-8xl font-bold">{formatTime(state.currentTime)}</div>
//           <div className="flex items-center gap-4">
          
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//              <Button onClick={() => handleDurationChange("work", false)}>
//               <MinusIcon />
//             </Button>
//             <Button onClick={() => handleDurationChange("work", true)}>
//              < PlusIcon />
//             </Button>
//             <Button onClick={handleStartPause}>
//               {state.timerStatus === "running" ? <PauseIcon /> : <PlayIcon />}
//             </Button>
//             <Button onClick={handleReset}>
//               <RefreshCwIcon />
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import { PauseIcon, PlayIcon, RefreshCwIcon, MinusIcon, PlusIcon } from "lucide-react";

type TimerStatus = "idle" | "running" | "paused";
type SessionType = "work" | "break";

interface PomodoroState {
  workDuration: number;
  breakDuration: number;
  currentTime: number;
  currentSession: SessionType;
  timerStatus: TimerStatus;
}

export default function PomodoroComponent() {
  const [state, setState] = useState<PomodoroState>({
    workDuration: 25 * 60,
    breakDuration: 5 * 60,
    currentTime: 25 * 60,
    currentSession: "work",
    timerStatus: "idle",
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state.timerStatus === "running" && state.currentTime > 0) {
      timerRef.current = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          currentTime: prevState.currentTime - 1,
        }));
      }, 1000);
    } else if (state.currentTime === 0) {
      clearInterval(timerRef.current as NodeJS.Timeout);
      handleSessionSwitch();
    }
    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, [state.timerStatus, state.currentTime]);

  const handleSessionSwitch = (): void => {
    setState((prevState) => ({
      ...prevState,
      currentSession: prevState.currentSession === "work" ? "break" : "work",
      currentTime:
        prevState.currentSession === "work"
          ? prevState.breakDuration
          : prevState.workDuration,
    }));
  };

  const handleStartPause = (): void => {
    if (state.timerStatus === "running") {
      setState({ ...state, timerStatus: "paused" });
      clearInterval(timerRef.current as NodeJS.Timeout);
    } else {
      setState({ ...state, timerStatus: "running" });
    }
  };

  const handleReset = (): void => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    setState({
      ...state,
      currentTime: state.workDuration,
      currentSession: "work",
      timerStatus: "idle",
    });
  };

  const handleDurationChange = (type: SessionType, increment: boolean): void => {
    setState((prevState) => {
      const durationChange = increment ? 60 : -60;
      if (type === "work") {
        return {
          ...prevState,
          workDuration: Math.max(60, prevState.workDuration + durationChange),
          currentTime:
            prevState.currentSession === "work"
              ? Math.max(60, prevState.workDuration + durationChange)
              : prevState.currentTime,
        };
      } else {
        return {
          ...prevState,
          breakDuration: Math.max(60, prevState.breakDuration + durationChange),
          currentTime:
            prevState.currentSession === "break"
              ? Math.max(60, prevState.breakDuration + durationChange)
              : prevState.currentTime,
        };
      }
    });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
   
         <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="flex flex-col items-center justify-center gap-6">
        <img src="/image/t1.jpg" alt="pic" className="animationzz"/>
          <h1 className="text-4xl font-serif">Pomodoro Timer</h1>
          <div className="text-2xl font-medium">
          <img src="/image/t.jpg" alt="timer pic" 
          className="h-10 w-200  animate-bounce" />
            {state.currentSession === "work" ? "Work" : "Break"}
          </div>
          <div className="text-8xl font-bold">{formatTime(state.currentTime)}</div>
          <div className="flex items-center gap-4 text-white">
            <Button onClick={() => handleDurationChange("work", false)} className="border-2 border-black bg-slate-600 rounded-2xl " >
              <MinusIcon />
            </Button>
            <Button onClick={() => handleDurationChange("work", true)} className="border-2 border-black bg-slate-600 rounded-2xl ">
              <PlusIcon />
            </Button>
            <Button onClick={handleStartPause} className="border-2 border-black bg-slate-600 rounded-2xl ">
              {state.timerStatus === "running" ? <PauseIcon /> : <PlayIcon />}
            </Button>
            <Button onClick={handleReset} className="border-2 border-black bg-slate-600 rounded-2xl ">
              <RefreshCwIcon />
            </Button>
           
          </div>
        
        </div>
      
      </Card>
 </div>
    </div>
  );
}
