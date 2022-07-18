import { useEffect, useState } from 'react';
import '../../Styles/Molecules/GameOptions.css';
import { Link } from 'react-router-dom';
import SoccerTeamSelection from './SoccerTeamSelection';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/store';

const LeagueScreen = (props) => {

  const validLeague = useSelector((state:RootState)=>state.tokens.leagueValid);

  return validLeague ? (
    <SoccerTeamSelection
      setOpenModal={props.setOpenModal}
      setSportSelected={props.setSportSelected}
    />
  ) : (
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
            placeholder="League Name"
            type="text"
            // value={search}
            // onChange={searchChange}
          />
          <input
            className="textbox"
            placeholder="Password"
            type="password"
            // value={search}
            // onChange={searchChange}
          />
          <div className="btn-wrapper">
            <button className="btn join-btn" onClick={authLeague}>JOIN</button>
            <button className="btn create-btn">CREATE NEW LEAGUE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueScreen;
