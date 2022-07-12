import { useEffect, useState } from 'react';
import '../Styles/Dashboard.css';
// import logo from '../../../assets/icons/128x128.png';
import { Link } from 'react-router-dom';
import GameOptions from './Molecules/GameOptions';

const Dashboard = (props) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className={`dashboard ${openModal?'blur':''}`}>
      {openModal && <div id='GameOptions'><GameOptions setOpenModal={setOpenModal} /></div>}
        <p className='title'>Dashboard</p>
        <div className='dashboard-btn-wrapper'><button className='start-stream-btn' onClick={()=>setOpenModal(true)}>Start Stream</button>
        <button className='settings-btn'>Settings</button></div>
    </div>
  );
};

export default Dashboard;
