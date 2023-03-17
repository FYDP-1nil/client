import '../../Styles/Molecules/SoccerTeamButtons.css';
import { useEffect, useState } from 'react';
import {
  showFixedScore,
  showFlag,
  showKick,
  showQtr,
  showRush,
  showThrow,
  showSafety,
  showTimeout,
  showTurnover,
} from 'renderer/Functions/Computation/Gridiron';
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
  const period = useSelector((state: RootState) => state.game.currentQuarter);
  const time = useSelector((state: RootState) => state.game.currentMinute);
  const activeGame = useSelector((state: RootState) => state.game.activeGame);

  const dispatch = useDispatch();

  const [throwPoint, setThrowPoint] = useState<any>(0);
  const [rushPoint, setRushPoint] = useState<any>(0);
  const [kickPoint, setKickPoint] = useState<any>(0);
  const [confirm, setConfirm] = useState(false);
  const [throwPlayer, setThrowPlayer] = useState('');
  const [throwReceiver, setThrowReceiver] = useState('');
  const [throwYds, setThrowYds] = useState('');
  const [rushPlayer, setRushPlayer] = useState('');
  const [rushYds, setRushYds] = useState('');
  const [kickPlayer, setKickPlayer] = useState('');
  const [kickYds, setKickYds] = useState('');

  function onChangeThrow(event) {
    setThrowPoint(event.target.value);
  }

  function onChangeRush(event) {
    setRushPoint(event.target.value);
  }

  function onChangeKick(event) {
    setKickPoint(event.target.value);
  }

  const throws = async (e) => {
    e.preventDefault();
    if (throwPlayer && throwReceiver && throwYds) {
      if (isHomeTeam) {
        switch (throwPoint) {
          case "2":
            // code block
            dispatch(homeGoalActions.plus2());
            break;
          case "6":
            // code block
            dispatch(homeGoalActions.plus6());
            break;
          case "0":
            // code block
            break;
          case "-1":
            // code block
            break;
          default:
            break;
        }
        await showThrow({
          team_for: homeTeam,
          team_against: awayTeam,
          player_throwing: throwPlayer,
          player_receiving: throwReceiver,
          yard: parseInt(throwYds),
          period: period.toString(),
          result:
            throwPoint == 2
              ? '2pt'
              : throwPoint == 6
              ? 'touchdown'
              : throwPoint == 0
              ? 'non-scoring'
              : 'miss',
        });
      } else {
        switch (throwPoint) {
          case "2":
            // code block
            dispatch(awayGoalActions.plus2());
            break;
          case "6":
            // code block
            dispatch(awayGoalActions.plus6());
            break;
          case "0":
            // code block
            break;
          case "-1":
            // code block
            break;
          default:
            break;
        }
        await showThrow({
          team_for: awayTeam,
          team_against: homeTeam,
          player_throwing: throwPlayer,
          player_receiving: throwReceiver,
          yard: parseInt(throwYds),
          period: period.toString(),
          result:
            throwPoint == 2
              ? '2pt'
              : throwPoint == 6
              ? 'touchdown'
              : throwPoint == 0
              ? 'non-scoring'
              : 'miss',
        });
      }
      //   console.log(parseInt(throwYds));
    }
    setThrowPlayer('');
    setThrowReceiver('');
    setThrowYds('');
  };

  const rush = async (e) => {
    e.preventDefault();
    if (rushPlayer && rushYds) {
      if (isHomeTeam) {
        switch (rushPoint) {
          case "2":
            // code block
            dispatch(homeGoalActions.plus2());
            break;
          case "6":
            // code block
            dispatch(homeGoalActions.plus6());
            break;
          case "0":
            // code block
            break;
          default:
            break;
        }
        await showRush({
          team_for: homeTeam,
          team_against: awayTeam,
          player: rushPlayer,
          yard: parseInt(rushYds),
          period: period.toString(),
          result:
            rushPoint == 2
              ? '2pt'
              : rushPoint == 6
              ? 'touchdown'
              : 'non-scoring',
        });
      } else {
        switch (rushPoint) {
          case "2":
            // code block
            dispatch(awayGoalActions.plus2());
            break;
          case "6":
            // code block
            dispatch(awayGoalActions.plus6());
            break;
          case "0":
            // code block
            break;
          default:
            break;
        }
        await showRush({
          team_for: awayTeam,
          team_against: homeTeam,
          player: rushPlayer,
          yard: parseInt(rushYds),
          period: period.toString(),
          result:
            rushPoint == 2
              ? '2pt'
              : rushPoint == 6
              ? 'touchdown'
              : 'non-scoring',
        });
      }
    }
    setRushPlayer('');
    setRushYds('');
  };

  const kick = async (e) => {
    e.preventDefault();
    if (kickPlayer && kickYds) {
      console.log(kickPlayer,kickPoint);
      if (isHomeTeam) {
        switch (kickPoint) {
          case "1":
            // code block
            dispatch(homeGoalActions.increment());
            break;
          case "3":
            // code block
            dispatch(homeGoalActions.plus3());
            break;
          case "0":
            // code block
            break;
          default:
            break;
        }
        await showKick({
          team_for: homeTeam,
          team_against: awayTeam,
          player: kickPlayer,
          yard: parseInt(kickYds),
          period: period.toString(),
          point: kickPoint,
          result:
            kickPoint == 1
              ? 'extra-kick'
              : kickPoint == 3
              ? 'field-goal'
              : 'miss',
        });
      } else {
        switch (kickPoint) {
          case "1":
            // code block
            dispatch(awayGoalActions.increment());
            break;
          case "3":
            // code block
            dispatch(awayGoalActions.plus3());
            break;
          case "0":
            // code block
            break;
          default:
            break;
        }
        await showKick({
          team_for: awayTeam,
          team_against: homeTeam,
          player: kickPlayer,
          yard: parseInt(kickYds),
          period: period.toString(),
          point: kickPoint,
          result:
            kickPoint == 1
              ? 'extra-kick'
              : kickPoint == 3
              ? 'field-goal'
              : 'miss',
        });
      }
    }
    setKickPlayer('');
    setKickYds('');
  };

  const safety = async (e) => {
    e.preventDefault();
    dispatch(isHomeTeam? homeGoalActions.plus2() : awayGoalActions.plus2());
    await showSafety({
      team_for: isHomeTeam ? homeTeam : awayTeam,
      team_against: isHomeTeam ? awayTeam : homeTeam,
      period: period.toString(),
    });
  };

  const flag = async (e) => {
    e.preventDefault(e);
    await showFlag({
      team_for: isHomeTeam ? homeTeam : awayTeam,
      team_against: isHomeTeam ? awayTeam : homeTeam,
      period: period.toString(),
    });
  };

  const timeout = async (e) => {
    e.preventDefault();
    await showTimeout({
      team_for: isHomeTeam ? homeTeam : awayTeam,
      team_against: isHomeTeam ? awayTeam : homeTeam,
      period: period.toString(),
    });
  };

  const turnover = async (e) => {
    e.preventDefault();
    await showTurnover({
      team_for: isHomeTeam ? homeTeam : awayTeam,
      team_against: isHomeTeam ? awayTeam : homeTeam,
      period: period.toString(),
    });
  };

  const fixScore = async (e, number) => {
    e.preventDefault();
    if (!confirm) {
      return;
    }
    if (isHomeTeam) {
      if (homeTeamScore + number >= 0) {
        await showFixedScore({
          homeTeam,
          awayTeam,
          homeTeamScore: homeTeamScore + number,
          awayTeamScore: awayTeamScore,
        });
        switch (number) {
          case -1:
            // code block
            dispatch(homeGoalActions.decrement());
            break;
          case -2:
            // code block
            dispatch(homeGoalActions.minus2());
            break;
          case -3:
            // code block
            dispatch(homeGoalActions.minus3());
            break;
          case -6:
            dispatch(homeGoalActions.minus6());
            break;
          default:
            break;
        }
      }
    } else {
      if (awayTeamScore + number >= 0) {
        await showFixedScore({
          homeTeam,
          awayTeam,
          homeTeamScore: homeTeamScore,
          awayTeamScore: awayTeamScore + number,
        });
        switch (number) {
          case -1:
            // code block
            dispatch(awayGoalActions.decrement());
            break;
          case -2:
            // code block
            dispatch(awayGoalActions.minus2());
            break;
          case -3:
            // code block
            dispatch(awayGoalActions.minus3());
            break;
          case -6:
            dispatch(awayGoalActions.minus6());
            break;
          default:
            break;
        }
      }
    }
  };

  return (
    <div
      style={{ opacity: activeGame ? '1' : '0.5' }}
      className="soccer-team-btns"
    >
      <div className="soccer-btn-card shot-wrapper">
        <p>THROW</p>
        <div
          onChange={onChangeThrow}
          style={{
            fontWeight: 'normal',
            margin: '5px 0px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <input
            style={{ margin: '0px 5px' }}
            type="radio"
            value={2}
            name="throw"
          />
          2pt
          <input
            style={{ margin: '0px 5px' }}
            type="radio"
            value={6}
            name="throw"
          />
          6pt
          <input
            style={{ margin: '0px 5px' }}
            type="radio"
            value={0}
            name="throw"
          />
          Down
          <input
            style={{ margin: '0px 5px' }}
            type="radio"
            value={-1}
            name="throw"
          />
          Miss
        </div>
        <div className="substitution-btn-wrapper">
          <div
            onClick={!activeGame ? undefined : throws}
            className="counter-btn"
          >
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
              value={throwPlayer}
              onChange={(e) => setThrowPlayer(e.target.value)}
            />
            <input
              className="player-input"
              placeholder="*Player Receiver"
              style={{ margin: '3px 0px' }}
              value={throwReceiver}
              onChange={(e) => setThrowReceiver(e.target.value)}
            />
            <input
              className="player-input"
              placeholder="*Yds"
              style={{ margin: '3px 0px' }}
              value={throwYds}
              type="number"
              onChange={(e) => setThrowYds(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="soccer-btn-card substitution-wrapper">
        <p>RUSH</p>
        <div
          onChange={onChangeRush}
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
              value={2}
              name="rush"
            />
            2pt
          </div>
          <div>
            <input
              style={{ margin: '0px 5px' }}
              type="radio"
              value={6}
              name="rush"
            />
            6pt
          </div>
          <div>
            <input
              style={{ margin: '0px 5px' }}
              type="radio"
              value={0}
              name="rush"
            />
            Down
          </div>
        </div>
        <div className="substitution-btn-wrapper">
          <div onClick={!activeGame ? undefined : rush} className="counter-btn">
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
              value={rushPlayer}
              onChange={(e) => setRushPlayer(e.target.value)}
            />
            <input
              className="player-input"
              placeholder="*Yds"
              value={rushYds}
              type="number"
              onChange={(e) => setRushYds(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="soccer-btn-card foul-wrapper">
        <p>KICK</p>
        <div
          onChange={onChangeKick}
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
              value={1}
              name="kick"
            />
            1pt
          </div>
          <div>
            <input
              style={{ margin: '0px 5px' }}
              type="radio"
              value={3}
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
          <div onClick={!activeGame ? undefined : kick} className="foul-btn">
            👟
          </div>
          <div className="foul-input-wrapper">
            <input
              className="player-input"
              placeholder="*Player"
              value={kickPlayer}
              onChange={(e) => setKickPlayer(e.target.value)}
            />
            <input
              type="number"
              className="player-input"
              placeholder="*Yds"
              value={kickYds}
              onChange={(e) => setKickYds(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div
        onClick={!activeGame ? undefined : safety}
        className="soccer-btn-card team-btn offside-btn"
      >
        <p>SAFETY</p>
      </div>
      <div
        onClick={!activeGame ? undefined : flag}
        className="soccer-btn-card team-btn red-card-wrapper"
      >
        <p>FLAG</p>
      </div>
      <div
        onClick={!activeGame ? undefined : timeout}
        className="soccer-btn-card team-btn yellow-card-wrapper"
      >
        <p>TIMEOUT</p>
      </div>
      <div
        onClick={!activeGame ? undefined : turnover}
        className="soccer-btn-card team-btn penalty-btn"
      >
        <p>TURNOVER</p>
      </div>
      <div className="soccer-btn-card shot-wrapper">
        <p>FIX SCORE</p>
        <div className="shot-input-wrapper" style={{ height: 'auto' }}>
          <label className="on-target-cb-label" style={{ marginTop: '10px' }}>
            <input
              checked={confirm}
              onChange={() => setConfirm((prev) => !prev)}
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
              justifyContent: 'space-around',
            }}
          >
            <div
              onClick={(e) => fixScore(e, -1)}
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
              onClick={(e) => fixScore(e, -2)}
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
              onClick={(e) => fixScore(e, -3)}
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
              onClick={(e) => fixScore(e, -6)}
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
