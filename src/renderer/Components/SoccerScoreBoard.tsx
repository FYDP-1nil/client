// import icon from '../../assets/icon.svg';
import '../Styles/SoccerScoreBoard.css';
import runOBSMethod from '../Functions/Obs';
import { obs } from '../Functions/Obs';
import { MemoryRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SoccerTeamButtons from './Molecules/SoccerTeamButtons';
import StreamDeck from './Molecules/StreamDeck';
import SoccerGameButtons from './Molecules/SoccerGameButtons';
import SoccerScoreCard from './Molecules/SoccerScoreCard';
import SoccerTimeline from './Molecules/SoccerTimeline';
import * as soccer from '../Functions/Computation/Soccer.js';

// const ttt = () => {
//   let scene = Math.round(Math.random()) ? 'Scene' : 'Scene2';
//   runOBSMethod('SetCurrentScene', {
//     'scene-name': scene,
//   });
// };

// const uuu = () => runOBSMethod('RefreshBrowserSource', { sourceName: 'TEST' });

const SoccerScoreBoard = (props) => {
//   useEffect(() => {

// }, []);

// let navigate = useNavigate();

  return (
    <div className="Scoreboard">
      <SoccerTeamButtons isHomeTeam={true} homeTeam={`kiii`} awayTeam={`jjj`} />
      <div className='soccer-board-middle'>
        <SoccerScoreCard homeTeam={`kiii`} awayTeam={`jjj`} />
        <SoccerGameButtons />
        <StreamDeck />
        <SoccerTimeline/>
      </div>
      <SoccerTeamButtons isHomeTeam={false} homeTeam={`kiii`} awayTeam={`jjj`} />
      {/* <button onClick={()=>{soccer.startStream();}}>goal</button>
      <button onClick={()=>{soccer.stopStream();navigate("/dashboard", { replace: true });}}>stop</button> */}
    </div>
  );
};
export default SoccerScoreBoard;
