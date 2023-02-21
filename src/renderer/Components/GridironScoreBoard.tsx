import '../Styles/ScoreBoard.css';
import GridironGameButtons from './Molecules/GridironGameButtons';
import SoccerScoreCard from './Molecules/SoccerScoreCard';
import Timeline from './Molecules/Timeline';
import GridironStreamDeck from './Molecules/GridironStreamDeck';
import GridironTeamButtons from './Molecules/GridironTeamButtons';


const GridironScoreBoard = () => {

// let navigate = useNavigate();

  return (
    <div className="Scoreboard">
      <GridironTeamButtons isHomeTeam={true} />
      <div className='soccer-board-middle'>
        <SoccerScoreCard />
        <GridironGameButtons />
        <GridironStreamDeck />
        <Timeline/>
      </div>
      <GridironTeamButtons isHomeTeam={false} />
    </div>
  );
};
export default GridironScoreBoard;
