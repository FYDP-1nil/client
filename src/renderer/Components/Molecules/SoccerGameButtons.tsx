import { endGame, halfTime, startGame } from 'renderer/Functions/Computation/Soccer';
import '../../Styles/Molecules/SoccerGameButtons.css'
const SoccerGameButtons = (props) => {

    const start = () => {
        startGame();
    };

    const half = () => {
        halfTime();
    };

    const end = () => {
        endGame();
    };

  return (
    <div className='soccer-game-btns'>
      <div onClick={start} className='soccer-game-btn soccer-game-btn-start'>
        <p>START GAME</p>
      </div>
      <div onClick={half} className='soccer-game-btn soccer-game-btn-half'>
        <p>HALF TIME</p>
      </div>
      <div onClick={end} className='soccer-game-btn soccer-game-btn-end'>
        <p>END GAME</p>
      </div>
    </div>
  );
};

export default SoccerGameButtons;
