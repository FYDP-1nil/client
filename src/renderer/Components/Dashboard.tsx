import { useEffect, useState } from 'react';
import '../Styles/Dashboard.css';
// import logo from '../../../assets/icons/128x128.png';
import { Link, useNavigate } from 'react-router-dom';
import GameOptions from './Molecules/GameOptions';
import { getLeagueStats } from 'renderer/Functions/API/Api';

const Dashboard = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [searchField, setSearchField] = useState('');
  const [statistics, setStatistics] = useState([]);
  const navigate = useNavigate();

  const statsFunc = async () => {
    let res = await getLeagueStats(searchField);
    setStatistics(res);
    console.log(res);
  };

  return (
    <div className={`dashboard ${openModal ? 'blur' : ''}`}>
      {openModal && (
        <div id="GameOptions">
          <GameOptions setOpenModal={setOpenModal} />
        </div>
      )}
      <p className="title">Dashboard</p>
      <div className="dashboard-btn-wrapper">
        <button className="start-stream-btn" onClick={() => setOpenModal(true)}>
          Start Stream
        </button>
        <button onClick={() => navigate('/settings')} className="settings-btn">
          Settings
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          justifyContent: 'space-around',
          minHeight: '50px',
        }}
      >
        <label>Search for League-wide Stats</label>
        <div>
          <input
            id="example"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            type="text"
            name="text"
            placeholder="Enter League Name"
          />
          <input onClick={statsFunc} type="submit" value="Search" />
        </div>
      </div>
      {statistics && statistics?.length ? (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {statistics.map((cat, ix) => (
            <table  key={`${ix}-${ix}`} style={{ minWidth: '200px' }}>
              <thead>
                <tr>
                  <th colSpan={3}>{cat.name}</th>
                </tr>
              </thead>
              <tbody>
                {cat?.players.map((player, ix2) =>
                  Object.keys(player).map((key, ix3) => (
                    <tr key={`${ix2}-${ix3}`}>
                      <td>{ix2 + 1}.</td>
                      <td>{key}</td>
                      <td style={{textAlign:"end"}}>{player[key]}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ))}
        </div>
      ) : (
        <div>
          <p style={{ fontWeight: 'bold' }}>
            No Stats Available. Search for a League
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
