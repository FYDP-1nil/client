import { useEffect, useState } from 'react';
import '../Styles/LoginScreen.css';
import logo from '../../../assets/icons/128x128.png';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from 'renderer/Functions/API/Api';
import Spinner from './Utility/Spinner';
import { sleep } from 'renderer/Functions/Computation/utility';

const LoginScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    if (username && password) {
      setError('');
      setIsLoading(true);
      await sleep(500);
      let response = await loginUser(username, password);
      if (response) {
        setIsLoading(false);
        setError('');
        navigate('/dashboard');
      } else {
        setIsLoading(false);
        setError('Wrong Credentials. Try Again');
      }
    }
  };

  return (
    <div className="screen">
      <img className="logo" src={logo} alt="1nil" />
      <div className="textbox-wrapper">
        <input
          className="textbox"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="textbox"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <div className="btn-wrapper">
          {/* <Link to="/dashboard"> */}
          <button onClick={login} className="btn login-btn">
            {isLoading?<Spinner style={{'transform':'scale(0.4)'}} />:`LOGIN`}
          </button>
          {/* </Link> */}
          <button className="btn signup-btn">SIGNUP</button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
