import { useEffect, useState } from 'react';
import '../Styles/LoginScreen.css';
import logo from '../../../assets/icons/128x128.png';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, loginUser } from 'renderer/Functions/API/Api';
import Spinner from './Utility/Spinner';
import { sleep } from 'renderer/Functions/Computation/utility';

const LoginScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [page, setPage] = useState('login');
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

  const signup = async () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      setIsLoading(true);
      await sleep(500);
    if (!re.test(email)) {
      setError('Enter Valid Email');
      setIsLoading(false);
      return;
    }

    if (username && password && email) {
      setError('');
      let response = await createUser(email, username, password);
      if (response) {
        setIsLoading(false);
        setError('');
        setPage('login');
      } else {
        setIsLoading(false);
        setError('Email or Username already exists');
      }
    }
  };

  return (
    <div className="screen">
      <img className="logo" src={logo} alt="1nil" />
      <div className="textbox-wrapper" style={{ marginTop: '50px' }}>
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
        {page === 'signup' && (
          <input
            className="textbox"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {error && <p style={{ textAlign: 'center', marginTop:"5px" }}>{error}</p>}
        <div
          className="btn-wrapper"
          style={{ justifyContent: 'center', marginTop: '20px' }}
        >
          {page === 'login' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <button onClick={login} className="btn login-btn">
                {isLoading ? (
                  <Spinner style={{ transform: 'scale(0.4)' }} />
                ) : (
                  `LOGIN`
                )}
              </button>
              <p style={{ color: 'white',marginTop:"5px" }}>
                <a
                  onClick={() => {setError(''); setPage('signup');}}
                  style={{
                    color: 'blue',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  CLICK HERE
                </a>{' '}
                TO SIGN UP
              </p>
            </div>
          )}
          {page === 'signup' && (
            <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}

            >
              <button onClick={() => signup()} className="btn signup-btn">
              {isLoading ? (
                  <Spinner style={{ transform: 'scale(0.4)' }} />
                ) : (
                  `SIGNUP`
                )}
              </button>
              <p style={{ color: 'white', marginTop:"5px" }}>
                GO BACK TO{' '}
                <a
                  onClick={() => {setError('');setPage('login')}}
                  style={{
                    color: 'blue',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  LOGIN
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
