// import icon from '../../assets/icon.svg';
import '../Styles/ScoreBoard.css';
import runOBSMethod from '../Functions/Obs';
import { obs } from '../Functions/Obs';
import { MemoryRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SoccerTeamButtons from './Molecules/SoccerTeamButtons';
import SoccerStreamDeck from './Molecules/SoccerStreamDeck';
import SoccerGameButtons from './Molecules/SoccerGameButtons';
import SoccerScoreCard from './Molecules/SoccerScoreCard';
import Timeline from './Molecules/Timeline';
import * as soccer from '../Functions/Computation/Soccer.js';


const SoccerScoreBoard = (props) => {

// let navigate = useNavigate();

  return (
    <div className="Scoreboard">
      <SoccerTeamButtons isHomeTeam={true} />
      <div className='soccer-board-middle'>
        <SoccerScoreCard />
        <SoccerGameButtons />
        <SoccerStreamDeck />
        <Timeline/>
      </div>
      <SoccerTeamButtons isHomeTeam={false} />
    </div>
  );
};
export default SoccerScoreBoard;
