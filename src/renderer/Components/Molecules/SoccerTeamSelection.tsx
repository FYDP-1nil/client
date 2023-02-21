import { useEffect, useState } from 'react';
import '../../Styles/Molecules/GameOptions.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { teamsSlice } from 'renderer/Slice/teamsSlice';

const SoccerTeamSelection = (props) => {

const navigate = useNavigate();
const dispatch = useDispatch();

const [homeTeam, setHomeTeam] = useState('');
const [awayTeam, setAwayTeam] = useState('');

const setTeams = () => {
    if(homeTeam.trim() && awayTeam.trim()){
        dispatch(teamsSlice.actions.assignTeamNames({homeTeamName:homeTeam,awayTeamName:awayTeam}));
        navigate('/soccer-scoreboard');
    }
};

  return (
    <div className="game-options">
      <div
        className="game-options-close"
        onClick={() => {
            props.setOpenModal(false);
            props.setSportSelected('');
          }}
        >
        x
      </div>
      <div className="game-options-wrapper">
        <div style={{alignItems:'center'}} className="textbox-wrapper">
          <input
            className="textbox"
            placeholder="Home Team Name"
            type="text"
            value={homeTeam}
            onChange={(e)=>setHomeTeam(e.target.value)}
          />
                    <input
            className="textbox"
            placeholder="Away Team Name"
            type="text"
            value={awayTeam}
            onChange={(e)=>setAwayTeam(e.target.value)}
          />
          <div className="btn-wrapper">
            {/* <Link to="/soccer-scoreboard"> */}
              <button style={{width:'auto'}} onClick={setTeams} className="btn join-btn">NEXT</button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoccerTeamSelection;
