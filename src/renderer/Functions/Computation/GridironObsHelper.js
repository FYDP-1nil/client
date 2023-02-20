import runOBSMethod, { obs } from '../Obs';
import { getAssetPath, pathJoin, sleep } from './utility';

export const generateScoreCardSource = async () => {
  await runOBSMethod('CreateInput', {
    sceneName: 'game',
    inputName: 'scorecard',
    inputKind: 'browser_source',
    inputSettings: {
      height: 195,
      is_local_file: true,
      local_file: pathJoin(
        getAssetPath(),
        '/browser_source/gridiron/scorecard.html'
      ),
      width: 424,
      css: '',
    },
  }).then((res) =>
    runOBSMethod('SetSceneItemTransform', {
      sceneName: 'game',
      sceneItemId: res?.sceneItemId,
      sceneItemTransform: {
        alignment: 5,
        boundsAlignment: 0,
        boundsHeight: 1.0,
        boundsType: 'OBS_BOUNDS_NONE',
        boundsWidth: 1.0,
        cropBottom: 0,
        cropLeft: 0,
        cropRight: 0,
        cropTop: 0,
        height: 195,
        positionX: 430,
        positionY: 512,
        rotation: 0,
        scaleX: 0.8479999899864197,
        scaleY: 0.8478260636329651,
        sourceHeight: 230,
        sourceWidth: 500,
        width: 424,
      },
    })
  );
};

export const generateScoreCardTimer = async () => {
  await runOBSMethod('CreateInput', {
    sceneName: 'game',
    inputName: 'scorecardtimer',
    inputKind: 'browser_source',
    inputSettings: {
      height: 90,
      is_local_file: true,
      local_file: pathJoin(
        getAssetPath(),
        '/browser_source/gridiron/scoretimer.html'
      ),
      width: 160,
      css: '',
    },
  }).then((res) =>
    runOBSMethod('SetSceneItemTransform', {
      sceneName: 'game',
      sceneItemId: res?.sceneItemId,
      sceneItemTransform: {
        alignment: 5,
        boundsAlignment: 0,
        boundsHeight: 1,
        boundsType: 'OBS_BOUNDS_NONE',
        boundsWidth: 1,
        cropBottom: 0,
        cropLeft: 0,
        cropRight: 0,
        cropTop: 0,
        height: 57,
        positionX: 553,
        positionY: 519,
        rotation: 0,
        scaleX: 0.6312500238418579,
        scaleY: 0.6333333253860474,
        sourceHeight: 90,
        sourceWidth: 160,
        width: 101,
      },
    }).then(()=>runOBSMethod('SetSceneItemIndex',{
        sceneName: 'game',
        sceneItemId: res?.sceneItemId,
        sceneItemIndex: 3
      }))
  );
};

export const generateFlagSource = async (scenes) => {
    await runOBSMethod('CreateInput', {
      sceneName: 'game',
      inputName: 'flag',
      inputKind: 'browser_source',
      inputSettings: {
        height: 195,
        is_local_file: true,
        local_file: pathJoin(
          getAssetPath(),
          '/browser_source/gridiron/flag.html'
        ),
        width: 424,
        css: '',
      },
      sceneItemEnabled: false
    }).then((res) =>
      runOBSMethod('SetSceneItemTransform', {
        sceneName: 'game',
        sceneItemId: res?.sceneItemId,
        sceneItemTransform: {
          alignment: 5,
          boundsAlignment: 0,
          boundsHeight: 1.0,
          boundsType: 'OBS_BOUNDS_NONE',
          boundsWidth: 1.0,
          cropBottom: 0,
          cropLeft: 0,
          cropRight: 0,
          cropTop: 0,
          height: 195,
          positionX: 430,
          positionY: 512,
          rotation: 0,
          scaleX: 0.8479999899864197,
          scaleY: 0.8478260636329651,
          sourceHeight: 230,
          sourceWidth: 500,
          width: 424,
        },
      })
    );
  };
  

export const generateKickSource = async (scenes) => {
  await runOBSMethod('CreateInput', {
    sceneName: 'game',
    inputName: 'kick',
    inputKind: 'browser_source',
    inputSettings: {
      height: 195,
      is_local_file: true,
      local_file: pathJoin(
        getAssetPath(),
        '/browser_source/gridiron/kick.html'
      ),
      width: 424,
      css: '',
    },
    sceneItemEnabled: false
  }).then((res) =>
    runOBSMethod('SetSceneItemTransform', {
      sceneName: 'game',
      sceneItemId: res?.sceneItemId,
      sceneItemTransform: {
        alignment: 5,
        boundsAlignment: 0,
        boundsHeight: 1.0,
        boundsType: 'OBS_BOUNDS_NONE',
        boundsWidth: 1.0,
        cropBottom: 0,
        cropLeft: 0,
        cropRight: 0,
        cropTop: 0,
        height: 195,
        positionX: 430,
        positionY: 512,
        rotation: 0,
        scaleX: 0.8479999899864197,
        scaleY: 0.8478260636329651,
        sourceHeight: 230,
        sourceWidth: 500,
        width: 424,
      },
    })
  );
};

export const generateStatsSource = async (scenes) => {
  if (scenes.find((e) => e.sceneName !== 'stats')) {
    await runOBSMethod('CreateScene', { sceneName: 'stats' });
  }

  await runOBSMethod('CreateInput', {
    sceneName: 'stats',
    inputName: 'statscard',
    inputKind: 'browser_source',
    inputSettings: {
      height: 720,
      is_local_file: true,
      local_file: pathJoin(
        getAssetPath(),
        '/browser_source/gridiron/stats.html'
      ),
      width: 1280,
      css: '',
    },
  }).then((data) => console.log(data));
};

export const generateSafetySource = async (scenes) => {
  await runOBSMethod('CreateInput', {
    sceneName: 'game',
    inputName: 'safety',
    inputKind: 'browser_source',
    inputSettings: {
      height: 195,
      is_local_file: true,
      local_file: pathJoin(
        getAssetPath(),
        '/browser_source/gridiron/safety.html'
      ),
      width: 424,
      css: '',
    },
    sceneItemEnabled: false
  }).then((res) =>
    runOBSMethod('SetSceneItemTransform', {
      sceneName: 'game',
      sceneItemId: res?.sceneItemId,
      sceneItemTransform: {
        alignment: 5,
        boundsAlignment: 0,
        boundsHeight: 1.0,
        boundsType: 'OBS_BOUNDS_NONE',
        boundsWidth: 1.0,
        cropBottom: 0,
        cropLeft: 0,
        cropRight: 0,
        cropTop: 0,
        height: 195,
        positionX: 430,
        positionY: 512,
        rotation: 0,
        scaleX: 0.8479999899864197,
        scaleY: 0.8478260636329651,
        sourceHeight: 230,
        sourceWidth: 500,
        width: 424,
      },
    })
  );
};

export const generateTDSource = async (scenes) => {
  await runOBSMethod('CreateInput', {
    sceneName: 'game',
    inputName: 'td',
    inputKind: 'browser_source',
    inputSettings: {
      height: 195,
      is_local_file: true,
      local_file: pathJoin(
        getAssetPath(),
        '/browser_source/gridiron/td.html'
      ),
      width: 424,
      css: '',
    },
    sceneItemEnabled: false
  }).then((res) =>
    runOBSMethod('SetSceneItemTransform', {
      sceneName: 'game',
      sceneItemId: res?.sceneItemId,
      sceneItemTransform: {
        alignment: 5,
        boundsAlignment: 0,
        boundsHeight: 1.0,
        boundsType: 'OBS_BOUNDS_NONE',
        boundsWidth: 1.0,
        cropBottom: 0,
        cropLeft: 0,
        cropRight: 0,
        cropTop: 0,
        height: 195,
        positionX: 430,
        positionY: 512,
        rotation: 0,
        scaleX: 0.8479999899864197,
        scaleY: 0.8478260636329651,
        sourceHeight: 230,
        sourceWidth: 500,
        width: 424,
      },
    })
  );
};

export const generateTimeoutSource = async (scenes) => {
  await runOBSMethod('CreateInput', {
    sceneName: 'game',
    inputName: 'timeout',
    inputKind: 'browser_source',
    inputSettings: {
      height: 195,
      is_local_file: true,
      local_file: pathJoin(
        getAssetPath(),
        '/browser_source/gridiron/timeout.html'
      ),
      width: 424,
      css: '',
    },
    sceneItemEnabled: false
  }).then((res) =>
    runOBSMethod('SetSceneItemTransform', {
      sceneName: 'game',
      sceneItemId: res?.sceneItemId,
      sceneItemTransform: {
        alignment: 5,
        boundsAlignment: 0,
        boundsHeight: 1.0,
        boundsType: 'OBS_BOUNDS_NONE',
        boundsWidth: 1.0,
        cropBottom: 0,
        cropLeft: 0,
        cropRight: 0,
        cropTop: 0,
        height: 195,
        positionX: 430,
        positionY: 512,
        rotation: 0,
        scaleX: 0.8479999899864197,
        scaleY: 0.8478260636329651,
        sourceHeight: 230,
        sourceWidth: 500,
        width: 424,
      },
    })
  );
};
