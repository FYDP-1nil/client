import { useState } from 'react';
import '../../Styles/Molecules/GameOptions.css';
import SoccerTeamSelection from './SoccerTeamSelection';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/store';
import { sleep } from 'renderer/Functions/Computation/utility';
import { joinLeague } from 'renderer/Functions/API/Api';
import Spinner from '../Utility/Spinner';
import BasketballTeamSelection from './BasketballTeamSelection';
import GridironTeamSelection from './GridironTeamSelection';

const LeagueScreen = (props) => {
  const validLeague = useSelector(
    (state: RootState) => state.tokens.leagueValid
  );

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    if (name && password) {
      setError('');
      setIsLoading(true);
      await sleep(500);
      let response = await joinLeague(name, password);
      if (response) {
        setIsLoading(false);
        setError('');
      } else {
        setIsLoading(false);
        setError('Wrong Credentials. Try Again');
      }
    }
  };

  return validLeague ? (
    props.sportSelected === 'SOCCER' ? (
      <SoccerTeamSelection
        setOpenModal={props.setOpenModal}
        setSportSelected={props.setSportSelected}
      />
    ) : props.sportSelected === 'BASKETBALL' ? (
      <BasketballTeamSelection
        setOpenModal={props.setOpenModal}
        setSportSelected={props.setSportSelected}
      />
    ) : (
      <GridironTeamSelection
        setOpenModal={props.setOpenModal}
        setSportSelected={props.setSportSelected}
      />
    )
  ) : (
    <div className="game-options">
      <div
        className="game-options-close"
        onClick={() => {
          props.setOpenModal(false);
          props.setSportSelected('');
        }}
      >
        x
      </div>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>
        JOIN YOUR LEAGUE
      </p>
      <div className="game-options-wrapper">
        <div className="textbox-wrapper">
          <input
            className="textbox"
            placeholder="League Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="textbox"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p
              style={{
                textAlign: 'center',
                marginTop: '10px',
                fontWeight: 'normal',
              }}
            >
              {error}
            </p>
          )}
          <div className="btn-wrapper">
            <button className="btn join-btn" onClick={login}>
              {isLoading ? (
                <Spinner style={{ transform: 'scale(0.4)' }} />
              ) : (
                `JOIN`
              )}
            </button>
            <button className="btn create-btn">CREATE NEW LEAGUE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueScreen;
