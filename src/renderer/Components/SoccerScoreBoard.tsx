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


const SoccerScoreBoard = (props) => {

// let navigate = useNavigate();

  return (
    <div className="Scoreboard">
      <SoccerTeamButtons isHomeTeam={true} />
      <div className='soccer-board-middle'>
        <SoccerScoreCard />
        <SoccerGameButtons />
        <StreamDeck />
        <SoccerTimeline/>
      </div>
      <SoccerTeamButtons isHomeTeam={false} />
    </div>
  );
};
export default SoccerScoreBoard;
