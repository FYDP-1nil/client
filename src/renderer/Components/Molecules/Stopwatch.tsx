import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "renderer/store";
import * as gameActions from 'renderer/Slice/gameSlice';


const Stopwatch = ({qtr}) => {
  const [time, setTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [running, setRunning] = useState(true);

  const activeGame = useSelector((state: RootState) => state.game.activeGame);
  const isHalfTime = useSelector((state: RootState) => state.game.isHalfTime);
  const gameEnded = useSelector((state: RootState) => state.game.gameEnded);

  const dispatch = useDispatch();



  useEffect(() => {
    let interval:any;
    if (activeGame && !isHalfTime) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
        setCounter(prev=>(prev+1)%60);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [activeGame,isHalfTime]);

  useEffect(() => {
    if(!counter){
        dispatch(gameActions.setCurrentMinute(Math.floor((time / 60000))));
    }
  }, [counter]);

  useEffect(() => {
    if(isHalfTime){
        let minuteAtHalf = Math.floor((time / 60000)) >= 45 ? 2700000 : Math.floor((time / 60000)) * 60 * 1000; 
        setTime(minuteAtHalf);
        console.log(minuteAtHalf);
        setCounter(0);
    }
  }, [isHalfTime]);


  return (
    <div className="stopwatch">
      {gameEnded ? <div>FT</div> : isHalfTime?<div>HT</div>:<div className="numbers">
        {qtr && <span>{`Q1 `}</span>}
        <span>{("0" + Math.floor((time / 60000))).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>}
    </div>
  );
};

export default Stopwatch;
