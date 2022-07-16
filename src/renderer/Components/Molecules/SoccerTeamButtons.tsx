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
import * as homeGoalActions from 'renderer/Slice/goalHomeSlice';
import * as awayGoalActions from 'renderer/Slice/goalAwaySlice';

const SoccerTeamButtons = ({ isHomeTeam, homeTeam, awayTeam }) => {
  const homeTeamScore = useSelector((state: RootState) => state.goalHome.value);
  const awayTeamScore = useSelector((state: RootState) => state.goalAway.value);
  const time = useSelector((state:RootState)=>state.game.currentMinute);

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

      if(homeScore >=5){
          dispatch(homeGoalActions.reset());
      }

      await showGoal({
        homeTeam,
        awayTeam,
        homeTeamScore: isHomeTeam ? homeScore : homeTeamScore,
        awayTeamScore: isHomeTeam ? awayTeamScore : awayScore,
        time,
        eventTeam: isHomeTeam ? homeTeam : awayTeam,
      });
    }
    setGoalPlayer('');
    setAssistPlayer('');
  };

  const shot = async (e) => {
    e.preventDefault();
    if (shotPlayer) {
      await showShot({
        player: shotPlayer,
        onTarget,
        time,
        eventTeam: isHomeTeam ? homeTeam : awayTeam,
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
        time,
        eventTeam: isHomeTeam ? homeTeam : awayTeam,
      });
    }
    setFoulPlayer('');
    setFoulReason('');
  };

  const offside = async (e) => {
    e.preventDefault();
    await showOffside({
      time,
      eventTeam: isHomeTeam ? homeTeam : awayTeam,
    });
    // obs.call('GetInputPropertiesListPropertyItems',{inputName:'audio',propertyName:'device_id'}).then((e)=>console.log(e));
    // obs.call('GetInputPropertiesListPropertyItems',{inputName:'audio',propertyName:'device_id'}).then((e)=>console.log(e));
    // obs.call('GetInputList').then((e)=>console.log(e));
  };

  const yellowcard = async (e) => {
    e.preventDefault();
    if (yellowPlayer) {
      await showYellowCard({
        player: yellowPlayer,
        time,
        eventTeam: isHomeTeam ? homeTeam : awayTeam,
      });
    }
    setYellowPlayer('');
  };

  const redcard = async (e) => {
    e.preventDefault();
    if (redPlayer) {
      await showRedCard({
        player: redPlayer,
        time,
        eventTeam: isHomeTeam ? homeTeam : awayTeam,
      });
    }
    setRedPlayer('');
  };

  const penalty = async (e) => {
    e.preventDefault();
    await showPenalty({
      time,
      eventTeam: isHomeTeam ? homeTeam : awayTeam,
    });
  };

  return (
    <div className="soccer-team-btns">
      <div
        className=" goal-counter-wrapper"
        style={{ flexDirection: isHomeTeam ? 'row' : 'row-reverse' }}
      >
        <div className="goal-scorer-input-wrapper">
          <input
            className="player-input"
            placeholder="*Goal from"
            value={goalPlayer}
            onChange={(e) => setGoalPlayer(e.target.value)}
          />
          <input
            className="player-input"
            placeholder="Assist from"
            value={assistPlayer}
            onChange={(e) => setAssistPlayer(e.target.value)}
          />
        </div>
        <div className="counter">
          <div onClick={goal} className="counter-btn">
            <div id="plusbg" />
            <div id="plus" />
          </div>
          <p>{isHomeTeam ? homeTeamScore : awayTeamScore}</p>
          <div onClick={goal} className="counter-btn">
            <div id="minusbg" />
            <div id="minus" />
          </div>
        </div>
      </div>

      <div className="soccer-btn-card shot-wrapper">
        <p>SHOT</p>
        <div className="shot-input-wrapper">
          <label className="on-target-cb-label">
            <input
              checked={onTarget}
              onChange={() => setShotOnTarget((prev) => !prev)}
              className="on-target-cb"
              type="checkbox"
              placeholder="On Target?"
            />
            <p style={{ fontWeight: 'normal' }}>On Target?</p>
          </label>
          <div className="shot-btn-wrapper">
            <div onClick={shot} className="counter-btn">
              <div id="plusbg" />
              <div id="plus" />
            </div>
            <input
              className="player-input"
              placeholder="*Player"
              value={shotPlayer}
              onChange={(e) => setShotPlayer(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="soccer-btn-card substitution-wrapper">
        <p>SUBSTITUTION</p>
        <div className="substitution-btn-wrapper">
          <div onClick={subs} className="substitution-btn">
            🔄
          </div>
          <div className="substitution-input-wrapper">
            <input
              className="player-input"
              placeholder="*Player ON"
              value={playerOn}
              onChange={(e) => setPlayerOn(e.target.value)}
            />
            <input
              className="player-input"
              placeholder="*Player OFF"
              value={playerOff}
              onChange={(e) => setPlayerOff(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="soccer-btn-card foul-wrapper">
        <p>FOUL</p>
        <div className="foul-btn-wrapper">
          <div onClick={foul} className="foul-btn">
            🆇
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
              placeholder="Reason"
              value={foulReason}
              onChange={(e) => setFoulReason(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div onClick={offside} className="soccer-btn-card team-btn offside-btn">
        <p>OFFSIDE</p>
      </div>
      <div className="soccer-btn-card yellow-card-wrapper">
        <p>YELLOW CARD</p>
        {/* <p>*Player</p> */}
        <div className="yellow-card-btn-wrapper">
          <div onClick={yellowcard} className="yellow-card-btn" />
          <input
            className="player-input"
            placeholder="*Player"
            value={yellowPlayer}
            onChange={(e) => setYellowPlayer(e.target.value)}
          />
        </div>
      </div>
      <div className="soccer-btn-card red-card-wrapper">
        <p>RED CARD</p>
        <div className="red-card-btn-wrapper">
          <div onClick={redcard} className="red-card-btn" />
          <input
            className="player-input"
            placeholder="*Player"
            value={redPlayer}
            onChange={(e) => setRedPlayer(e.target.value)}
          />
        </div>
      </div>
      <div onClick={penalty} className="soccer-btn-card team-btn penalty-btn">
        <p>PENALTY</p>
      </div>
    </div>
  );
};

export default SoccerTeamButtons;
