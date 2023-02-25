import '../../Styles/Molecules/SoccerTeamButtons.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'renderer/store';
import * as homeGoalActions from 'renderer/Slice/pointHomeSlice';
import * as awayGoalActions from 'renderer/Slice/pointAwaySlice';
import { show1pt, show2PT, show3PT, showBlock, showFixedScore, showFoul, showMiss, showRebound, showSteal, showTimeout, showTurnover } from 'renderer/Functions/Computation/Basketball';

const BasketballTeamButtons = ({ isHomeTeam }) => {
  const homeTeam = useSelector((state: RootState) => state.teams.homeTeamName);
  const awayTeam = useSelector((state: RootState) => state.teams.awayTeamName);
  const homeTeamScore = useSelector(
    (state: RootState) => state.pointHome.value
  );
  const awayTeamScore = useSelector(
    (state: RootState) => state.pointAway.value
  );
  const period = useSelector((state: RootState) => state.game.currentQuarter);
  const activeGame = useSelector((state: RootState) => state.game.activeGame);

  const dispatch = useDispatch();

  const [player, setPlayer] = useState('');
  const [assistPlayer, setAssistPlayer] = useState('');
  const [foulPlayer, setFoulPlayer] = useState('');
  const [foulReason, setFoulReason] = useState('');
  const [reboundPlayer, setReboundPlayer] = useState('');
  const [blockPlayer, setBlockPlayer] = useState('');
  const [stealPlayer, setStealPlayer] = useState('');
  const [turnoverPlayer, setTurnoverPlayer] = useState('');
  const [point, setPoint] = useState<any>(0);
  const [miss, setMiss] = useState(false);

  const deletePt = async (e) => {
    e.preventDefault();
    if (isHomeTeam) {
      if (homeTeamScore - parseInt(point) >= 0) {
        await showFixedScore({
          homeTeam,
          awayTeam,
          homeTeamScore: homeTeamScore - parseInt(point),
          awayTeamScore: awayTeamScore,
        });
        switch (point) {
          case "1":
            // code block
            dispatch(homeGoalActions.decrement());
            break;
          case "2":
            // code block
            dispatch(homeGoalActions.minus2());
            break;
          case "3":
            // code block
            dispatch(homeGoalActions.minus3());
            break;
          default:
            break;
        }
      }
    } else {
      if (awayTeamScore - parseInt(point) >= 0) {
        await showFixedScore({
          homeTeam,
          awayTeam,
          homeTeamScore: homeTeamScore,
          awayTeamScore: awayTeamScore - parseInt(point),
        });
        switch (point) {
          case "1":
            // code block
            dispatch(awayGoalActions.decrement());
            break;
          case "2":
            // code block
            dispatch(awayGoalActions.minus2());
            break;
          case "3":
            // code block
            dispatch(awayGoalActions.minus3());
            break;
          default:
            break;
        }
      }
    }
    setPlayer('');
    setAssistPlayer('');
  };

  const shot = async (e) => {
    e.preventDefault();
    if (player) {
      if (isHomeTeam) {
        switch (point) {
          case "1":
            // code block
            if(miss){
              await showMiss({
                team_for: homeTeam,
                team_against: awayTeam,
                player,
                assist: assistPlayer,
                period,
                point: parseInt(point),
                result: 'miss',
              });
            }
            else {
              dispatch(homeGoalActions.increment());
              await show1pt({
                team_for: homeTeam,
                team_against: awayTeam,
                player,
                assist: assistPlayer,
                period,
                point: parseInt(point),
                result: 'made',
              });
            }
            break;
          case "2":
            // code block
            if(miss){
              await showMiss({
                team_for: homeTeam,
                team_against: awayTeam,
                player,
                assist: assistPlayer,
                period,
                point: parseInt(point),
                result: 'miss',
              });
            }
            else {
              dispatch(homeGoalActions.plus2());
              await show2PT({
                team_for: homeTeam,
                team_against: awayTeam,
                player,
                assist: assistPlayer,
                period,
                point: parseInt(point),
                result: 'made',
              });
            }
            break;
          case "3":
            // code block
            if(miss){
              await showMiss({
                team_for: homeTeam,
                team_against: awayTeam,
                player,
                assist: assistPlayer,
                period,
                point: parseInt(point),
                result: 'miss',
              });
            }
            else { 
              dispatch(homeGoalActions.plus3());
              await show3PT({
                team_for: homeTeam,
                team_against: awayTeam,
                player,
                assist: assistPlayer,
                period,
                point: parseInt(point),
                result: 'made',
              });
            }
            break;
          default:
            break;
        }
      } else {
        switch (point) {
          case "1":
            // code block
            if(miss){
              await showMiss({
                team_for: awayTeam,
                team_against: homeTeam,
                player,
                assist: assistPlayer,
                period,
                point: parseInt(point),
                result: 'miss',
              });
            }
            else {
              dispatch(awayGoalActions.increment());
              await show1pt({
                team_for: awayTeam,
                team_against: homeTeam,
                player,
                assist: assistPlayer,
                period,
                point: parseInt(point),
                result: 'made',
              });
            }
            break;
          case "2":
            // code block
            if(miss){
              await showMiss({
                team_for: awayTeam,
                team_against: homeTeam,
                player,
                assist: assistPlayer,
                period,
                point: parseInt(point),
                result: 'miss',
              });
            }
            else {
              dispatch(awayGoalActions.plus2());
              await show2PT({
                team_for: awayTeam,
                team_against: homeTeam,
                player,
                assist: assistPlayer,
                period,
                point: parseInt(point),
                result: 'made',    
              });
            }
            break;
          case "3":
            // code block
            if(miss){
              await showMiss({
                team_for: awayTeam,
                team_against: homeTeam,
                player,
                assist: assistPlayer,
                period,
                point: parseInt(point),
                result: 'miss',
              });
            }
            else {
              dispatch(awayGoalActions.plus3());
              await show3PT({
                team_for: awayTeam,
                team_against: homeTeam,
                player,
                assist: assistPlayer,
                period,
                point: parseInt(point),
                result: 'made',    
              });
            }
            break;
          default:
            break;
        }
      }
    }
    setPlayer('');
    setAssistPlayer('');
  };


  const foul = async (e) => {
    e.preventDefault();
    if (foulPlayer) {
      await showFoul({
        team_for: isHomeTeam? homeTeam : awayTeam,
        team_against: isHomeTeam? awayTeam : homeTeam,
        player: foulPlayer,
        reason: foulReason,
        period,
      });
    }
    setFoulPlayer('');
    setFoulReason('');
  };

  const rebound = async (e) => {
    e.preventDefault();
    if(reboundPlayer){
      await showRebound({
        team_for: isHomeTeam? homeTeam : awayTeam,
        team_against: isHomeTeam? awayTeam : homeTeam,
        player: reboundPlayer,
        period,
      });
    }
    setReboundPlayer('');
  };

  const block = async (e) => {
    e.preventDefault();
    if(blockPlayer){
      await showBlock({
        team_for: isHomeTeam? homeTeam : awayTeam,
        team_against: isHomeTeam? awayTeam : homeTeam,
        player: blockPlayer,
        period,
      });
    }
    setBlockPlayer('');
  };

  const steal = async (e) => {
    e.preventDefault();
    if(stealPlayer){
      await showSteal({
        team_for: isHomeTeam? homeTeam : awayTeam,
        team_against: isHomeTeam? awayTeam : homeTeam,
        player: stealPlayer,
        period,
      });
    }
    setStealPlayer('');
  };

  const turnover = async (e) => {
    e.preventDefault();
    if(turnoverPlayer){
      await showTurnover({
        team_for: isHomeTeam? homeTeam : awayTeam,
        team_against: isHomeTeam? awayTeam : homeTeam,
        player: turnoverPlayer,
        period,
      });
    }
    setTurnoverPlayer('');
  };

  const timeout = async (e) => {
    e.preventDefault();
    await showTimeout();
  };

  function onChangeShot(event) {
    setPoint(event.target.value);
  }


  return (
    <div
      style={{ opacity: activeGame ? '1' : '0.5' }}
      className="soccer-team-btns"
    >
      <div
        className=" goal-counter-wrapper"
        style={{ flexDirection: isHomeTeam ? 'row' : 'row-reverse' }}
      >
        <div className="soccer-btn-card shot-wrapper">
          <p>SHOT</p>
          <div
            onChange={onChangeShot}
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
                name="shot"
              />
              1pt
            </div>
            <div>
              <input
                style={{ margin: '0px 5px' }}
                type="radio"
                value={2}
                name="shot"
              />
              2pt
            </div>
            <div>
              <input
                style={{ margin: '0px 5px' }}
                type="radio"
                value={3}
                name="shot"
              />
              3pt
            </div>
          </div>
          <label className="on-target-cb-label" style={{ marginTop: '10px' }}>
            <input
              checked={miss}
              onChange={() => setMiss((prev) => !prev)}
              className="on-target-cb"
              type="checkbox"
              placeholder="Missed Shot?"
            />
            <p style={{ fontWeight: 'normal' }}>Missed Shot?</p>
          </label>
          <div className="substitution-btn-wrapper" style={{justifyContent:"flex-end"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div
              onClick={!activeGame ? undefined : shot}
              className="counter-btn"
            >
              <div id="plusbg" style={{ marginLeft: '6px' }} />
              <div id="plus" style={{ marginLeft: '6px', marginRight:"10px" }} />
            </div>
            <div
            onClick={!activeGame ? undefined : deletePt}
            className="counter-btn"
            style={{marginRight:"8px"}}
          >
            <div id="minusbg" />
            <div id="minus" style={{marginRight:"10px"}} />
          </div>
          </div>
            <div
              style={{ marginLeft: '-10px', height: 'auto' }}
              className="substitution-input-wrapper"
            >
              <input
                className="player-input"
                placeholder="*Player"
                style={{ margin: '3px 0px' }}
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
              />
              <input
                className="player-input"
                placeholder="Assist"
                style={{ margin: '3px 0px' }}
                value={assistPlayer}
                onChange={(e) => setAssistPlayer(e.target.value)}
              />
            </div>
          </div>
        </div>{' '}
      </div>

      <div className="soccer-btn-card foul-wrapper">
        <p>FOUL</p>
        <div className="foul-btn-wrapper">
          <div onClick={!activeGame ? undefined : foul} className="foul-btn">
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

      <div className="soccer-btn-card yellow-card-wrapper">
        <p>REBOUND</p>
        {/* <p>*Player</p> */}
        <div className="yellow-card-btn-wrapper">
          <div onClick={!activeGame ? undefined : rebound} className="foul-btn">
            🫱🏽
          </div>
          <input
            className="player-input"
            placeholder="*Player"
            value={reboundPlayer}
            onChange={(e) => setReboundPlayer(e.target.value)}
          />
        </div>
      </div>

      <div className="soccer-btn-card yellow-card-wrapper">
        <p>BLOCK</p>
        {/* <p>*Player</p> */}
        <div className="yellow-card-btn-wrapper">
          <div onClick={!activeGame ? undefined : block} className="foul-btn">
            🖐🏽
          </div>
          <input
            className="player-input"
            placeholder="*Player"
            value={blockPlayer}
            onChange={(e) => setBlockPlayer(e.target.value)}
          />
        </div>
      </div>

      <div className="soccer-btn-card red-card-wrapper">
        <p>STEAL</p>
        <div className="red-card-btn-wrapper">
          <div onClick={!activeGame ? undefined : steal} className="foul-btn">
            🫳🏽
          </div>
          <input
            className="player-input"
            placeholder="*Player"
            value={stealPlayer}
            onChange={(e) => setStealPlayer(e.target.value)}
          />
        </div>
      </div>

      <div className="soccer-btn-card yellow-card-wrapper">
        <p>TURNOVER</p>
        {/* <p>*Player</p> */}
        <div className="yellow-card-btn-wrapper">
          <div onClick={!activeGame ? undefined : turnover} className="foul-btn">
            ↩️
          </div>
          <input
            className="player-input"
            placeholder="*Player"
            value={turnoverPlayer}
            onChange={(e) => setTurnoverPlayer(e.target.value)}
          />
        </div>
      </div>

      <div
        onClick={!activeGame ? undefined : timeout}
        className="soccer-btn-card team-btn penalty-btn"
      >
        <p>TIMEOUT</p>
      </div>
    </div>
  );
};

export default BasketballTeamButtons;
