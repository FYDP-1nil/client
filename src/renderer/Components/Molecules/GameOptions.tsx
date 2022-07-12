import { useEffect, useState } from 'react';
import '../../Styles/Molecules/GameOptions.css';

import basketball from '../../../../assets/basketball.png';
import soccer from '../../../../assets/soccer-ball.png';
import cricket from '../../../../assets/cricket-ball.png';
import { Link } from 'react-router-dom';
import LeagueScreen from './LeagueScreen';

const GameOptions = (props) => {
  enum SPORT_TYPE {
    SOCCER = 'soccer',
    BASKETBALL = 'basketball',
    CRICKET = 'cricket',
  }

  const [sportSelected, setSportSelected] = useState('');
  return sportSelected in SPORT_TYPE ? (
    <LeagueScreen
      setOpenModal={props.setOpenModal}
      setSportSelected={setSportSelected}
    />
  ) : (
    <div className="game-options">
      <div
        className="game-options-close"
        onClick={() => {
          props.setOpenModal(false);
          setSportSelected('');
        }}
      >
        x
      </div>
      <p>CHOOSE SPORT TO STREAM</p>
      <div className="game-options-wrapper">
        <div className="basketball-btn">
          <img className="logo" src={basketball} alt="basketball" />
          BASKETBALL
        </div>
        <div className="soccer-btn" onClick={() => setSportSelected('SOCCER')}>
          <img className="logo" src={soccer} alt="soccer" />
          SOCCER
        </div>
        <div className="cricket-btn">
          <img className="logo" src={cricket} alt="cricket" />
          CRICKET
        </div>
      </div>
    </div>
  );
};

export default GameOptions;
