// import icon from '../../assets/icon.svg';
import '../Styles/SoccerScoreBoard.css';
import runOBSMethod from '../Functions/Obs';
import { obs } from '../Functions/Obs';
import { MemoryRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SoccerTeamButtons from './Molecules/SoccerTeamButtons';
import StreamDeck from './Molecules/StreamDeck';
import SoccerGameButtons from './Molecules/SoccerGameButtons';
import SoccerScoreCard from './Molecules/SoccerScoreCard';
import SoccerTimeline from './Molecules/SoccerTimeline';
import * as soccer from '../Functions/Computation/Soccer.js';

const ttt = () => {
  let scene = Math.round(Math.random()) ? 'Scene' : 'Scene2';
  runOBSMethod('SetCurrentScene', {
    'scene-name': scene,
  });
};

const uuu = () => runOBSMethod('RefreshBrowserSource', { sourceName: 'TEST' });

const SoccerScoreBoard = (props) => {
  useEffect(() => {
        // obs.call('StopStream',{}).then(data=>console.log('hohh',data)).catch(()=>console.log('NO SOURCES'));
    // obs.disconnect();
    // obs.connect();
    // obs.call('GetInputPropertiesListPropertyItems',{inputName:'TEST',propertyName:''});
    // obs.call('PressInputPropertiesButton',{inputName:'TEST',propertyName:'refreshnocache'}); //refresh
    // obs.call('GetInputList',{}).then(data=>console.log(data)).catch(()=>console.log('NO SOURCES'));
    // obs.call('SetStreamServiceSettings',{streamServiceType:'rtmp_custom',streamServiceSettings:{server:'youtube.com',key:'343434'}});
    // obs.s('RefreshBrowserSource', { sourceName: 'TEST' })
    // obs.call('PressInputPropertiesButton');

}, []);

let navigate = useNavigate();

  return (
    <div className="Scoreboard">
      {/* <SoccerTeamButtons homeTeam={true} />
      <div className='soccer-board-middle'>
        <SoccerScoreCard />
        <SoccerGameButtons />
        <StreamDeck />
        <SoccerTimeline/>
      </div>
      <SoccerTeamButtons homeTeam={false} /> */}
      <button onClick={()=>{soccer.startStream();}}>start</button>
      <button onClick={()=>{soccer.stopStream();navigate("/dashboard", { replace: true });}}>stop</button>
    </div>
  );
};
export default SoccerScoreBoard;
