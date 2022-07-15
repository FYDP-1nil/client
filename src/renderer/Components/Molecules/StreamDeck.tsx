import { showStats, startStream, stopStream } from 'renderer/Functions/Computation/Soccer';
import '../../Styles/Molecules/StreamDeck.css'
const StreamDeck = (props) => {

  const start = () => {
    startStream();
  };

  const stop = () => {
    stopStream();
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
