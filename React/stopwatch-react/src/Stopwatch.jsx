import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

function Stopwatch(){
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime,setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning){
                intervalIdRef.current = setInterval(() => {
                    setElapsedTime(Date.now() - startTimeRef.current);
                }, 10);
                //here we get elapsedTime is ms
            }
        return () => {
            clearInterval(intervalIdRef.current);
        }
    },[isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }
    function stop(){
        setIsRunning(false);
    }
    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
    }
    function formatTime(){
        // here we display elapsedTime but since it's in ms we need to convert it to hrs, min ,sec
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor(elapsedTime % (1000) / 10); 
        // in milliseconds / 10 at last to display 2 digits of ms only , else we'll have 4 digits 
        
        hours = String(hours).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        milliseconds = String(milliseconds).padStart(2,"0");
        return `${minutes}:${seconds}:${milliseconds}`;
        // return '000'; 
    }
    return(
        <div className="outer-watch-container">
            <div className="watch-container">
                <div className="display">{formatTime()}</div>
                <div className="controls">
                    <button className="Start" onClick={start}>Start</button>
                    <button className="Stop" onClick={stop}>Stop</button>
                    <button className="Reset" onClick={reset}>Reset</button>
                </div>
            </div>
        </div>
        
    );
}
export default Stopwatch