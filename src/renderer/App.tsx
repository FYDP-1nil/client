import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './Components/LoginScreen';
import Dashboard from './Components/Dashboard';
import SoccerScoreBoard from './Components/SoccerScoreBoard';
import './App.css';
import BasketballScoreBoard from './Components/BasketballScoreBoard';
import GridironScoreBoard from './Components/GridironScoreBoard';
import SettingsPage from './Components/SettingsPage';

const App = () => {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginScreen/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/soccer-scoreboard" element={<SoccerScoreBoard />} />
          <Route path="/basketball-scoreboard" element={<BasketballScoreBoard />} />
          <Route path="/gridiron-scoreboard" element={<GridironScoreBoard />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
