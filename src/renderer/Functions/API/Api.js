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

export const getLeagueStats = async (leagueName) => {
  if (leagueName === 'soccer') {
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
  } else if (leagueName === 'grid') {
    return [
      {
        name: 'Total Rushing Yards',
        players: [
          {
            'Christian MaCaffrey': 456,
          },
          {
            'Isiah Pacheco ': 393,
          },
          {
            'Joe Mixon': 365,
          },
          {
            'Daniel Jones': 345,
          },
          {
            'Miles Sanders': 304,
          },
        ],
      },
      {
        name: 'Total Passing Yards',
        players: [
          {
            'Joe Burrow': 934,
          },
          {
            'Patrick Mahomes': 872,
          },
          {
            'Josh Allen': 804,
          },
          {
            'Jalen Hurts': 785,
          },
          {
            'Brock Purdy': 732,
          },
        ],
      },
      {
        name: 'Total Receiving Yards',
        players: [
          {
            'Steffon Digs': 69,
          },
          {
            'DeVonta Smith': 61,
          },
          {
            'Tee Higgins': 55,
          },
          {
            'Brock Purdy': 49,
          },
          {
            'CeeDee Lamb': 42,
          },
        ],
      },
      {
        name: 'Total Kicks Made',
        players: [
          {
            'Robbie Gould': 12,
          },
          {
            'Harrison Butker': 8,
          },
          {
            'Cameron Dicker': 6,
          },
          {
            'Justin Tucker': 4,
          },
          {
            'Tyler Bass': 3,
          },
        ],
      },
      {
        name: 'Completion %',
        players: [
          {
            'Patrick Mahomes': 69,
          },
          {
            'Josh Allen': 61,
          },
          {
            'Joe Burrow': 55,
          },
          {
            'Lamar Jackson': 49,
          },
          {
            'Derek Carr': 42,
          },
        ],
      },
    ];
  } else if(leagueName === "ball") {
    return [
      {
          name: "Points Per Game",
          players: [
          {
              "Mike James": 25.3
          },
          {
              "John Stockton": 24.1
          },
          {
              "Eddie Bravo": 23.2
          },
          {
              "Joel Embiid": 22.2
          },
          {
              "Jamal Murray": 21.8
          }    
          ]
      },
      {
          name: "Rebounds Per Game",
          players: [
              {
                  "Bismark": 11.3
              },
              {
                  "Collins": 7.1
              },
              {
                  "Eddie Bravo": 3.2
              },
              {
                  "Theo Pinson": 4.6
              },
              {
                  "Damian": 3.8
              }    
              ]
      },
      {
          name: "Assists Per Game",
          players: [
              {
                  "Tyrese": 8.3
              },
              {
                  "Chris Paul": 6.1
              },
              {
                  "Steve Nash": 4.73
              },
              {
                  "Freddie": 4.5
              },
              {
                  "Westbrook": 4.0
              }    
          ]
      },
      {
          name: "Blocks Per Game",
          players: [
              {
                  "Ayton": 8.3
              },
              {
                  "Freddie": 6.1
              },
              {
                  "Lorent": 4.73
              },
              {
                  "Saab": 4.5
              },
              {
                  "Damian": 4.0
              }    
          ]
      },
      {
          name: "Steals Per Game",
          players: [
              {
                  "Lebron": 8.3
              },
              {
                  "Harden": 6.1
              },
              {
                  "Claxton": 4.73
              },
              {
                  "KAT": 4.5
              },
              {
                  "ANT": 4.0
              }    
          ]
      },
      {
          name: "Field Goal Percentage",
          players: [
              {
                  "Tyrese": 51
              },
              {
                  "Chris Paul": 49
              },
              {
                  "Steve Nash": 44
              },
              {
                  "Freddie": 42
              },
              {
                  "Westbrook": 42
              }    
          ]
      },
      {
          name: "3pt Percentage",
          players: [
              {
                  "Curry": 48
              },
              {
                  "Klay": 40
              },
              {
                  "Lebron": 37
              },
              {
                  "PG": 36
              },
              {
                  "Shai": 21
              }    
          ]
      },
  ];
  }
  else {
    return [];
  }
};
