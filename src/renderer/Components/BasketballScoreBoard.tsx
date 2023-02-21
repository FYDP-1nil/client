import '../Styles/ScoreBoard.css';
import SoccerGameButtons from './Molecules/SoccerGameButtons';
import SoccerScoreCard from './Molecules/SoccerScoreCard';
import Timeline from './Molecules/Timeline';
import BasketballStreamDeck from './Molecules/BasketballStreamDeck';
import BasketballTeamButtons from './Molecules/BasketballTeamButtons';


const BasketballScoreBoard = () => {

// let navigate = useNavigate();

  return (
    <div className="Scoreboard">
      <BasketballTeamButtons isHomeTeam={true} />
      <div className='soccer-board-middle'>
        <SoccerScoreCard />
        <SoccerGameButtons />
        <BasketballStreamDeck />
        <Timeline/>
      </div>
      <BasketballTeamButtons isHomeTeam={false} />
    </div>
  );
};
export default BasketballScoreBoard;
