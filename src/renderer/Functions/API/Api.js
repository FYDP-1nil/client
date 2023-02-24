import axios from 'axios';
import { gameSlice } from 'renderer/Slice/gameSlice';
import { tokenSlice } from 'renderer/Slice/tokenSlice';
import { store } from 'renderer/store';

const baseURL = 'http://127.0.0.1:3000';


export const joinLeague = async(name,pass) => {

    let res = false;

    console.log(store.getState().tokens.leagueValid);

    try {
      let response = await window.electron.ipcRenderer.invoke('api-call', {
        data: {
          league_name: name,
          league_password: pass,
        },
        method: 'POST',
        url: `${baseURL}/league/join`,
        headers:{
          "Authorization" : `Bearer ${store.getState().tokens.userToken}`
        }
      });
      console.log(response);
      store.dispatch(tokenSlice.actions.verifyLeague(true));
      res = true;
    } catch (err) {
      console.log(err);
      return res;
    }
    return res;

};

//todo
export const createGame = async() => {
let res = false;

try {
  let response = await window.electron.ipcRenderer.invoke('api-call', {
    data: {
      home_team: store.getState().teams.homeTeamName,
      away_team: store.getState().teams.awayTeamName,
    },
    method: 'POST',
    url: `${baseURL}/game/create`,
    headers:{
      "Authorization" : `Bearer ${store.getState().tokens.userToken}`
    }
  });
  console.log(response.data.game_id);
  store.dispatch(gameSlice.actions.setGameId(response.data.game_id));
  res = true;
} catch (err) {
  console.log(err);
  return res;
}
return res;

};

//todo
export const postGameEvent = async(data) => {

  let res = false;


  // {
  //   teamName
  //   eventType = shot, foul, offside
  //   gameId
  //   time
  //   eventOptions{

  //   }
  // }
  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      data,
      method: 'POST',
      url: `${baseURL}/game/events`,
      headers:{
        "Authorization" : `Bearer ${store.getState().tokens.userToken}`
      }
    });
    console.log(response);
    // store.dispatch(gameSlice.actions.setGameId(response.gameId));
    res = true;
  } catch (err) {
    console.log(err);
    return res;
  }
  return res;

  };

//todo
export const getStats = async(type) => {
  let res = false;


  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      method: 'POST',
      url: `${baseURL}/game/${type}/${store.getState().game.gameId}/stats`,
      headers:{
        "Authorization" : `Bearer ${store.getState().tokens.userToken}`
      }
    });
    console.log(response);
    // store.dispatch(gameSlice.actions.setGameId(response.gameId));
    return response.data.stats;
    // res = true;
  } catch (err) {
    console.log(err);
    return res;
  }
  return res;

};

export const createUser = async(email,user,pass) => {
  let res = false;

  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      data: {
        email: email,
        username: user,
        userpassword: pass,
      },
      method: 'POST',
      url: `${baseURL}/users/create`,
    });
    res = true;
  } catch (err) {
    return res;
  }
  return res;
};

// export const createLeague = async() => {

// };


export const loginUser = async (user, pass) => {

  let res = false;

  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      data: {
        username: user,
        userpassword: pass,
      },
      method: 'POST',
      url: `${baseURL}/login`,
    });
    console.log(response.data.access_token);
    store.dispatch(tokenSlice.actions.saveJWT(response.data.access_token));
    res = true;
  } catch (err) {
    return res;
  }
  return res;
};
