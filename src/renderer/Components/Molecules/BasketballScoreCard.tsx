import { useSelector } from 'react-redux';
import { RootState } from 'renderer/store';
import '../../Styles/Molecules/SoccerScoreCard.css';
import Stopwatch from './Stopwatch';

const BasketballScoreCard = () => {
  
  const homeTeam = useSelector((state:RootState)=>state.teams.homeTeamName);
  const awayTeam = useSelector((state:RootState)=>state.teams.awayTeamName);
  const homeTeamScore = useSelector((state:RootState)=>state.pointHome.value);
  const awayTeamScore = useSelector((state:RootState)=>state.pointAway.value);
  
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
              <span style={{color:'blue'}} className="soccer-score-match-score-number soccer-score-match-score-number--leading">{homeTeamScore}</span>
              <span className="soccer-score-match-score-divider">:</span>
              <span style={{color:'red'}} className="soccer-score-match-score-number">{awayTeamScore}</span>
            </div>
            <div style={{color:'green'}} className="soccer-score-match-time-lapsed">
             <Stopwatch qtr={true} />
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

export default BasketballScoreCard;
