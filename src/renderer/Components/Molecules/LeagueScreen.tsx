import { useEffect, useState } from 'react';
import '../../Styles/Molecules/GameOptions.css';
import { Link } from 'react-router-dom';

const LeagueScreen = (props) => {
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
      <p>JOIN YOUR LEAGUE</p>
      <div className="game-options-wrapper">
        <div className="textbox-wrapper">
          <input
            className="textbox"
            placeholder="League ID"
            type="text"
            // value={search}
            // onChange={searchChange}
          />
          <div className="btn-wrapper">
            <Link to="/soccer-scoreboard">
              <button className="btn join-btn">JOIN</button>
            </Link>
            <button className="btn create-btn">CREATE NEW LEAGUE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueScreen;
