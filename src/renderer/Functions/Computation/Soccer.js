import { gameSlice } from 'renderer/Slice/gameSlice';
import { store } from 'renderer/store';
import { createGame, getStats, postGameEvent, schedulePost } from '../API/Api';
import runOBSMethod, { obs } from '../Obs';
import {
  generateFoulSource,
  generateGoalSource,
  generateOffsideSource,
  generatePenaltySource,
  generateRedCardSource,
  generateScoreCardSource,
  generateScoreCardTimer,
  generateStatsSource,
  generateSubsSource,
  generateYellowCardSource,
} from './SoccerObsHelper';
import {
  writeRedCard,
  writeScoreCard,
  writeStats,
  writeSubs,
  writeTimer,
  writeYellowCard,
} from './SoccerTemplates';
import { getAssetPath, pathJoin, sleep, writeToFile } from './utility';

export const startStream = async () => {
  //DONE: obs.connect()
  await obs.connect();

  

  //------>TODONE: setStreamKey obs call
  await runOBSMethod('SetStreamServiceSettings', {
    streamServiceType: 'rtmp_common',
    streamServiceSettings: {
      server: 'auto',
      key: 'live_808363638_cssKSYeC35ViMBiIT0RFRjLvTgcxEB',
      bwtest: false,
      service: 'Twitch',
    },
  });

  // await runOBSMethod('GetStreamServiceSettings').then((ss) => console.log(ss));
  // await runOBSMethod('GetInputPropertiesListPropertyItems');
  // //DONE: delete non-default inputs
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

  // //DONE: Delete all scenes except default
  // let defaultFlag = false;
  let sceneList = await runOBSMethod('GetSceneList');

  // if (sceneList) {
  //   let removeScenes = sceneList?.scenes.forEach(async (scene) => {
  //     if (scene.sceneName === 'default') {
  //       defaultFlag = true;
  //     } else {
  //       runOBSMethod('RemoveScene', {
  //         sceneName: scene.sceneName,
  //       });
  //     }
  //   });

  //   if (removeScenes) {
  //     removeScenes = await Promise.all(removeScenes);
  //   }
  // }

  // if (!defaultFlag)
  //   await runOBSMethod('CreateScene', {
  //     sceneName: 'default',
  //   });

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

  // runOBSMethod('GetInputSettings',{inputName:'audio'}).then((res)=> console.log('{}{}{}',res));

  sleep(43);

  // await runOBSMethod('CreateScene', { sceneName: 'redcard' });
  // runOBSMethod('GetInputSettings',{inputName:'audio'}).then((res)=> console.log(res));

  // await runOBSMethod('CreateInput', {
  //   sceneName: 'redcard',
  //   inputName: 'redcardcard',
  //   inputKind: 'browser_source',
  // //   inputSettings: {
  // //     height: 720,
  // //     is_local_file: true,
  // //     local_file:
  // //       '/Users/knotscientific/Documents/1nil/client/assets/browser_source/soccer/red_card.html',
  // //     width: 1280,
  // //     css: '',
  // //   },
  // }).then((data) => console.log(data));

  // await runOBSMethod('SetInputSettings', {
  //     inputName: 'redcardcard',
  //     inputSettings: {
  //       height: 720,
  //       is_local_file: true,
  //       local_file: pathJoin(getAssetPath(),'/browser_source/soccer/goal.html'),
  //       width: 1280,
  //     },
  //   }).then((data) => console.log(data));

  // await runOBSMethod('GetInputSettings',{inputName:'redcardcard'}).then((data)=>console.log(data));

  // DONE: add scorecard input to game scene
  await generateScoreCardSource(sceneList?.scenes);

  sleep(43);

  
  await writeScoreCard({
    homeTeam: store.getState().teams.homeTeamName,
    awayTeam: store.getState().teams.awayTeamName,
    homeTeamScore: 0,
    awayTeamScore: 0,
  });

  sleep(43);

  //DONE: create substitution scene
  //DONE: add input to substitution scene
  await generateSubsSource(sceneList?.scenes);

  sleep(43);

  //DONE: create foul scene
  //DONE: add input to foul scene
  await generateFoulSource(sceneList?.scenes);

  sleep(43);

  //DONE: create offside scene
  //DONE: add input to offside scene
  await generateOffsideSource(sceneList?.scenes);

  sleep(43);

  //DONE: create yellow card scene
  //DONE: add input to yellow card scene
  await generateYellowCardSource(sceneList?.scenes);

  sleep(43);

  //DONE: create red card scene
  //DONE: add input to red card scene
  await generateRedCardSource(sceneList?.scenes);

  sleep(43);

  //DONE: create penalty scene
  //DONE: add input to penalty scene
  await generatePenaltySource(sceneList?.scenes);

  sleep(43);

  //DONE: create goal scene
  //DONE: add input to goal scene
  await generateGoalSource(sceneList?.scenes);

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
      gameSequence: 'First Half',
      minute: store.getState().game.currentMinute,
      startTimePrint: `${store.getState().game.currentMinute}:00`,
      noTime: false,
    });
  }

  sleep(43);

  //DONE: startstream OBS call
  await runOBSMethod('StartStream').catch((data) => console.log(data));

  sleep(43);

  
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
  
  
};

export const showStats = async () => {
  
  
  let stats = await getStats('soccer');
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

export const showSubs = async (args) => {

  schedulePost(`${store.getState().game.currentMinute}' Substitution\n\n${args.playerOn} ▲\n\n${args.playerOff} ▼`);
  
  //DONE: write to subs file
  if (store.getState().streaming.isStreaming) {
    await writeSubs(args);

    //DONE: refresh subs input
    await runOBSMethod('PressInputPropertiesButton', {
      inputName: 'substitutioncard',
      propertyName: 'refreshnocache',
    });

    sleep(43);

    //DONE: switch to subs scene
    await runOBSMethod('SetCurrentProgramScene', {
      sceneName: 'substitution',
    });
    //DONE: sleep(3000)
    await sleep(3000);
    // DONE: switch back to game
    await runOBSMethod('SetCurrentProgramScene', {
      sceneName: 'game',
    });
  }
};

export const showRedCard = async (args) => {
  
  postGameEvent({
    game_id: store.getState().game.gameId,
    event_type: 'foul',
    event: {
      is_yellow: false,
      is_red: true,
      player: args.player,
      reason: 'Red Card',
      team_for: args.teamFor,
      team_against: args.teamAgainst,
      time: store.getState().game.currentMinute,
    },
  });

  schedulePost(`${store.getState().game.currentMinute}' RED CARD FOR ${args.player} (${args.teamFor})!`);

  if (store.getState().streaming.isStreaming) {
    //DONE: write to redcard file
    await writeRedCard(args);

    //DONE: refresh redcard input
    await runOBSMethod('PressInputPropertiesButton', {
      inputName: 'redcardcard',
      propertyName: 'refreshnocache',
    });

    sleep(43);

    //DONE: switch to redcard scene
    await runOBSMethod('SetCurrentProgramScene', {
      sceneName: 'redcard',
    });
    //DONE: sleep(3000)
    await sleep(3000);
    // DONE: switch back to game
    await runOBSMethod('SetCurrentProgramScene', {
      sceneName: 'game',
    });
  }
};

export const showYellowCard = async (args) => {
  
  postGameEvent({
    game_id: store.getState().game.gameId,
    event_type: 'foul',
    event: {
      is_yellow: true,
      is_red: false,
      player: args.player,
      reason: 'Yellow Card',
      team_for: args.teamFor,
      team_against: args.teamAgainst,
      time: store.getState().game.currentMinute,
    },
  });

  if (store.getState().streaming.isStreaming) {
    //DONE: write to yellowcard file
    await writeYellowCard(args);

    //DONE: refresh yellowcard input
    await runOBSMethod('PressInputPropertiesButton', {
      inputName: 'yellowcardcard',
      propertyName: 'refreshnocache',
    });

    sleep(43);

    //DONE: switch to subs scene
    await runOBSMethod('SetCurrentProgramScene', {
      sceneName: 'yellowcard',
    });
    //DONE: sleep(3000)
    await sleep(3000);
    // DONE: switch back to game
    await runOBSMethod('SetCurrentProgramScene', {
      sceneName: 'game',
    });
  }
};

export const showFoul = async (args) => {
  
  postGameEvent({
    game_id: store.getState().game.gameId,
    event_type: 'foul',
    event: {
      is_yellow: false,
      is_red: false,
      player: args.player,
      reason: args.reason,
      team_for: args.teamFor,
      team_against: args.teamAgainst,
      time: store.getState().game.currentMinute,
    },
  });

  if (store.getState().streaming.isStreaming) {
    //DONE: switch to foul scene
    await runOBSMethod('SetCurrentProgramScene', {
      sceneName: 'foul',
    });

    //DONE: sleep(3000)
    await sleep(3000);
    // DONE: switch back to game
    await runOBSMethod('SetCurrentProgramScene', {
      sceneName: 'game',
    });
  }
};

export const showPenalty = async (args) => {
  
  postGameEvent({
    game_id: store.getState().game.gameId,
    event_type: 'foul',
    event: {
      is_yellow: false,
      is_red: false,
      player: '',
      reason: 'Penalty',
      team_for: args.teamFor,
      team_against: args.teamAgainst,
      time: store.getState().game.currentMinute,
    },
  });

  if (store.getState().streaming.isStreaming) {
    //DONE: switch to penalty scene
    await runOBSMethod('SetCurrentProgramScene', {
      sceneName: 'penalty',
    });
    //DONE: sleep(3000)
    await sleep(3000);
    // DONE: switch back to game
    await runOBSMethod('SetCurrentProgramScene', {
      sceneName: 'game',
    });
  }
};

export const showOffside = async (args) => {
  
  postGameEvent({
    game_id: store.getState().game.gameId,
    event_type: 'offside',
    event: {
      team_for: args.teamFor,
      team_against: args.teamAgainst,
      time: store.getState().game.currentMinute,
    },
  });

  if (store.getState().streaming.isStreaming) {
    //DONE: switch to offside scene
    await runOBSMethod('SetCurrentProgramScene', {
      sceneName: 'offside',
    });
    //DONE: sleep(3000)
    await sleep(3000);
    // DONE: switch back to game
    await runOBSMethod('SetCurrentProgramScene', {
      sceneName: 'game',
    });
  }
};

export const showGoal = async (args) => {
  if(args.teamFor == store.getState().teams.homeTeamName){
    schedulePost(`${args.time}' GOAAALLLLL!!!!!\n\n${args.scorer} (${args.teamFor})\n\n${store.getState().teams.homeTeamName} [${store.getState().pointHome.value}] - ${store.getState().teams.awayTeamName} ${store.getState().pointAway.value}`);
  }
  else {
    schedulePost(`${args.time}' GOAAALLLLL!!!!!\n\n${args.scorer} (${args.teamFor})\n\n${store.getState().teams.homeTeamName} ${store.getState().pointHome.value} - ${store.getState().teams.awayTeamName} [${store.getState().pointAway.value}]`);
  }

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

export const deleteGoal = async (args) => {
  
};

export const startGame = async (args) => {
  if (args.period === 'first') {
    schedulePost(`Kick-off\n\n${store.getState().teams.homeTeamName} vs ${store.getState().teams.awayTeamName}`);
    await createGame('soccer');
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
    
  }
  
  
};

export const halfTime = async () => {
  
  //if (startStreaming redux true?) {
  schedulePost(`Half Time\n\n${store.getState().teams.homeTeamName} ${store.getState().pointHome.value} - ${store.getState().teams.awayTeamName} ${store.getState().pointAway.value}`);

  

  
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
  
  
  //else{
  
};
