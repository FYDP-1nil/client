import runOBSMethod, {
    obs
} from '../Obs';
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
import {
    getAssetPath,
    pathJoin,
    sleep,
    writeToFile
} from './utility';

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

    await obs.call('GetStreamServiceSettings').then((ss) => console.log(ss));
    //DONE: delete non-default inputs
    // let inputList = await runOBSMethod('GetInputList');

    // let results = inputList?.inputs.map((input) =>
    //     runOBSMethod('RemoveInput', {
    //         inputName: input.inputName
    //     })
    // )
    // results = await Promise.all(results);


    //DONE: Delete all scenes except default
    // let defaultFlag = false;
    // let sceneList = await runOBSMethod('GetSceneList');


    // let removeScenes = sceneList?.scenes.map((scene) => {
    //         if (scene.sceneName === 'default') {
    //             defaultFlag = true;
    //         } else runOBSMethod('RemoveScene', {
    //             sceneName: scene.sceneName
    //         });
    // });

    // removeScenes = await Promise.all(removeScenes);

    // if (!defaultFlag) 
    
    await runOBSMethod('CreateScene', {
        sceneName: 'default'
    });

    //DONE: Create Game Scene
    await runOBSMethod('CreateScene', {
        sceneName: 'game'
    });

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

    //TODO: add scorecard input to game scene
    await generateScoreCardSource();

    //TODO: write 0-0 scorecard to HTML file
    await writeScoreCard({
        homeTeam: 'waterloo',
        awayTeam: 'laurier',
        homeTeamScore: 0,
        awayTeamScore: 0,
    });

    //DONE: create substitution scene
    //DONE: add input to substitution scene
    await generateSubsSource();

    //DONE: create foul scene
    //DONE: add input to foul scene
    await generateFoulSource();

    //DONE: create offside scene
    //DONE: add input to offside scene
    await generateOffsideSource();

    //DONE: create yellow card scene
    //DONE: add input to yellow card scene
    await generateYellowCardSource();

    //DONE: create red card scene
    //DONE: add input to red card scene
    await generateRedCardSource();

    //DONE: create penalty scene
    //DONE: add input to penalty scene
    await generatePenaltySource();

    //DONE: create goal scene
    //DONE: add input to goal scene
    await generateGoalSource();

    //DONE: create stats scene
    //DONE: add input to stats scene
    await generateStatsSource();

    //TODO: startStream:true dispatch Redux

    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'game'
    });

    //DONE: startstream OBS call
    await runOBSMethod('StartStream');

    // window.electron.ipcRenderer.once('ipc-example', (arg) => {
    //     console.log(arg);
    // });

    //TODO: disable startStream btn
};

export const stopStream = async () => {
    event.preventDefault();

    //DONE: delete non-default inputs
    await runOBSMethod('StopStream');

    //TODO: startStream:true dispatch Redux

    //DONE: delete non-default inputs
    // let inputList = await runOBSMethod('GetInputList');

    // let results = inputList?.inputs.map((input) =>
    //     runOBSMethod('RemoveInput', {
    //         inputName: input.inputName
    //     })
    // )
    // results = await Promise.all(results);



    //DONE: delete non-default scene
    //DONE: OBS disconnect
    runOBSMethod('GetSceneList')
        .then((res) =>
            res?.scenes.map((scene) => {
                if (scene.sceneName !== 'default')
                    runOBSMethod('RemoveScene', {
                        sceneName: scene.sceneName
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
    await writeStats(null);

    //DONE: refresh stats input
    await runOBSMethod('PressInputPropertiesButton', {
        inputName: 'statscard',
        propertyName: 'refreshnocache',
    });
    //DONE: switch to stats scene
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'stats'
    });
    //DONE: sleep(3000)
    await sleep(3000);
    // DONE: switch back to game
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'game'
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
    //DONE: switch to subs scene
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'substitution'
    });
    //DONE: sleep(3000)
    await sleep(3000);
    // DONE: switch back to game
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'game'
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
    //DONE: switch to redcard scene
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'redcard'
    });
    //DONE: sleep(3000)
    await sleep(3000);
    // DONE: switch back to game
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'game'
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
    //DONE: switch to subs scene
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'yellowcard'
    });
    //DONE: sleep(3000)
    await sleep(3000);
    // DONE: switch back to game
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'game'
    });
};

export const showFoul = async () => {
    //TODO: fetch foul
    //DONE: switch to foul scene
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'foul'
    });
    //DONE: sleep(3000)
    await sleep(3000);
    // DONE: switch back to game
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'game'
    });
};

export const showPenalty = async () => {
    //TODO: fetch penalty
    //DONE: switch to penalty scene
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'penalty'
    });
    //DONE: sleep(3000)
    await sleep(3000);
    // DONE: switch back to game
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'game'
    });
};

export const showOffside = async () => {
    //TODO: fetch offside
    //DONE: switch to offside scene
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'offside'
    });
    //DONE: sleep(3000)
    await sleep(3000);
    // DONE: switch back to game
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'game'
    });
};

export const showGoal = async (args) => {
    //TODO: fetch goal
    //TODO: write to scorecard file
    await writeScoreCard(args);

    //DONE: switch to goal scene
    await runOBSMethod('SetCurrentProgramScene', {
        sceneName: 'goal'
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
        sceneName: 'game'
    });

    //TODO: redux goal updates
};

export const showShot = async () => {
    //TODO: fetch shot
};

export const deleteGoal = async () => {
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
    //TODO: fetch game ended?
    //TODO: Timer UI stops => 90:09 to FT
    //if(startStreaming redux true){
    //TODO: timer.html stopped -> FT, refresh OBS
    //TODO: disable all buttons (except stream)
    //else{
    //TODO: Redirect to dashboard
};