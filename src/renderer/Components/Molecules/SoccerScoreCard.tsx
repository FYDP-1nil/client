import '../../Styles/Molecules/SoccerScoreCard.css';
import Stopwatch from './Stopwatch';

const SoccerScoreCard = ({homeTeam,awayTeam}) => {
  return (
    <div className="soccer-score-container">
    <div className="soccer-score-match">
      <div className="soccer-score-match-content">
        <div className="soccer-score-column">
          <div className="soccer-score-team soccer-score-team--home">
            <div className="soccer-score-team-logo">
              <div id="soccer-score-circ"></div>
            </div>
            <h2 style={{color:'blue'}} className="soccer-score-team-name">{homeTeam}</h2>
          </div>
        </div>
        <div className="soccer-score-column">
          <div className="soccer-score-match-details">
            <div className="soccer-score-match-score">
              <span style={{color:'blue'}} className="soccer-score-match-score-number soccer-score-match-score-number--leading">2</span>
              <span className="soccer-score-match-score-divider">:</span>
              <span style={{color:'red'}} className="soccer-score-match-score-number">0</span>
            </div>
            <div style={{color:'green'}} className="soccer-score-match-time-lapsed">
             <Stopwatch />
            </div>
          </div>
        </div>
        <div className="soccer-score-column">
          <div className="soccer-score-team soccer-score-team--away">
            <div className="soccer-score-team-logo">
              <div id="soccer-score-test"></div>
            </div>
            <h2 style={{color:'red'}} className="soccer-score-team-name">{awayTeam}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SoccerScoreCard;
