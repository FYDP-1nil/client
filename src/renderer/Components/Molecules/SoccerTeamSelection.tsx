import { useEffect, useState } from 'react';
import '../../Styles/Molecules/GameOptions.css';
import { Link, useNavigate } from 'react-router-dom';

const SoccerTeamSelection = (props) => {

const navigate = useNavigate();

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
            // value={search}
            // onChange={searchChange}
          />
                    <input
            className="textbox"
            placeholder="Away Team Name"
            type="text"
            // value={search}
            // onChange={searchChange}
          />
          <div className="btn-wrapper">
            <Link to="/soccer-scoreboard">
              <button style={{width:'auto'}} className="btn join-btn">NEXT</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoccerTeamSelection;
