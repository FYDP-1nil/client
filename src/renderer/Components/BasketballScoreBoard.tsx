import '../Styles/ScoreBoard.css';
import Timeline from './Molecules/Timeline';
import BasketballStreamDeck from './Molecules/BasketballStreamDeck';
import BasketballTeamButtons from './Molecules/BasketballTeamButtons';
import BasketballScoreCard from './Molecules/BasketballScoreCard';
import BasketballGameButtons from './Molecules/BasketballGameButtons';


const BasketballScoreBoard = () => {

// let navigate = useNavigate();

  return (
    <div className="Scoreboard">
      <BasketballTeamButtons isHomeTeam={true} />
      <div className='soccer-board-middle'>
        <BasketballScoreCard />
        <BasketballGameButtons />
        <BasketballStreamDeck />
        <Timeline/>
      </div>
      <BasketballTeamButtons isHomeTeam={false} />
    </div>
  );
};
export default BasketballScoreBoard;
