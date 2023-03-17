import { useState } from 'react';
import '../../Styles/Molecules/GameOptions.css';
import SoccerTeamSelection from './SoccerTeamSelection';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'renderer/store';
import { sleep } from 'renderer/Functions/Computation/utility';
import { createLeague, joinLeague } from 'renderer/Functions/API/Api';
import Spinner from '../Utility/Spinner';
import BasketballTeamSelection from './BasketballTeamSelection';
import GridironTeamSelection from './GridironTeamSelection';
import { tokenSlice } from 'renderer/Slice/tokenSlice';

const LeagueScreen = (props) => {
  const validLeague = useSelector(
    (state: RootState) => state.tokens.leagueToken
  );
  const dispatch = useDispatch();


  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const login = async () => {
    if (name && password) {
      setError('');
      setIsLoading(true);
      await sleep(500);
      let response = await joinLeague(name, password);
      if (response) {
        if(response.sport == props.sportSelected.toLowerCase()){
          setIsLoading(false);
          setError(''); 
          dispatch(tokenSlice.actions.verifyLeague(response.league_id));
        }
        else {
          setIsLoading(false);
          setError('Wrong sport for this league');  
        }
      } else {
        setIsLoading(false);
        setError('Wrong Credentials. Try Again');
      }
    }
  };

  const join = async () => {
    if (name && password) {
      setError('');
      setIsLoading2(true);
      await sleep(500);
      let response = await createLeague(name, password, props.sportSelected.toLowerCase());
      if (response) {
        setIsLoading2(false);
        setError('Now login');
      } else {
        setIsLoading2(false);
        setError('Wrong Credentials. Try Again');
      }
    }
  };

console.log(validLeague)

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
            <button className="btn create-btn" onClick={join}>
            {isLoading2 ? (
                <Spinner style={{ transform: 'scale(0.4)' }} />
              ) : (
                `CREATE NEW LEAGUE`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueScreen;
