import { gameSlice } from 'renderer/Slice/gameSlice';
import { store } from 'renderer/store';
import {
  createGame,
  getStats,
  postGridironEvent,
  schedulePost,
} from '../API/Api';
import runOBSMethod, { obs } from '../Obs';
import {
  generateFlagSource,
  generateKickSource,
  generateSafetySource,
  generateScoreCardSource,
  generateScoreCardTimer,
  generateStatsSource,
  generateTimeoutSource,
  generateTDSource,
} from './GridironObsHelper';
import {
  writeKick,
  writeScoreCard,
  writeStats,
  writeTD,
  writeTimer,
} from './GridironTemplates';
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
    inputKind: 'av_capture_input_v2',
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

  //DONE: create flag source
  //DONE: add input to flag scene
  await generateFlagSource(sceneList?.scenes);

  sleep(43);

  //DONE: create kick scene
  //DONE: add input to kick scene
  await generateKickSource(sceneList?.scenes);

  sleep(43);

  //DONE: create safety scene
  //DONE: add input to safety scene
  await generateSafetySource(sceneList?.scenes);

  sleep(43);

  //DONE: create TD scene
  //DONE: add input to TD scene
  await generateTDSource(sceneList?.scenes);

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
      gameSequence: `Q${store.getState().game.currentQuarter}`,
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
  let stats = await getStats('gridiron');
  if (stats) {
    // await writeStats(null);
    if (store.getState().streaming.isStreaming) {
      let reduxStore = store.getState();

      //fix this
      await writeStats({
        homeTeam: reduxStore.teams.homeTeamName,
        awayTeam: reduxStore.teams.awayTeamName,
        homeTeamTouchdowns: stats.team1.total_touchdown,
        awayTeamTouchdowns: stats.team2.total_touchdown,
        homeTeamRushing: stats.team1.total_rushing_yards,
        awayTeamRushing: stats.team2.total_rushing_yards,
        homeTeamPassing: stats.team1.total_passing_yards,
        awayTeamPassing: stats.team2.total_passing_yards,
        homeTeamAvgYds: stats.team1.avg_yards_play,
        awayTeamAvgYds: stats.team2.avg_yards_play,
        homeTeamTurnovers: stats.team1.total_turnover,
        awayTeamTurnovers: stats.team2.total_turnover,
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
export const showThrow = async (args) => {
  postGridironEvent({
    game_id: store.getState().game.gameId,
    event_type: 'throw',
    event: args,
  });

  if (args.result !== 'non-scoring' && args.result !== 'miss') {

    if(args.team_for == store.getState().teams.homeTeamName){
      schedulePost(`TOUCHDOWN!!!!\n\n${args.player_throwing}->${args.player_receiving} for ${args.yard} yards\n\n${store.getState().teams.homeTeamName} [${store.getState().pointHome.value}] - ${store.getState().teams.awayTeamName} ${store.getState().pointAway.value}`);
    }
    else {
      schedulePost(`TOUCHDOWN!!!!\n\n${args.player_throwing}->${args.player_receiving} for ${args.yard} yards\n\n${store.getState().teams.homeTeamName} ${store.getState().pointHome.value} - ${store.getState().teams.awayTeamName} [${store.getState().pointAway.value}]`);
    }
  

    if(store.getState().streaming.isStreaming) {
    await writeTD({ yds: args.yard });

    //DONE: refresh redcard input
    await runOBSMethod('PressInputPropertiesButton', {
      inputName: 'td',
      propertyName: 'refreshnocache',
    });

    await runOBSMethod('GetSceneItemId', {
      sceneName: 'game',
      sourceName: 'td',
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
      sourceName: 'td',
    }).then((data) =>
      runOBSMethod('SetSceneItemEnabled', {
        sceneName: 'game',
        sceneItemId: data.sceneItemId,
        sceneItemEnabled: false,
      })
    );
  }
}
};

//TODO
export const showRush = async (args) => {
  postGridironEvent({
    game_id: store.getState().game.gameId,
    event_type: 'rush',
    event: args,
  });

  if ( args.result !== 'non-scoring') {

    if(args.team_for == store.getState().teams.homeTeamName){
      schedulePost(`TOUCHDOWN!!!!\n\n${args.player} for ${args.yard} yards\n\n${store.getState().teams.homeTeamName} [${store.getState().pointHome.value}] - ${store.getState().teams.awayTeamName} ${store.getState().pointAway.value}`);
    }
    else {
      schedulePost(`TOUCHDOWN!!!!\n\n${args.player} for ${args.yard} yards\n\n${store.getState().teams.homeTeamName} ${store.getState().pointHome.value} - ${store.getState().teams.awayTeamName} [${store.getState().pointAway.value}]`);
    }


    if(store.getState().streaming.isStreaming) {
    await writeTD({ yds: args.yard });

    //DONE: refresh redcard input
    await runOBSMethod('PressInputPropertiesButton', {
      inputName: 'td',
      propertyName: 'refreshnocache',
    });

    await runOBSMethod('GetSceneItemId', {
      sceneName: 'game',
      sourceName: 'td',
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
      sourceName: 'td',
    }).then((data) =>
      runOBSMethod('SetSceneItemEnabled', {
        sceneName: 'game',
        sceneItemId: data.sceneItemId,
        sceneItemEnabled: false,
      })
    );
  }
  }
};

//TODO
export const showKick = async (args) => {
  postGridironEvent({
    game_id: store.getState().game.gameId,
    event_type: 'kick',
    event: args,
  });

  if(args.result === 'miss'){
    schedulePost(`${args.player} misses the kick\n\n${store.getState().teams.homeTeamName} ${store.getState().pointHome.value} - ${store.getState().teams.awayTeamName} ${store.getState().pointAway.value}`);
  }
  else {
    if(args.team_for == store.getState().teams.homeTeamName){
      schedulePost(`KICK IS GOOD!!\n\n${args.player} for ${args.yard} yards\n\n${store.getState().teams.homeTeamName} [${store.getState().pointHome.value}] - ${store.getState().teams.awayTeamName} ${store.getState().pointAway.value}`);
    }
    else {
      schedulePost(`KICK IS GOOD!!\n\n${args.player} for ${args.yard} yards\n\n${store.getState().teams.homeTeamName} ${store.getState().pointHome.value} - ${store.getState().teams.awayTeamName} [${store.getState().pointAway.value}]`);
    }
  }

  if (store.getState().streaming.isStreaming && args.result !== 'miss') {
    await writeKick({ yds: args.yard });

    //DONE: refresh redcard input
    await runOBSMethod('PressInputPropertiesButton', {
      inputName: 'kick',
      propertyName: 'refreshnocache',
    });
    await runOBSMethod('GetSceneItemId', {
      sceneName: 'game',
      sourceName: 'kick',
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
      sourceName: 'kick',
    }).then((data) =>
      runOBSMethod('SetSceneItemEnabled', {
        sceneName: 'game',
        sceneItemId: data.sceneItemId,
        sceneItemEnabled: false,
      })
    );
  }
};

//BE
export const showSafety = async (args) => {
  postGridironEvent({
    game_id: store.getState().game.gameId,
    event_type: 'safety',
    event: args,
  });
  if(args.team_for == store.getState().teams.homeTeamName){
    schedulePost(`Safety +2\n\n${store.getState().teams.homeTeamName} [${store.getState().pointHome.value}] - ${store.getState().teams.awayTeamName} ${store.getState().pointAway.value}`);
  }
  else {
    schedulePost(`Safety +2\n\n${store.getState().teams.homeTeamName} ${store.getState().pointHome.value} - ${store.getState().teams.awayTeamName} [${store.getState().pointAway.value}]`);
  }



  if (store.getState().streaming.isStreaming) {
    await runOBSMethod('GetSceneItemId', {
      sceneName: 'game',
      sourceName: 'safety',
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
      sourceName: 'safety',
    }).then((data) =>
      runOBSMethod('SetSceneItemEnabled', {
        sceneName: 'game',
        sceneItemId: data.sceneItemId,
        sceneItemEnabled: false,
      })
    );
  }
};

//BE
export const showFlag = async (args) => {
  postGridironEvent({
    game_id: store.getState().game.gameId,
    event_type: 'flag',
    event: args,
  });

  if (store.getState().streaming.isStreaming) {
    await runOBSMethod('GetSceneItemId', {
      sceneName: 'game',
      sourceName: 'flag',
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
      sourceName: 'flag',
    }).then((data) =>
      runOBSMethod('SetSceneItemEnabled', {
        sceneName: 'game',
        sceneItemId: data.sceneItemId,
        sceneItemEnabled: false,
      })
    );
  }
};

//BE
export const showTimeout = async (args) => {
  postGridironEvent({
    game_id: store.getState().game.gameId,
    event_type: 'timeout',
    event: args,
  });

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

//BE
export const showTurnover = async (args) => {
  postGridironEvent({
    game_id: store.getState().game.gameId,
    event_type: 'turnover',
    event: args,
  });
};

//DONE
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

//DONE
export const showFixedScore = async (args) => {
  await writeScoreCard(args);
  if (store.getState().streaming.isStreaming) {
    await runOBSMethod('PressInputPropertiesButton', {
      inputName: 'scorecard',
      propertyName: 'refreshnocache',
    });
  }
};

export const startGame = async (args) => {
  //TODO SCHEDULER CALL
  if (args.period === 'first') {
    schedulePost(`Kick-off\n\n${store.getState().teams.homeTeamName} vs ${store.getState().teams.awayTeamName}`);

    await createGame('gridiron');
  }
  // else {
  //   if (store.getState().streaming.isStreaming) {
  //     // await generateScoreCardTimer();
  //     sleep(43);
  //     await writeTimer({
  //       gameSequence: 'Second Half',
  //       minute: Math.min(store.getState().game.currentMinute, 45),
  //       startTimePrint: `${Math.min(
  //         store.getState().game.currentMinute,
  //         45
  //       )}:00`,
  //       noTime: false,
  //     });
  //   }
  // }
};

export const halfTime = async () => {
  schedulePost(`Half Time\n\n${store.getState().teams.homeTeamName} ${store.getState().pointHome.value} - ${store.getState().teams.awayTeamName} ${store.getState().pointAway.value}`);

  //TODO Scheduler call
  if (store.getState().streaming.isStreaming) {
    await showStats();
    await writeTimer({
      gameSequence: 'HT',
      minute: 0,
      startTimePrint: '',
      noTime: true,
    });
  }
};

export const endGame = async () => {
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

  //TODO SCHEDULER CALL
  // postGridironEvent({
  //   game_id: store.getState().game.gameId,
  //   event_type: 'end',
  //   event: {
  //     period: 4,
  //     pts_home: store.getState().pointHome.value,
  //     pts_away: store.getState().pointAway.value,
  //   },
  // });

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
};
