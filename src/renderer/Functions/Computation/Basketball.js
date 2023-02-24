import { gameSlice } from 'renderer/Slice/gameSlice';
import { store } from 'renderer/store';
import { createGame, getStats, postGameEvent } from '../API/Api';
import runOBSMethod, { obs } from '../Obs';
import {
  generate2PTSource,
  generate3PTSource,
  generateFoulSource,
  generateScoreCardSource,
  generateScoreCardTimer,
  generateStatsSource,
  generateTimeoutSource
} from './BasketballObsHelper';
import {
  writeScoreCard,
  writeStats,
  writeTimer
} from './BasketballTemplates';
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
  if(sceneList?.scenes.find(e => e.sceneName !== 'game')){
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
    homeTeamScore: 0,
    awayTeamScore: 0,
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

  //IRAM DEBUGGING REMOVE THIS CALL
  // await runOBSMethod('CreateInput', {
  //   sceneName: 'game',
  //   inputName: 'test',
  //   inputKind: 'browser_source',
  //   inputSettings: {
  //     height: 195,
  //     is_local_file: true,
  //     local_file: pathJoin(
  //     getAssetPath(),
  //     '/browser_source/gridiron/kick.html'
  //     ),
  //     width: 424,
  //     css: '',
  //   },
  // }).then((res) =>
  //   runOBSMethod('SetSceneItemTransform', {
  //     sceneName: 'game',
  //     sceneItemId: res?.sceneItemId,
  //     sceneItemTransform: {
  //       alignment: 5,
  //       boundsAlignment: 0,
  //       boundsHeight: 1.0,
  //       boundsType: 'OBS_BOUNDS_NONE',
  //       boundsWidth: 1.0,
  //       cropBottom: 0,
  //       cropLeft: 0,
  //       cropRight: 0,
  //       cropTop: 0,
  //       height: 195,
  //       positionX: 430,
  //       positionY: 512,
  //       rotation: 0,
  //       scaleX: 0.8479999899864197,
  //       scaleY: 0.8478260636329651,
  //       sourceHeight: 230,
  //       sourceWidth: 500,
  //       width: 424,
  //     },
  //   })
  // );
  // await runOBSMethod('GetInputDefaultSettings', {
  //   inputKind: 'browser_source',
  // }).then((res) => console.log('{}{}{}', res));
  //REMOVE BETWEEN

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
    console.log(inputList)
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
      })}
    )
    .then(() => obs.disconnect().catch((e) => console.log(e)))
    .catch((e) => console.log(e));
  //TODO: redirect to dashboard
  //TODO: End Game popup reminder in dashboard
};

export const showStats = async () => {
  //TODO: fetch stats
  //TODO: write to stats file
  let stats = await getStats('soccer');
  console.log('YO FAM UR IN SHOW STATS', stats);
  if (stats) {
    // await writeStats(null);
    if (store.getState().streaming.isStreaming) {
      let reduxStore = store.getState();

      await writeStats({
        homeTeam: reduxStore.teams.homeTeamName,
        awayTeam: reduxStore.teams.awayTeamName,
        homeTeamGoals: reduxStore.pointHome.value,
        awayTeamGoals: reduxStore.pointAway.value,
        homeTeamShots: stats.team1.shots,
        awayTeamShots: stats.team2.shots,
        homeTeamShotsOnTarget: stats.team1.shots_on_target,
        awayTeamShotsOnTarget: stats.team2.shots_on_target,
        homeTeamFouls: stats.team1.fouls,
        awayTeamFouls: stats.team2.fouls,
        homeTeamYellowCards: stats.team1.yellow_cards,
        awayTeamYellowCards: stats.team2.yellow_cards,
        homeTeamRedCards: stats.team1.red_cards,
        awayTeamRedCards: stats.team2.red_cards,
        homeTeamOffsides: stats.team1.offsides,
        awayTeamOffsides: stats.team2.offsides,
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
  if (store.getState().streaming.isStreaming) {
    //TODO: enable 2pt source and add delay
    //TODO: disable 2pt source
    // await runOBSMethod('SetCurrentProgramScene', {
    //   sceneName: 'substitution',
    // });
    // //DONE: sleep(3000)
    // await sleep(3000);
    // // DONE: switch back to game
    // await runOBSMethod('SetCurrentProgramScene', {
    //   sceneName: 'game',
    // });
  }
};

export const show1pt = async (args) => {
    //TODO: api send event
};

export const showMiss = async (args) => {
  //TODO: api send event
};

//TODO
export const show3PT = async (args) => {
  //TODO: api send event
  if (store.getState().streaming.isStreaming) {
    //TODO: enable 3pt source and add delay
    //TODO: disable 3pt source
    // await runOBSMethod('SetCurrentProgramScene', {
    //   sceneName: 'substitution',
    // });
    // //DONE: sleep(3000)
    // await sleep(3000);
    // // DONE: switch back to game
    // await runOBSMethod('SetCurrentProgramScene', {
    //   sceneName: 'game',
    // });
  }
};

export const showFoul = async (args) => {
  //TODO: api send event
  if (store.getState().streaming.isStreaming) {
    //TODO: enable foul source and add delay
    //TODO: disable foul source
    // await runOBSMethod('SetCurrentProgramScene', {
    //   sceneName: 'substitution',
    // });
    // //DONE: sleep(3000)
    // await sleep(3000);
    // // DONE: switch back to game
    // await runOBSMethod('SetCurrentProgramScene', {
    //   sceneName: 'game',
    // });
  }
};

export const showRebound = async (args) => {
  //TODO: api send event
};

export const showBlock = async (args) => {
  //TODO: api send event
};

export const showSteal = async (args) => {
  //TODO: api send event
};

export const showTurnover = async (args) => {
  //TODO: api send event
};

export const showTimeout = async (args) => {
  //TODO: api send event
};

//TODO
export const showQtr = async (args) => {
  // which quarter is args? or redux
};

export const showGoal = async (args) => {
  // console.log('SCORE IS', args.homeTeamScore);
  //TODO: fetch goal
  postGameEvent({
    game_id: store.getState().game.gameId,
    event_type: 'shot',
    event: {
      team_for: args.teamFor,
      team_against: args.teamAgainst,
      is_goal: true,
      is_on_target: true,
      scorer: args.scorer,
      assist: args.assist,
      time: args.time,
    },
  });
  //DONE: write to scorecard file
  await writeScoreCard(args);

  if (store.getState().streaming.isStreaming) {
    if (args.celebrate) {
      //DONE: switch to goal scene
      await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'goal',
      });
      //DONE: refresh scorecard input
      await runOBSMethod('PressInputPropertiesButton', {
        inputName: 'scorecard',
        propertyName: 'refreshnocache',
      });
      //DONE: sleep(3000)
      await sleep(2000);
      // DONE: switch back to game
      await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'game',
      });
    } else {
      //DONE: refresh scorecard input
      await runOBSMethod('PressInputPropertiesButton', {
        inputName: 'scorecard',
        propertyName: 'refreshnocache',
      });
    }
  }

  //DONE: redux goal updates
};

export const showShot = async (args) => {
  //TODO: fetch shot
  postGameEvent({
    game_id: store.getState().game.gameId,
    event_type: 'shot',
    event: {
      team_for: args.teamFor,
      team_against: args.teamAgainst,
      is_goal: false,
      is_on_target: args.onTarget,
      scorer: args.scorer,
      assist: '',
      time: store.getState().game.currentMinute,
    },
  });
};

export const startGame = async (args) => {
  if (args.period === 'first') {
    //TODO: fetch game create ?
    await createGame();
  } else {
    if (store.getState().streaming.isStreaming) {
      // await generateScoreCardTimer();
      sleep(43);
      await writeTimer({
        gameSequence: 'Second Half',
        minute: Math.min(store.getState().game.currentMinute, 45),
        startTimePrint: `${Math.min(
          store.getState().game.currentMinute,
          45
        )}:00`,
        noTime: false,
      });
    }
    //TODO: 00:00 timer.html input added to scene game on top of scoreboard
  }
  //TODO: start UI timer on scorecard
  //TODO: disable start game button
};

export const halfTime = async () => {
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
