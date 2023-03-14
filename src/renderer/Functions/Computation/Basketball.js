import { gameSlice } from 'renderer/Slice/gameSlice';
import { store } from 'renderer/store';
import {
  createGame,
  getStats,
  postBasketballEvent,
  schedulePost,
} from '../API/Api';
import runOBSMethod, { obs } from '../Obs';
import {
  generate2PTSource,
  generate3PTSource,
  generateFoulSource,
  generateScoreCardSource,
  generateScoreCardTimer,
  generateStatsSource,
  generateTimeoutSource,
} from './BasketballObsHelper';
import { writeScoreCard, writeStats, writeTimer } from './BasketballTemplates';
import { getAssetPath, pathJoin, sleep, writeToFile } from './utility';

export const startStream = async () => {
  await obs.connect();

  await runOBSMethod('SetStreamServiceSettings', {
    streamServiceType: 'rtmp_common',
    streamServiceSettings: {
      server: 'auto',
      key: 'live_808363638_cssKSYeC35ViMBiIT0RFRjLvTgcxEB',
      bwtest: false,
      service: 'Twitch',
    },
  });

  let inputList = await runOBSMethod('GetInputList');

  if (inputList) {
    let results = inputList?.inputs?.forEach(async (input) =>
      runOBSMethod('RemoveInput', {
        inputName: input.inputName,
      })
    );

    if (results) {
      results = await Promise.all(results);
    }
  }

  let sceneList = await runOBSMethod('GetSceneList');

  sleep(43);

  //DONE: Create Game Scene
  if (sceneList?.scenes.find((e) => e.sceneName !== 'game')) {
    await runOBSMethod('CreateScene', {
      sceneName: 'game',
    });
  }

  sleep(43);

  //DONE: Add camera input to game scene
  await runOBSMethod('CreateInput', {
    sceneName: 'game',
    inputName: 'vid',
    inputKind: 'av_capture_input',
  });

  sleep(43);

  //FIRST CREATE THE INPUT SOURCE, THEN FIND THE CAMERA AND SET THE DEVICE
  runOBSMethod('GetInputPropertiesListPropertyItems', {
    inputName: 'vid',
    propertyName: 'device',
  }).then((res) =>
    runOBSMethod('SetInputSettings', {
      inputName: 'vid',
      inputSettings: {
        // device_name:'FaceTime HD Camera',
        device: res?.propertyItems?.filter(
          (item) => item.itemName === 'FaceTime HD Camera'
        )[0]?.itemValue,
      },
    })
  );

  await runOBSMethod('CreateInput', {
    sceneName: 'game',
    inputName: 'audio',
    inputKind: 'coreaudio_input_capture',
    inputSettings: {
      device: 'BuiltInMicrophoneDevice',
      device_id: 'BuiltInMicrophoneDevice',
      // device_name: "FaceTime HD Camera"
    },
  });

  sleep(43);

  // DONE: add scorecard input to game scene
  await generateScoreCardSource(sceneList?.scenes);

  sleep(43);

  //TODO: write 0-0 scorecard to HTML file
  await writeScoreCard({
    homeTeam: store.getState().teams.homeTeamName,
    awayTeam: store.getState().teams.awayTeamName,
    homeTeamScore: store.getState().pointHome.value,
    awayTeamScore: store.getState().pointAway.value,
  });

  sleep(43);

  //DONE: create 2pt scene
  //DONE: add input to 2pt scene
  await generate2PTSource(sceneList?.scenes);

  sleep(43);

  //DONE: create 3pt scene
  //DONE: add input to 3pt scene
  await generate3PTSource(sceneList?.scenes);

  sleep(43);

  //DONE: create foul scene
  //DONE: add input to foul scene
  await generateFoulSource(sceneList?.scenes);

  sleep(43);

  //DONE: create timeout scene
  //DONE: add input to timeout scene
  await generateTimeoutSource(sceneList?.scenes);

  sleep(43);

  //DONE: create stats scene
  //DONE: add input to stats scene
  await generateStatsSource(sceneList?.scenes);

  sleep(43);

  //DONE: startStream:true dispatch Redux

  await runOBSMethod('SetCurrentProgramScene', {
    sceneName: 'game',
  });

  sleep(43);

  if (store.getState().game.activeGame) {
    await generateScoreCardTimer();
    sleep(43);
    await writeTimer({
      gameSequence: 'Q1',
      minute: store.getState().game.currentMinute,
      startTimePrint: `${store.getState().game.currentMinute}:00`,
      noTime: false,
    });
  }

  sleep(43);

  //DONE: startstream OBS call
  await runOBSMethod('StartStream').catch((data) => console.log(data));

  sleep(43);

  //TODO: disable startStream btn
};

export const stopStream = async () => {
  event.preventDefault();

  //DONE: delete non-default inputs
  await runOBSMethod('StopStream').catch((e) => console.log(e));

  await runOBSMethod('SetCurrentProgramScene', {
    sceneName: 'default',
  });

  //DONE: startStream:false dispatch Redux

  //DONE: delete non-default inputs
  let inputList = await runOBSMethod('GetInputList');

  if (inputList) {
    console.log(inputList);
    let results = inputList?.inputs.forEach(async (input) =>
      runOBSMethod('RemoveInput', {
        inputName: input.inputName,
      })
    );
    if (results) {
      results = await Promise.all(results);
    }
  }

  //DONE: delete non-default scene
  //DONE: OBS disconnect
  await runOBSMethod('GetSceneList')
    .then((res) => {
      console.log(res);
      res?.scenes.forEach(async (scene) => {
        if (scene.sceneName !== 'default')
          runOBSMethod('RemoveScene', {
            sceneName: scene.sceneName,
          });
      });
    })
    .then(() => obs.disconnect().catch((e) => console.log(e)))
    .catch((e) => console.log(e));
  //TODO: redirect to dashboard
  //TODO: End Game popup reminder in dashboard
};

export const showStats = async () => {
  //TODO: fetch stats
  //TODO: write to stats file
  let stats = await getStats('basketball');
  console.log('YO FAM UR IN SHOW STATS', stats);
  if (stats) {
    // await writeStats(null);
    if (store.getState().streaming.isStreaming) {
      let reduxStore = store.getState();

      await writeStats({
        homeTeam: reduxStore.teams.homeTeamName,
        awayTeam: reduxStore.teams.awayTeamName,
        homeTeamFG: stats.team1.fieldgoals_percentage,
        awayTeamFG: stats.team2.fieldgoals_percentage,
        homeTeam3PT: stats.team1.threepoint_percentage,
        awayTeam3PT: stats.team2.threepoint_percentage,
        homeTeamFT: stats.team1.freethrow_mades,
        awayTeamFT: stats.team2.freethrow_mades,
        homeTeamTurnovers: stats.team1.turnovers,
        awayTeamTurnovers: stats.team2.turnovers,
        homeTeamSteals: stats.team1.total_steals,
        awayTeamSteals: stats.team2.total_steals,
      });

      //DONE: refresh stats input
      await runOBSMethod('PressInputPropertiesButton', {
        inputName: 'statscard',
        propertyName: 'refreshnocache',
      });

      sleep(43);

      //DONE: switch to stats scene
      await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'stats',
      });
      //DONE: sleep(3000)
      await sleep(6000);
      // DONE: switch back to game
      await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'game',
      });
    }
  }
};

//TODO
export const show2PT = async (args) => {
  //TODO: api send event
  postBasketballEvent({
    game_id: store.getState().game.gameId,
    event_type: 'point',
    event: args,
  });
  if (store.getState().streaming.isStreaming) {
    //TODO: enable 2pt source and add delay
    await runOBSMethod('GetSceneItemId', {
      sceneName: 'game',
      sourceName: '2pt',
    }).then((data) =>
      runOBSMethod('SetSceneItemEnabled', {
        sceneName: 'game',
        sceneItemId: data.sceneItemId,
        sceneItemEnabled: true,
      })
    );
    await writeScoreCard({
      homeTeam: store.getState().teams.homeTeamName,
      awayTeam: store.getState().teams.awayTeamName,
      homeTeamScore: store.getState().pointHome.value,
      awayTeamScore: store.getState().pointAway.value,
    });
    await runOBSMethod('PressInputPropertiesButton', {
      inputName: 'scorecard',
      propertyName: 'refreshnocache',
    });
    await sleep(3000);
    await runOBSMethod('GetSceneItemId', {
      sceneName: 'game',
      sourceName: '2pt',
    }).then((data) =>
      runOBSMethod('SetSceneItemEnabled', {
        sceneName: 'game',
        sceneItemId: data.sceneItemId,
        sceneItemEnabled: false,
      })
    );
  }
};

export const show1pt = async (args) => {
  //TODO: api send event
  postBasketballEvent({
    game_id: store.getState().game.gameId,
    event_type: 'point',
    event: args,
  });
  if (store.getState().streaming.isStreaming) {
    await writeScoreCard({
      homeTeam: store.getState().teams.homeTeamName,
      awayTeam: store.getState().teams.awayTeamName,
      homeTeamScore: store.getState().pointHome.value,
      awayTeamScore: store.getState().pointAway.value,
    });
    await runOBSMethod('PressInputPropertiesButton', {
      inputName: 'scorecard',
      propertyName: 'refreshnocache',
    });
  }
};

export const showMiss = async (args) => {
  //TODO: api send event
  postBasketballEvent({
    game_id: store.getState().game.gameId,
    event_type: 'point',
    event: args,
  });
};

//TODO
export const show3PT = async (args) => {
  //TODO: api send event
  postBasketballEvent({
    game_id: store.getState().game.gameId,
    event_type: 'point',
    event: args,
  });
  if (store.getState().streaming.isStreaming) {
    await runOBSMethod('GetSceneItemId', {
      sceneName: 'game',
      sourceName: '3pt',
    }).then((data) =>
      runOBSMethod('SetSceneItemEnabled', {
        sceneName: 'game',
        sceneItemId: data.sceneItemId,
        sceneItemEnabled: true,
      })
    );
    await writeScoreCard({
      homeTeam: store.getState().teams.homeTeamName,
      awayTeam: store.getState().teams.awayTeamName,
      homeTeamScore: store.getState().pointHome.value,
      awayTeamScore: store.getState().pointAway.value,
    });
    await runOBSMethod('PressInputPropertiesButton', {
      inputName: 'scorecard',
      propertyName: 'refreshnocache',
    });
    await sleep(3000);
    await runOBSMethod('GetSceneItemId', {
      sceneName: 'game',
      sourceName: '3pt',
    }).then((data) =>
      runOBSMethod('SetSceneItemEnabled', {
        sceneName: 'game',
        sceneItemId: data.sceneItemId,
        sceneItemEnabled: false,
      })
    );
  }
};

export const showFoul = async (args) => {
  //TODO: api send event
  postBasketballEvent({
    game_id: store.getState().game.gameId,
    event_type: 'foul',
    event: args,
  });
  if (store.getState().streaming.isStreaming) {
    await runOBSMethod('GetSceneItemId', {
      sceneName: 'game',
      sourceName: 'foul',
    }).then((data) =>
      runOBSMethod('SetSceneItemEnabled', {
        sceneName: 'game',
        sceneItemId: data.sceneItemId,
        sceneItemEnabled: true,
      })
    );
    await sleep(3000);
    await runOBSMethod('GetSceneItemId', {
      sceneName: 'game',
      sourceName: 'foul',
    }).then((data) =>
      runOBSMethod('SetSceneItemEnabled', {
        sceneName: 'game',
        sceneItemId: data.sceneItemId,
        sceneItemEnabled: false,
      })
    );
  }
};

export const showRebound = async (args) => {
  //TODO: api send event
  postBasketballEvent({
    game_id: store.getState().game.gameId,
    event_type: 'rebound',
    event: args,
  });
};

export const showBlock = async (args) => {
  //TODO: api send event
  postBasketballEvent({
    game_id: store.getState().game.gameId,
    event_type: 'block',
    event: args,
  });
};

export const showSteal = async (args) => {
  //TODO: api send event
  postBasketballEvent({
    game_id: store.getState().game.gameId,
    event_type: 'steal',
    event: args,
  });
};

export const showTurnover = async (args) => {
  //TODO: api send event
  postBasketballEvent({
    game_id: store.getState().game.gameId,
    event_type: 'turnover',
    event: args,
  });
};

export const showTimeout = async () => {
  if (store.getState().streaming.isStreaming) {
    await runOBSMethod('GetSceneItemId', {
      sceneName: 'game',
      sourceName: 'timeout',
    }).then((data) =>
      runOBSMethod('SetSceneItemEnabled', {
        sceneName: 'game',
        sceneItemId: data.sceneItemId,
        sceneItemEnabled: true,
      })
    );
    await sleep(3000);
    await runOBSMethod('GetSceneItemId', {
      sceneName: 'game',
      sourceName: 'timeout',
    }).then((data) =>
      runOBSMethod('SetSceneItemEnabled', {
        sceneName: 'game',
        sceneItemId: data.sceneItemId,
        sceneItemEnabled: false,
      })
    );
  }
};

//TODO
export const showQtr = async (number) => {
  if (store.getState().streaming.isStreaming) {
    await writeTimer({
      gameSequence: `Q${number}`,
      minute: 0,
      startTimePrint: `00:00`,
      noTime: false,
    });
    await runOBSMethod('PressInputPropertiesButton', {
      inputName: 'scorecardtimer',
      propertyName: 'refreshnocache',
    });
  }
};

export const startGame = async (args) => {
  if (args.period === 'first') {
    //TODO: fetch game create ?
    schedulePost(`Kick-off\n\n${store.getState().teams.homeTeamName} vs ${store.getState().teams.awayTeamName}`);

    await createGame('basketball');
  }
  // else {
  // if (store.getState().streaming.isStreaming) {
  //   // await generateScoreCardTimer();
  //   sleep(43);
  //   await writeTimer({
  //     gameSequence: 'Second Half',
  //     minute: Math.min(store.getState().game.currentMinute, 45),
  //     startTimePrint: `${Math.min(
  //       store.getState().game.currentMinute,
  //       45
  //     )}:00`,
  //     noTime: false,
  //   });
  // }
  //TODO: 00:00 timer.html input added to scene game on top of scoreboard
  // }
  //TODO: start UI timer on scorecard
  //TODO: disable start game button
};

export const halfTime = async () => {
  schedulePost(`Half Time\n\n${store.getState().teams.homeTeamName} ${store.getState().pointHome.value} - ${store.getState().teams.awayTeamName} ${store.getState().pointAway.value}`);

  //TODO: Timer UI stops => 45:09 to HT
  //if (startStreaming redux true?) {
  //TODO: Update scorecard/timer
  //TODO: Refresh scorecard/timer

  //TODO: isHalf time dispatch true
  //DONE: showStats()
  if (store.getState().streaming.isStreaming) {
    await showStats();
    await writeTimer({
      gameSequence: 'HT',
      minute: 0,
      startTimePrint: '',
      noTime: true,
    });
  }
  //TODO: enable start game button
};

export const endGame = async () => {
  //TODO: fetch game ended?
  let homeScore = store.getState().pointHome.value;
  let awayScore = store.getState().pointAway.value;

  if(homeScore<awayScore){
    schedulePost(`End of Game\n\n${store.getState().teams.awayTeamName} wins it ${awayScore}-${homeScore} against ${store.getState().teams.homeTeamName}`);
  }
  else if(homeScore>awayScore){
    schedulePost(`End of Game\n\n${store.getState().teams.homeTeamName} wins it ${homeScore}-${awayScore} against ${store.getState().teams.awayTeamName}`);
  }
  else {
    schedulePost(`End of Game\n\n It's a ${homeScore}-${awayScore} draw between ${store.getState().teams.homeTeamName} and ${store.getState().teams.awayTeamName}`);
  }

  postBasketballEvent({
    game_id: store.getState().game.gameId,
    event_type: 'end',
    event: {
      period: "4",
      pts_home: store.getState().pointHome.value,
      pts_away: store.getState().pointAway.value,
    },
  });
  //TODO: Timer UI stops => 90:09 to FT
  if (store.getState().streaming.isStreaming) {
    await showStats();
    await writeTimer({
      gameSequence: 'FT',
      minute: 0,
      startTimePrint: '',
      noTime: true,
    });
  }
  store.dispatch(gameSlice.actions.setGameId(''));
  //if(startStreaming redux true){
  //TODO: timer.html stopped -> FT, refresh OBS
  //TODO: disable all buttons (except stream)
  //else{
  //TODO: Redirect to dashboard
};

export const showFixedScore = async (args) => {
  await writeScoreCard(args);
  if (store.getState().streaming.isStreaming) {
    await runOBSMethod('PressInputPropertiesButton', {
      inputName: 'scorecard',
      propertyName: 'refreshnocache',
    });
  }
};
