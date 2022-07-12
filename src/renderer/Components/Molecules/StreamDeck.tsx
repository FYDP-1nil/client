import '../../Styles/Molecules/StreamDeck.css'
const StreamDeck = (props) => {
  return (
    <div className='deck'>
      <p>STREAM</p>
      <div className='stream-deck-btn-wrapper'>
      <div className='stream-deck-btn stream-deck-btn-start'>
        <div className='circle'></div>
        <p>START</p>
      </div>
      <div className='stream-deck-btn stream-deck-btn-stop'>
        <div className='square'></div>
        <p>STOP</p>
      </div>
      <div className='stream-deck-btn stream-deck-btn-stats'>
        <p>SHOW STATS</p>
      </div>
      </div>
    </div>
  );
};

export default StreamDeck;
