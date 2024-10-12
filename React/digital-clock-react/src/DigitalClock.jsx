import { useEffect, useState } from "react";

function DigitalClock(){
    const [time,setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000); //Time is updated every 1000ms ie every second

        return() => {
            clearInterval(intervalId);
            // clear the interval when component unmounts, prevents undefined erros 
        }
    },[]) //passed [] so interval loads only once(when component mounts)

    function formatTime(){
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM" ;

        //To display in 12 hr format
        hours = hours%12 || 12;
        // At 12 o'clock, hours%12 = 0 & we won't display 0 so (0 || 12) = 12 ie (F || T)
        
        return (`${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}${meridiem}`);
    }

    //padZero is used if any unit < 10 ie 7,6,5 etc we'd display 07,06,05
    function padZero(number){
        return (number > 10 ? "" : "0") + number;
    }
    return(
        <div className="clock-container">
            <div className="clock">
                <span>{formatTime()}</span>
            </div>
        </div>
    );
}
export default DigitalClock