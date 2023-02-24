import { useEffect, useState } from 'react';
import '../Styles/Dashboard.css';
// import logo from '../../../assets/icons/128x128.png';
import { Link } from 'react-router-dom';
import GameOptions from './Molecules/GameOptions';

const Dashboard = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [searchField, setSearchField] = useState('');

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
        <button className="settings-btn">Settings</button>
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
        <label>Search for league stats</label>
        <div>
          <input id="example" value={searchField} onChange={(e)=>setSearchField(e.target.value)} type="text" name="text" placeholder='Enter League Name' />
          <input onClick={()=>console.log(searchField)} type="submit" value="Search" />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <table>
          <thead>
            <tr>
              <th colSpan={3}>BEST SHOOTER</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.</td>
              <td>Steph Curry</td>
              <td>59%</td>
            </tr>
            <tr>
              <td>2.</td>
              <td>Mium</td>
              <td>70%</td>
            </tr>
          </tbody>
        </table>
        {/* <table>
          <thead>
            <tr>
              <th colSpan={3}>BEST SHOOTER</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.</td>
              <td>January</td>
              <td>$100</td>
            </tr>
            <tr>
              <td>2.</td>
              <td>February</td>
              <td>$80</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default Dashboard;
