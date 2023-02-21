import '../Styles/ScoreBoard.css';
import GridironGameButtons from './Molecules/GridironGameButtons';
import Timeline from './Molecules/Timeline';
import GridironStreamDeck from './Molecules/GridironStreamDeck';
import GridironTeamButtons from './Molecules/GridironTeamButtons';
import GridironScoreCard from './Molecules/GridironScoreCard';


const GridironScoreBoard = () => {

// let navigate = useNavigate();

  return (
    <div className="Scoreboard">
      <GridironTeamButtons isHomeTeam={true} />
      <div className='soccer-board-middle'>
        <GridironScoreCard />
        <GridironGameButtons />
        <GridironStreamDeck />
        <Timeline/>
      </div>
      <GridironTeamButtons isHomeTeam={false} />
    </div>
  );
};
export default GridironScoreBoard;
