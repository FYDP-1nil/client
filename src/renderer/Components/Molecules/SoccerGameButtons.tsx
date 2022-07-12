import '../../Styles/Molecules/SoccerGameButtons.css'
const SoccerGameButtons = (props) => {
  return (
    <div className='soccer-game-btns'>
      <div className='soccer-game-btn soccer-game-btn-start'>
        <p>START GAME</p>
      </div>
      <div className='soccer-game-btn soccer-game-btn-half'>
        <p>HALF TIME</p>
      </div>
      <div className='soccer-game-btn soccer-game-btn-end'>
        <p>END GAME</p>
      </div>
    </div>
  );
};

export default SoccerGameButtons;
