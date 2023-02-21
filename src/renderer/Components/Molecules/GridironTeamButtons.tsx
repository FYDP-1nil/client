import '../../Styles/Molecules/SoccerTeamButtons.css';
import { useEffect, useState } from 'react';
import {
  showFoul,
  showGoal,
  showOffside,
  showPenalty,
  showRedCard,
  showShot,
  showSubs,
  showYellowCard,
} from 'renderer/Functions/Computation/Soccer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'renderer/store';
import * as homeGoalActions from 'renderer/Slice/pointHomeSlice';
import * as awayGoalActions from 'renderer/Slice/pointAwaySlice';

const GridironTeamButtons = ({ isHomeTeam }) => {
  const homeTeam = useSelector((state: RootState) => state.teams.homeTeamName);
  const awayTeam = useSelector((state: RootState) => state.teams.awayTeamName);
  const homeTeamScore = useSelector(
    (state: RootState) => state.pointHome.value
  );
  const awayTeamScore = useSelector(
    (state: RootState) => state.pointAway.value
  );
  const time = useSelector((state: RootState) => state.game.currentMinute);
  const activeGame = useSelector((state: RootState) => state.game.activeGame);

  const dispatch = useDispatch();

  const [goalPlayer, setGoalPlayer] = useState('');
  const [assistPlayer, setAssistPlayer] = useState('');
  const [shotPlayer, setShotPlayer] = useState('');
  const [onTarget, setShotOnTarget] = useState(false);
  const [playerOn, setPlayerOn] = useState('');
  const [playerOff, setPlayerOff] = useState('');
  const [foulPlayer, setFoulPlayer] = useState('');
  const [foulReason, setFoulReason] = useState('');
  const [yellowPlayer, setYellowPlayer] = useState('');
  const [redPlayer, setRedPlayer] = useState('');

  const goal = async (e) => {
    e.preventDefault();
    if (goalPlayer) {
      let homeScore = homeTeamScore + 1;
      let awayScore = awayTeamScore + 1;

      dispatch(
        isHomeTeam ? homeGoalActions.increment() : awayGoalActions.increment()
      );

      await showGoal({
        homeTeam,
        awayTeam,
        homeTeamScore: isHomeTeam ? homeScore : homeTeamScore,
        awayTeamScore: isHomeTeam ? awayTeamScore : awayScore,
        time,
        teamFor: isHomeTeam ? homeTeam : awayTeam,
        teamAgainst: isHomeTeam ? awayTeam : homeTeam,
        scorer: goalPlayer,
        assist: assistPlayer,
        celebrate: true,
      });
    }
    setGoalPlayer('');
    setAssistPlayer('');
  };

  const deleteGoal = async (e) => {
    e.preventDefault();

    if ((isHomeTeam && homeTeamScore) || (!isHomeTeam && awayTeamScore)) {
      dispatch(
        isHomeTeam ? homeGoalActions.decrement() : awayGoalActions.decrement()
      );

      await showGoal({
        homeTeam,
        awayTeam,
        homeTeamScore: isHomeTeam ? homeTeamScore - 1 : homeTeamScore,
        awayTeamScore: isHomeTeam ? awayTeamScore : awayTeamScore - 1,
        time,
        teamFor: isHomeTeam ? homeTeam : awayTeam,
        teamAgainst: isHomeTeam ? awayTeam : homeTeam,
        scorer: goalPlayer,
        assist: assistPlayer,
        celebrate: false,
      });
    }
    setGoalPlayer('');
    setAssistPlayer('');
  };

  const shot = async (e) => {
    e.preventDefault();
    if (shotPlayer) {
      await showShot({
        scorer: shotPlayer,
        onTarget,
        teamFor: isHomeTeam ? homeTeam : awayTeam,
        teamAgainst: isHomeTeam ? awayTeam : homeTeam,
      });
    }
    setShotPlayer('');
  };

  const subs = async (e) => {
    e.preventDefault();
    if (playerOn && playerOff) {
      await showSubs({
        playerOn,
        playerOff,
        time,
        eventTeam: isHomeTeam ? homeTeam : awayTeam,
      });
    }
    setPlayerOff('');
    setPlayerOn('');
  };

  const foul = async (e) => {
    e.preventDefault();
    if (foulPlayer) {
      await showFoul({
        player: foulPlayer,
        reason: foulReason,
        teamFor: isHomeTeam ? homeTeam : awayTeam,
        teamAgainst: isHomeTeam ? awayTeam : homeTeam,
      });
    }
    setFoulPlayer('');
    setFoulReason('');
  };

  const offside = async (e) => {
    e.preventDefault();
    await showOffside({
      teamFor: isHomeTeam ? homeTeam : awayTeam,
      teamAgainst: isHomeTeam ? awayTeam : homeTeam,
    });
  };

  const yellowcard = async (e) => {
    e.preventDefault();
    if (yellowPlayer) {
      await showYellowCard({
        player: yellowPlayer,
        teamFor: isHomeTeam ? homeTeam : awayTeam,
        teamAgainst: isHomeTeam ? awayTeam : homeTeam,
      });
    }
    setYellowPlayer('');
  };

  const redcard = async (e) => {
    e.preventDefault();
    if (redPlayer) {
      await showRedCard({
        player: redPlayer,
        teamFor: isHomeTeam ? homeTeam : awayTeam,
        teamAgainst: isHomeTeam ? awayTeam : homeTeam,
      });
    }
    setRedPlayer('');
  };

  const penalty = async (e) => {
    e.preventDefault();
    await showPenalty({
      teamFor: isHomeTeam ? homeTeam : awayTeam,
      teamAgainst: isHomeTeam ? awayTeam : homeTeam,
    });
  };

  return (
    <div
      style={{ opacity: activeGame ? '1' : '0.5' }}
      className="soccer-team-btns"
    >
      <div className="soccer-btn-card shot-wrapper">
        <p>THROW</p>
        <div
          onChange={() => null}
          style={{
            fontWeight: 'normal',
            margin: '5px 0px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <div>
            <input
              style={{ margin: '0px 5px' }}
              type="radio"
              value={3}
              name="kick"
            />
            2pt
          </div>
          <div>
            <input
              style={{ margin: '0px 5px' }}
              type="radio"
              value={1}
              name="kick"
            />
            6pt
          </div>
          <div>
            <input
              style={{ margin: '0px 5px' }}
              type="radio"
              value={0}
              name="kick"
            />
            Down
          </div>
          <div>
            <input
              style={{ margin: '0px 5px' }}
              type="radio"
              value={-1}
              name="kick"
            />
            Miss
          </div>
        </div>
        <div className="substitution-btn-wrapper">
          <div onClick={!activeGame ? undefined : shot} className="counter-btn">
            <div id="plusbg" style={{ marginLeft: '6px' }} />
            <div id="plus" style={{ marginLeft: '6px' }} />
          </div>
          <div
            style={{ marginLeft: '-10px', height: 'auto' }}
            className="substitution-input-wrapper"
          >
            <input
              className="player-input"
              placeholder="*Player Thrower"
              style={{ margin: '3px 0px' }}
              value={playerOn}
              onChange={(e) => setPlayerOn(e.target.value)}
            />
            <input
              className="player-input"
              placeholder="*Player Receiver"
              style={{ margin: '3px 0px' }}
              value={playerOn}
              onChange={(e) => setPlayerOn(e.target.value)}
            />
            <input
              className="player-input"
              placeholder="*Yds"
              style={{ margin: '3px 0px' }}
              value={playerOff}
              onChange={(e) => setPlayerOff(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="soccer-btn-card substitution-wrapper">
        <p>RUSH</p>
        <div
          onChange={() => null}
          style={{
            fontWeight: 'normal',
            margin: '5px 0px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <div>
            <input
              style={{ margin: '0px 5px' }}
              type="radio"
              value={3}
              name="kick"
            />
            2pt
          </div>
          <div>
            <input
              style={{ margin: '0px 5px' }}
              type="radio"
              value={1}
              name="kick"
            />
            6pt
          </div>
          <div>
            <input
              style={{ margin: '0px 5px' }}
              type="radio"
              value={0}
              name="kick"
            />
            Down
          </div>
        </div>
        <div className="substitution-btn-wrapper">
          <div onClick={!activeGame ? undefined : shot} className="counter-btn">
            <div id="plusbg" style={{ marginLeft: '6px' }} />
            <div id="plus" style={{ marginLeft: '6px' }} />
          </div>
          <div
            style={{ marginLeft: '-10px' }}
            className="substitution-input-wrapper"
          >
            <input
              className="player-input"
              placeholder="*Player"
              value={playerOn}
              onChange={(e) => setPlayerOn(e.target.value)}
            />
            <input
              className="player-input"
              placeholder="*Yds"
              value={playerOff}
              onChange={(e) => setPlayerOff(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="soccer-btn-card foul-wrapper">
        <p>KICK</p>
        <div
          onChange={() => null}
          style={{
            fontWeight: 'normal',
            margin: '5px 0px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <div>
            <input
              style={{ margin: '0px 5px' }}
              type="radio"
              value={3}
              name="kick"
            />
            1pt
          </div>
          <div>
            <input
              style={{ margin: '0px 5px' }}
              type="radio"
              value={1}
              name="kick"
            />
            3pt
          </div>
          <div>
            <input
              style={{ margin: '0px 5px' }}
              type="radio"
              value={-1}
              name="kick"
            />
            Miss
          </div>
        </div>
        <div className="foul-btn-wrapper">
          <div onClick={!activeGame ? undefined : foul} className="foul-btn">
            👟
          </div>
          <div className="foul-input-wrapper">
            <input
              className="player-input"
              placeholder="*Player"
              value={foulPlayer}
              onChange={(e) => setFoulPlayer(e.target.value)}
            />
            <input
              className="player-input"
              placeholder="*Yds"
              value={foulReason}
              onChange={(e) => setFoulReason(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div
        onClick={!activeGame ? undefined : offside}
        className="soccer-btn-card team-btn offside-btn"
      >
        <p>SAFETY</p>
      </div>
      <div
        onClick={!activeGame ? undefined : penalty}
        className="soccer-btn-card team-btn red-card-wrapper"
      >
        <p>FLAG</p>
      </div>
      <div
        onClick={!activeGame ? undefined : penalty}
        className="soccer-btn-card team-btn yellow-card-wrapper"
      >
        <p>TIMEOUT</p>
      </div>
      <div
        onClick={!activeGame ? undefined : penalty}
        className="soccer-btn-card team-btn penalty-btn"
      >
        <p>TURNOVER</p>
      </div>
      <div className="soccer-btn-card shot-wrapper">
        <p>FIX SCORE</p>
        <div className="shot-input-wrapper" style={{ height: 'auto' }}>
          <label className="on-target-cb-label" style={{ marginTop: '10px' }}>
            <input
              checked={onTarget}
              onChange={() => setShotOnTarget((prev) => !prev)}
              className="on-target-cb"
              type="checkbox"
              placeholder="On Target?"
            />
            <p style={{ fontWeight: 'normal' }}>Confirm?</p>
          </label>
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'row',
              marginBottom: '10px',
              justifyContent:"space-around"
            }}
          >
            <div
              onClick={() => null}
              style={{
                width: 'fit-content',
                padding: '10px',
                backgroundColor: 'pink',
              }}
              className="soccer-game-btn soccer-game-btn-start"
            >
              <p>-1</p>
            </div>
            <div
              onClick={() => null}
              style={{
                width: 'fit-content',
                padding: '10px',
                backgroundColor: 'pink',
              }}
              className="soccer-game-btn soccer-game-btn-start"
            >
              <p>-2</p>
            </div>
            <div
              onClick={() => null}
              style={{
                width: 'fit-content',
                padding: '10px',
                backgroundColor: 'pink',
              }}
              className="soccer-game-btn soccer-game-btn-start"
            >
              <p>-3</p>
            </div>
            <div
              onClick={() => null}
              style={{
                width: 'fit-content',
                padding: '10px',
                backgroundColor: 'pink',
              }}
              className="soccer-game-btn soccer-game-btn-start"
            >
              <p>-6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridironTeamButtons;
