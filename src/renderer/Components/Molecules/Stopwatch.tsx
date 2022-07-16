import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "renderer/store";
import * as gameActions from 'renderer/Slice/gameSlice';


const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [running, setRunning] = useState(true);

  const activeGame = useSelector((state: RootState) => state.game.activeGame);
  const isHalfTime = useSelector((state: RootState) => state.game.isHalfTime);
//   const minute = useSelector((state:RootState)=>state.game.currentMinute);
  const dispatch = useDispatch();



  useEffect(() => {
    let interval:any;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
        setCounter(prev=>(prev+1)%60);
      }, 1000);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    // if(time){
    // console.log(time);
    if(!counter){
        dispatch(gameActions.setCurrentMinute(Math.floor((time / 60000))));
        console.log('minute: ',Math.floor((time / 60000)));
    }
    // }
  }, [counter]);

  return (
    <div className="stopwatch">
      {isHalfTime?<div>HT</div>:<div className="numbers">
      {/* <div>{(((time / 60000) % 90))}:</div> */}
        <span>{("0" + Math.floor((time / 60000))).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>}
      {/* <div className="buttons"> */}
        {/* <button onClick={() => setRunning(true)}>Start</button> */}
        {/* <button onClick={() => setRunning(false)}>Stop</button> */}
        {/* <button onClick={() => setTime(0)}>Reset</button> */}
        {/* <button onClick={() => setEve(!eve)}>EVE</button> */}
      {/* </div> */}
      {/* <div>{minute}</div> */}
    </div>
  );
};

export default Stopwatch;
