import { useNavigate } from 'react-router-dom';
import '../Styles/Dashboard.css';

const SettingsPage = (props) => {
  let navigate = useNavigate();

  return (
    <div className="settings" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <p className="title">Settings</p>
      <button onClick={()=>navigate('/dashboard')} style={{marginTop:"50px"}}>Go back to Dashboard</button>
    </div>
  );
};
export default SettingsPage;
