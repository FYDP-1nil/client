import runOBSMethod, { obs } from '../Obs';
// import path from 'path';
import { getAssetPath, pathJoin, sleep } from './utility';

// export const goal = async() => (
// //  runOBSMethod()
// );

export const startStream = async () => {
  //fetch to get stream key
  //setup scenes
  //stats html file
  //subs html file
  //red card html file
  //yellow card html file
  //foul html file
  //penalty html file

  await obs.connect();
  //   let defaultFlag = false;
  //   await runOBSMethod('GetSceneList').then((res) => {
  //     console.log(res);
  //     res.scenes.map((scene) => {
  //       if (scene.sceneName === 'default') {
  //         defaultFlag = true;
  //       } else runOBSMethod('RemoveScene', { sceneName: scene.sceneName });
  //     });
  //   });
  //   if (!defaultFlag) await runOBSMethod('CreateScene', { sceneName: 'default' });
  //   runOBSMethod('GetSceneItemList',{sceneName:'game'}).then((res)=> );

  //   await runOBSMethod('CreateScene', { sceneName: 'game' });
    await runOBSMethod('CreateInput', {
      sceneName: 'game',
      inputName: 'score',
      inputKind: 'browser_source',
    });
  //   await runOBSMethod('SetCurrentProgramScene', { sceneName: 'game' });

  //   await runOBSMethod('GetSceneItemId', {
  //     sceneName: 'game',
  //     sourceName: 'Browser',
  //   }).then((res) =>
  //     runOBSMethod('SetSceneItemTransform', {
  //       sceneName: 'game',
  //       sceneItemId: res.sceneItemId,
  //       sceneItemTransform: {
  //         alignment: 5,
  //         boundsAlignment: 0,
  //         boundsHeight: 1.0,
  //         boundsType: 'OBS_BOUNDS_NONE',
  //         boundsWidth: 1.0,
  //         cropBottom: 0,
  //         cropLeft: 0,
  //         cropRight: 0,
  //         cropTop: 0,
  //         height: 195,
  //         positionX: 430,
  //         positionY: 512,
  //         rotation: 0,
  //         scaleX: 0.8479999899864197,
  //         scaleY: 0.8478260636329651,
  //         sourceHeight: 230,
  //         sourceWidth: 500,
  //         width: 424,
  //       },
  //     })
  //   );


  async function goalTransition() {
    await runOBSMethod('SetCurrentProgramScene', { sceneName: 'goal' });
    await sleep(2000);
    await runOBSMethod('SetCurrentProgramScene', { sceneName: 'game' });
  }

  goalTransition();

  await runOBSMethod('SetInputSettings', {
    inputName: 'score',
    inputSettings: {
      height: 720,
      is_local_file: true,
      local_file: pathJoin(getAssetPath(),'/browser_source/soccer/goal.html'),
      width: 1280,
    },
  }).then((data) => console.log(data));

  //   await runOBSMethod('StartStream');
};

export const stopStream = async () => {
    event.preventDefault();
    await runOBSMethod('StopStream');
    await runOBSMethod('GetInputList').then((res)=>
      res.inputs.map((input)=> runOBSMethod('RemoveInput',{inputName:input.inputName}))
    );
    await runOBSMethod('GetSceneList')
      .then((res) =>
        res.scenes.map((scene) => {
          if(scene.sceneName !== 'default') runOBSMethod('RemoveScene', { sceneName: scene.sceneName });
        })
      )
      .then(() => obs.disconnect().catch((e) => console.log(e)))
      .catch((e) => console.log(e));
};

export const showStats = async () => {};

export const showSubs = async () => {};

export const showRedCard = async () => {};

export const showYellowCard = async () => {};

export const showFoul = async () => {};

export const showPenalty = async () => {};
