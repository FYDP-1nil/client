import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obs } from './Functions/Obs';
import LoginScreen from './Components/LoginScreen';
import Dashboard from './Components/Dashboard';
import SoccerScoreBoard from './Components/SoccerScoreBoard';
import './App.css';

const Home = () => {
  return <div></div>;
};

const App = (props) => {
  // useEffect(() => {
  //   (async () => await obs.connect())();
  // }, []);

  const [isLoggedIn,setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={isLoggedIn? <Dashboard /> : <LoginScreen/>} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/soccer-scoreboard" element={<SoccerScoreBoard />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
