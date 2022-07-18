import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showStats, startStream, stopStream } from 'renderer/Functions/Computation/Soccer';
import { RootState } from 'renderer/store';
import * as streamingActions from '../../Slice/streamingSlice';
import * as gameActions from '../../Slice/gameSlice';
import * as goalAwayActions from '../../Slice/goalAwaySlice';
import * as goalHomeActions from '../../Slice/goalHomeSlice';
import * as teamActions from '../../Slice/teamsSlice';
import '../../Styles/Molecules/StreamDeck.css'


const StreamDeck = (props) => {

  const dispatch = useDispatch();

  const gameEnded = useSelector((state:RootState)=>state.game.gameEnded);

  const navigate = useNavigate();

  const start = () => {
    startStream();
    dispatch(streamingActions.setStreaming(true));
  };

  const stop = () => {
    stopStream();
    dispatch(streamingActions.setStreaming(false));
    if(gameEnded){
      dispatch(gameActions.reset());
      dispatch(teamActions.resetNames());
      dispatch(goalAwayActions.reset());
      dispatch(goalHomeActions.reset());
      navigate('/dashboard',{replace:true});
    }
  };

  const stats = () => {
    showStats();
  };

  return (
    <div className='deck'>
      <p>STREAM</p>
      <div className='stream-deck-btn-wrapper'>
      <div onClick={start} className='stream-deck-btn stream-deck-btn-start'>
        <div className='circle'></div>
        <p>START</p>
      </div>
      <div onClick={stop} className='stream-deck-btn stream-deck-btn-stop'>
        <div className='square'></div>
        <p>STOP</p>
      </div>
      <div onClick={stats} className='stream-deck-btn stream-deck-btn-stats'>
        <p>SHOW STATS</p>
      </div>
      </div>
    </div>
  );
};

export default StreamDeck;
