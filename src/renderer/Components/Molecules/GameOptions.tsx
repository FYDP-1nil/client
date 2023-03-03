import { useEffect, useState } from 'react';
import '../../Styles/Molecules/GameOptions.css';

// import basketball from '../../../../assets/basketball.png';
// import soccer from '../../../../assets/soccer-ball.png';
// import gridiron from '../../../../assets/gridiron-ball.png';
// import { Link } from 'react-router-dom';
import LeagueScreen from './LeagueScreen';

const GameOptions = (props) => {
  enum SPORT_TYPE {
    SOCCER = 'soccer',
    BASKETBALL = 'basketball',
    GRIDIRON = 'gridiron',
  }

  const [sportSelected, setSportSelected] = useState('');
  return sportSelected in SPORT_TYPE ? (
    <LeagueScreen
      setOpenModal={props.setOpenModal}
      setSportSelected={setSportSelected}
      sportSelected={sportSelected}
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
        <p className="logo"  onClick={() => setSportSelected('BASKETBALL')}>🏀</p>
          BASKETBALL
        </div>
        <div className="soccer-btn" onClick={() => setSportSelected('SOCCER')}>
        <p className="logo">⚽️</p>
          SOCCER
        </div>
        <div className="gridiron-btn">
          <p className="logo" onClick={() => setSportSelected('GRIDIRON')}>🏈</p>
          GRIDIRON
        </div>
      </div>
    </div>
  );
};

export default GameOptions;
