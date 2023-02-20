import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import runOBSMethod, { obs } from './Functions/Obs';
import LoginScreen from './Components/LoginScreen';
import Dashboard from './Components/Dashboard';
import SoccerScoreBoard from './Components/SoccerScoreBoard';
import './App.css';

const Home = () => {
  return <div></div>;
};

const App = (props) => {
  // useEffect(() => {
  //   // (async () => {
  //   //   await obs.connect();
  //   //   let inputList = await runOBSMethod('GetInputList');

  //   //   let results = inputList?.inputs.map((input) =>
  //   //       runOBSMethod('RemoveInput', {
  //   //           inputName: input.inputName
  //   //       })
  //   //   )
  //   //   results = await Promise.all(results);
  
  
  //   //   //DONE: Delete all scenes except default
  //   //   let defaultFlag = false;
  //   //   let sceneList = await runOBSMethod('GetSceneList');
  
  
  //   //   let removeScenes = sceneList?.scenes.map((scene) => {
  //   //           if (scene.sceneName === 'default') {
  //   //               defaultFlag = true;
  //   //           } else runOBSMethod('RemoveScene', {
  //   //               sceneName: scene.sceneName
  //   //           });
  //   //   });
  
  //   //   removeScenes = await Promise.all(removeScenes);
  //   //   })();
  // }, []);

  const [isLoggedIn,setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={isLoggedIn? <Dashboard /> : <LoginScreen/>} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/soccer-scoreboard" element={<SoccerScoreBoard />} />
          <Route exact path="/basketball-scoreboard" element={<SoccerScoreBoard />} />
          <Route exact path="/gridiron-scoreboard" element={<SoccerScoreBoard />} />
          <Route exact path="/settings" element={<SoccerScoreBoard />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
