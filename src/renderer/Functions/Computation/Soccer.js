import runOBSMethod, { obs } from '../Obs';
import {
  generateFoulSource,
  generateGoalSource,
  generateOffsideSource,
  generatePenaltySource,
  generateRedCardSource,
  generateScoreCardSource,
  generateStatsSource,
  generateSubsSource,
  generateYellowCardSource,
} from './Obs';
import {
  writeRedCard,
  writeScoreCard,
  writeStats,
  writeSubs,
  writeYellowCard,
} from './SoccerTemplates';
import { getAssetPath, pathJoin, sleep, writeToFile } from './utility';

export const startStream = async () => {
  //DONE: obs.connect()
  await obs.connect();

  //TODO: getStreamKey fetch

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

    if(results) {
    results = await Promise.all(results);
    }
  }

  // //DONE: Delete all scenes except default
  let defaultFlag = false;
  let sceneList = await runOBSMethod('GetSceneList');

  if (sceneList) {
    let removeScenes = sceneList?.scenes.forEach(async (scene) => {
      if (scene.sceneName === 'default') {
        defaultFlag = true;
      } else {
        runOBSMethod('RemoveScene', {
          sceneName: scene.sceneName,
        });
      }
    });

    if(removeScenes){
    removeScenes = await Promise.all(removeScenes);
}
  }

  if (!defaultFlag)
    await runOBSMethod('CreateScene', {
      sceneName: 'default',
    });

  sleep(43);

  //DONE: Create Game Scene
  await runOBSMethod('CreateScene', {
    sceneName: 'game',
  });

  sleep(43);

  //DONE: Add camera input to game scene
  await runOBSMethod('CreateInput', {
    sceneName: 'game',
    inputName: 'vid',
    inputKind: 'av_capture_input',
    inputSettings: {
      // device_name:'FaceTime HD Camera',
      device: 'EAB7A68FEC2B4487AADFD8A91C1CB782',
    },
  });

  sleep(43);

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

  // TODO: add scorecard input to game scene
  await generateScoreCardSource();

  sleep(43);

  //TODO: write 0-0 scorecard to HTML file
  await writeScoreCard({
    homeTeam: 'waterloo',
    awayTeam: 'laurier',
    homeTeamScore: 0,
    awayTeamScore: 0,
  });

  sleep(43);

  //DONE: create substitution scene
  //DONE: add input to substitution scene
  await generateSubsSource();

  sleep(43);

  //DONE: create foul scene
  //DONE: add input to foul scene
  await generateFoulSource();

  sleep(43);

  //DONE: create offside scene
  //DONE: add input to offside scene
  await generateOffsideSource();

  sleep(43);

  //DONE: create yellow card scene
  //DONE: add input to yellow card scene
  await generateYellowCardSource();

  sleep(43);

  //DONE: create red card scene
  //DONE: add input to red card scene
  await generateRedCardSource();

  sleep(43);

  //DONE: create penalty scene
  //DONE: add input to penalty scene
  await generatePenaltySource();

  sleep(43);

  //DONE: create goal scene
  //DONE: add input to goal scene
  await generateGoalSource();

  sleep(43);

  //DONE: create stats scene
  //DONE: add input to stats scene
  await generateStatsSource();

  sleep(43);

  //TODO: startStream:true dispatch Redux

  await runOBSMethod('SetCurrentProgramScene', {
    sceneName: 'game',
  });

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

  //TODO: startStream:true dispatch Redux

  //DONE: delete non-default inputs
  let inputList = await runOBSMethod('GetInputList');

  if (inputList) {
    let results = inputList?.inputs.forEach(async (input) =>
      runOBSMethod('RemoveInput', {
        inputName: input.inputName,
      })
    );
    if(results){
    results = await Promise.all(results);
    }
  }
  //DONE: delete non-default scene
  //DONE: OBS disconnect
  await runOBSMethod('GetSceneList')
    .then((res) =>
      res?.scenes.forEach(async (scene) => {
        if (scene.sceneName !== 'default')
          runOBSMethod('RemoveScene', {
            sceneName: scene.sceneName,
          });
      })
    )
    .then(() => obs.disconnect().catch((e) => console.log(e)))
    .catch((e) => console.log(e));
  //TODO: redirect to dashboard
  //TODO: End Game popup reminder in dashboard
};

export const showStats = async () => {
  //TODO: fetch stats
  //TODO: write to stats file
  // await writeStats(null);

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
  await sleep(3000);
  // DONE: switch back to game
  await runOBSMethod('SetCurrentProgramScene', {
    sceneName: 'game',
  });
};

export const showSubs = async (args) => {
  //TODO: fetch subs

  //TODO: write to subs file
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
};

export const showRedCard = async (args) => {
  //TODO: fetch redcard

  //TODO: write to redcard file
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
};

export const showYellowCard = async (args) => {
  //TODO: fetch yellowcard

  //TODO: write to yellowcard file
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
};

export const showFoul = async (args) => {
  //TODO: fetch foul
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
};

export const showPenalty = async (args) => {
  //TODO: fetch penalty
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
};

export const showOffside = async (args) => {
  //TODO: fetch offside
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
};

export const showGoal = async (args) => {
  console.log('SCORE IS',args.homeTeamScore)
  //TODO: fetch goal
  //TODO: write to scorecard file
  await writeScoreCard(args);

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

  //TODO: redux goal updates
};

export const showShot = async (args) => {
  //TODO: fetch shot
};

export const deleteGoal = async (args) => {
  //TODO: fetch goal DELETE
};

export const startGame = async () => {
  //TODO: fetch game create ?
  //TODO: activeGame redux dispatch
  //if (startStreaming redux true?) {
  //TODO: 00:00 timer.html input added to scene game on top of scoreboard
  //TODO: start UI timer on scorecard
  //TODO: disable start game button
};

export const halfTime = async () => {
  //TODO: Timer UI stops => 45:09 to HT
  //if (startStreaming redux true?) {
  //TODO: Update
  //TODO: Refresh

  //TODO: isHalf time dispatch true
  //DONE: showStats()
  await showStats();
  //TODO: enable start game button
};

export const endGame = async () => {
  await showStats();
  //TODO: fetch game ended?
  //TODO: Timer UI stops => 90:09 to FT
  //if(startStreaming redux true){
  //TODO: timer.html stopped -> FT, refresh OBS
  //TODO: disable all buttons (except stream)
  //else{
  //TODO: Redirect to dashboard
};
