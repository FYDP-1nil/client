import axios from 'axios';
import { gameSlice } from 'renderer/Slice/gameSlice';
import { tokenSlice } from 'renderer/Slice/tokenSlice';
import { store } from 'renderer/store';

const baseURL = 'http://127.0.0.1:3000';

export const joinLeague = async (name, pass) => {
  let res = false;

  console.log(store.getState().tokens.leagueToken);

  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      data: {
        league_name: name,
        league_password: pass,
      },
      method: 'POST',
      url: `${baseURL}/league/join`,
      headers: {
        Authorization: `Bearer ${store.getState().tokens.userToken}`,
      },
    });
    // console.log(response);
    // store.dispatch(tokenSlice.actions.verifyLeague(true));
    // res = true;
    return response.data;
  } catch (err) {
    console.log(err);
    return res;
  }
  return res;
};

export const createLeague = async (name, pass, sport) => {
  let res = false;

  // console.log(store.getState().tokens.leagueToken);

  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      data: {
        league_name: name,
        league_password: pass,
        sport: sport,
      },
      method: 'POST',
      url: `${baseURL}/league/create`,
      headers: {
        Authorization: `Bearer ${store.getState().tokens.userToken}`,
      },
    });
    // console.log(response);
    // store.dispatch(tokenSlice.actions.verifyLeague(true));
    res = true;
  } catch (err) {
    console.log(err);
    return res;
  }
  return res;
};

export const schedulePost = async (post_text) => {
  let res = false;
  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      data: {
        post_text,
      },
      method: 'POST',
      url: `${baseURL}/schedule/facebook`,
      headers: {
        Authorization: `Bearer ${store.getState().tokens.userToken}`,
      },
    });
    res = true;
  } catch (err) {
    console.log(err);
    return res;
  }
  return res;
};

//todo
export const createGame = async (type) => {
  let res = false;
  console.log(type);
  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      data: {
        home_team: store.getState().teams.homeTeamName,
        away_team: store.getState().teams.awayTeamName,
        league_id: store.getState().tokens.leagueToken,
      },
      method: 'POST',
      // url: `${baseURL}/game/create`,
      url: `${baseURL}/game/${type}/create`,
      headers: {
        Authorization: `Bearer ${store.getState().tokens.userToken}`,
      },
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

//TODO REPLACE ALL calls of postGameEvent to postSoccerEvent
export const postGameEvent = async (data) => {
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
      headers: {
        Authorization: `Bearer ${store.getState().tokens.userToken}`,
      },
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
export const getStats = async (type) => {
  let res = false;

  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      method: 'POST',
      url: `${baseURL}/game/${type}/${store.getState().game.gameId}/stats`,
      headers: {
        Authorization: `Bearer ${store.getState().tokens.userToken}`,
      },
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

export const createUser = async (email, user, pass) => {
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

export const postSoccerEvent = async (data) => {
  let res = false;

  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      data,
      method: 'POST',
      url: `${baseURL}/game/soccer/events`,
      headers: {
        Authorization: `Bearer ${store.getState().tokens.userToken}`,
      },
    });
    console.log(response);
    res = true;
  } catch (err) {
    console.log(err);
    return res;
  }
  return res;
};

export const postBasketballEvent = async (data) => {
  console.log(data);
  let res = false;

  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      data,
      method: 'POST',
      url: `${baseURL}/game/basketball/events`,
      headers: {
        Authorization: `Bearer ${store.getState().tokens.userToken}`,
      },
    });
    console.log(response);
    res = true;
  } catch (err) {
    console.log(err);
    return res;
  }
  return res;
};

export const postGridironEvent = async (data) => {
  let res = false;

  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      data,
      method: 'POST',
      url: `${baseURL}/game/gridiron/events`,
      headers: {
        Authorization: `Bearer ${store.getState().tokens.userToken}`,
      },
    });
    console.log(response);
    res = true;
  } catch (err) {
    console.log(err);
    return res;
  }
  return res;
};

export const getLeagueList = async () => {
  try {
    let response = await window.electron.ipcRenderer.invoke('api-call', {
      method: 'GET',
      url: `${baseURL}/leagues`,
      headers: {
        Authorization: `Bearer ${store.getState().tokens.userToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};


export const getLeagueStats = async (leagueName, leagueId) => {
  if (leagueName === 'soccer' && !leagueId) {
    return [
      {
        name: 'Goals',
        players: [
          {
            'Erling Haaland': 27,
          },
          {
            'Harry Kane': 18,
          },
          {
            'Marcus Rashford': 14,
          },
          {
            'Karim Benzema': 11,
          },
          {
            'Vinicius Jr.': 7,
          },
        ],
      },
      {
        name: 'Assists',
        players: [
          {
            'Kevin De Bruyne': 12,
          },
          {
            'Bukayo Saka': 9,
          },
          {
            'Bruno Fernandes': 6,
          },
          {
            'Rodrygo Goes': 5,
          },
          {
            'Luka Modric': 4,
          },
        ],
      },
      {
        name: 'Red Cards',
        players: [
          {
            'Sergio Ramos': 3,
          },
          {
            'Pepe': 2,
          },
          {
            'Casemiro': 1,
          },
          {
            'Nick Pope': 1,
          },
          {
            'Ivan Alejo': 1,
          },
        ],
      },
      {
        name: 'Yellow Cards',
        players: [
          {
            'Diego Dalot': 10,
          },
          {
            'Fred': 8,
          },
          {
            'Casemiro': 5,
          },
          {
            'Militao': 4,
          },
          {
            'Vinicius Jr.': 3,
          },
        ],
      },
    ];
  } else {
    try {
      let response = await window.electron.ipcRenderer.invoke('api-call', {
        method: 'GET',
        url: `${baseURL}/league/${leagueId}/stats`,
        headers: {
          Authorization: `Bearer ${store.getState().tokens.userToken}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(`${baseURL}/league/${leagueId}/stats`);
      console.log(err);
      // return err;
    }  
  }
};
