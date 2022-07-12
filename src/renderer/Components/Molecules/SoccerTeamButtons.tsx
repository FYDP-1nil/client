import '../../Styles/Molecules/SoccerTeamButtons.css';

const SoccerTeamButtons = ({homeTeam}) => {
  return (
    <div className='soccer-team-btns'>
      <div className=" goal-counter-wrapper" style={{flexDirection:homeTeam?'row':'row-reverse'}}>
        <div className="goal-scorer-input-wrapper">
          <input className="player-input" placeholder='*Goal from' />
          <input className="player-input" placeholder='Assist from' />
        </div>
        <div className="counter">
          <div className="counter-btn">
            <div id="plusbg" />
            <div id="plus" />
          </div>
          <p>2</p>
          <div className="counter-btn">
            <div id="minusbg" />
            <div id="minus" />
          </div>
        </div>
      </div>

      <div className="soccer-btn-card shot-wrapper">
        <p>SHOT</p>
          <div className="shot-input-wrapper">
            <label className="on-target-cb-label">
              <input className='on-target-cb' type="checkbox" placeholder="On Target?" />
              <p style={{fontWeight:'normal'}}>On Target?</p>
            </label>
            <div className="shot-btn-wrapper">
          <div className="counter-btn">
            <div id="plusbg" />
            <div id="plus" />
          </div>
            <input className="player-input" placeholder="*Player" />
            </div>
          </div>
      </div>


      <div className="soccer-btn-card substitution-wrapper">
        <p>SUBSTITUTION</p>
        <div className="substitution-btn-wrapper">
          <div className="substitution-btn">🔄</div>
          <div className="substitution-input-wrapper">
            <input className="player-input" placeholder="*Player ON" />
            <input className="player-input" placeholder="*Player OFF" />
          </div>
        </div>
      </div>


      <div className="soccer-btn-card foul-wrapper">
        <p>FOUL</p>
        <div className="foul-btn-wrapper">
          <div className="foul-btn">🆇</div>
          <div className="foul-input-wrapper">
            <input className="player-input" placeholder="*Player" />
            <input className="player-input" placeholder="Reason" />
          </div>
        </div>
      </div>

      <div className="soccer-btn-card team-btn offside-btn">
        <p>OFFSIDE</p>
      </div>
      <div className="soccer-btn-card yellow-card-wrapper">
        <p>YELLOW CARD</p>
        {/* <p>*Player</p> */}
        <div className="yellow-card-btn-wrapper">
          <div className="yellow-card-btn" />
          <input className="player-input" placeholder="*Player" />
        </div>
      </div>
      <div className="soccer-btn-card red-card-wrapper">
        <p>RED CARD</p>
        <div className="red-card-btn-wrapper">
          <div className="red-card-btn" />
          <input className="player-input" placeholder="*Player" />
        </div>
      </div>
      <div className="soccer-btn-card team-btn penalty-btn">
        <p>PENALTY</p>
      </div>
    </div>
  );
};

export default SoccerTeamButtons;
