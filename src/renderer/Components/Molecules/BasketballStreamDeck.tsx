import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showStats, startStream, stopStream } from 'renderer/Functions/Computation/Basketball';
import { RootState } from 'renderer/store';
import * as streamingActions from '../../Slice/streamingSlice';
import * as gameActions from '../../Slice/gameSlice';
import * as pointAwayActions from '../../Slice/pointAwaySlice';
import * as pointHomeActions from '../../Slice/pointHomeSlice';
import * as teamActions from '../../Slice/teamsSlice';
import '../../Styles/Molecules/StreamDeck.css'


const BasketballStreamDeck = (props) => {

  const dispatch = useDispatch();

  const gameEnded = useSelector((state:RootState)=>state.game.gameEnded);
  const isStreaming = useSelector((state:RootState)=>state.streaming.isStreaming);

  const navigate = useNavigate();

  const start = () => {
    if(!isStreaming){
    startStream();
    dispatch(streamingActions.setStreaming(true));
    }
  };

  const stop = () => {
    if(isStreaming){
    stopStream();
    dispatch(streamingActions.setStreaming(false));
    if(gameEnded){
      dispatch(gameActions.reset());
      dispatch(teamActions.resetNames());
      dispatch(pointAwayActions.reset());
      dispatch(pointHomeActions.reset());
      navigate('/dashboard',{replace:true});
    }
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

export default BasketballStreamDeck;
