import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { generateScoreCardTimer } from 'renderer/Functions/Computation/SoccerObsHelper';
import {
  endGame,
  halfTime,
  startGame,
} from 'renderer/Functions/Computation/Soccer';
import { writeTimer } from 'renderer/Functions/Computation/SoccerTemplates';
import { sleep } from 'renderer/Functions/Computation/utility';
import { RootState } from 'renderer/store';
import * as gameActions from '../../Slice/gameSlice';
import * as pointAwayActions from '../../Slice/pointAwaySlice';
import * as pointHomeActions from '../../Slice/pointHomeSlice';
import * as teamActions from '../../Slice/teamsSlice';

import '../../Styles/Molecules/SoccerGameButtons.css';
const SoccerGameButtons = (props) => {
  const dispatch = useDispatch();
  const isHalfTime = useSelector((state: RootState) => state.game.isHalfTime);
  const activeGame = useSelector((state: RootState) => state.game.activeGame);
  const isSecondHalf = useSelector(
    (state: RootState) => state.game.isSecondHalf
  );
  const isStreaming = useSelector(
    (state: RootState) => state.streaming.isStreaming
  );
  const gameId = useSelector((state: RootState) => state.game.gameId);

  const navigate = useNavigate();

  const start = async () => {
    if (!activeGame) {
      //activegame already
      await startGame({ period: 'first' });
    } else if (isHalfTime) {
      startGame({ period: 'second', isStreaming });
      dispatch(gameActions.setHalfTime(false));
      dispatch(gameActions.setSecondHalf(true));
    }
  };

  const half = () => {
    if (!isHalfTime && !isSecondHalf) {
      halfTime();
      dispatch(gameActions.setHalfTime(true));
    }
  };

  const end = () => {
    endGame();
    if (!isStreaming) {
      // TODO: go to dashabord
      dispatch(gameActions.reset());
      dispatch(teamActions.resetNames());
      dispatch(pointAwayActions.reset());
      dispatch(pointHomeActions.reset());
      navigate("/dashboard", { replace: true });

    } else {
      dispatch(gameActions.setGameEnded(true));
      dispatch(gameActions.setHalfTime(false));
      dispatch(gameActions.setActiveGame(false));
      dispatch(gameActions.setGameId(''));
      dispatch(gameActions.setCurrentMinute(0));
    }
  };

  useEffect(() => {
    if (gameId) {
      //gameId changes and is not blank
      //TODO: activeGame redux dispatch
      dispatch(gameActions.setActiveGame(true));
      if (isStreaming) {
       (async () => { await generateScoreCardTimer();
        sleep(43);
        await writeTimer({
          gameSequence: 'First Half',
          minute: 0,
          startTimePrint: '00:00',
          noTime: false
        }); })();
      }
    }
  }, [gameId]);

  return (
    <div
      className="soccer-game-btns"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div onClick={start} className="soccer-game-btn soccer-game-btn-start">
          <p>START GAME</p>
        </div>
        <div onClick={half} className="soccer-game-btn soccer-game-btn-half">
          <p>HALF TIME</p>
        </div>
        <div onClick={end} className="soccer-game-btn soccer-game-btn-end">
          <p>END GAME</p>
        </div>
      </div>

      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row' }}>
        <div
          onClick={start}
          style={{
            width: 'fit-content',
            padding: '10px',
            backgroundColor: 'pink',
          }}
          className="soccer-game-btn soccer-game-btn-start"
        >
          <p>Q1</p>
        </div>
        <div
          onClick={start}
          style={{
            width: 'fit-content',
            padding: '10px',
            backgroundColor: 'pink',
          }}
          className="soccer-game-btn soccer-game-btn-start"
        >
          <p>Q2</p>
        </div>
        <div
          onClick={start}
          style={{
            width: 'fit-content',
            padding: '10px',
            backgroundColor: 'pink',
          }}
          className="soccer-game-btn soccer-game-btn-start"
        >
          <p>Q3</p>
        </div>
        <div
          onClick={start}
          style={{
            width: 'fit-content',
            padding: '10px',
            backgroundColor: 'pink',
          }}
          className="soccer-game-btn soccer-game-btn-start"
        >
          <p>Q4</p>
        </div>
      </div>
    </div>
  );
};

export default SoccerGameButtons;
