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
        '/browser_source/soccer/scorecard.html'
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

export const generateGoalSource = async () => {
  await runOBSMethod('CreateScene', { sceneName: 'goal' });

  await runOBSMethod('CreateInput', {
    sceneName: 'goal',
    inputName: 'goalcard',
    inputKind: 'browser_source',
    inputSettings: {
      height: 720,
      is_local_file: true,
      local_file: pathJoin(getAssetPath(), '/browser_source/soccer/goal.html'),
      width: 1280,
      css: '',
    },
  }).then((data) => console.log(data));
};

export const generateStatsSource = async () => {
  await runOBSMethod('CreateScene', { sceneName: 'stats' });

  await runOBSMethod('CreateInput', {
    sceneName: 'stats',
    inputName: 'statscard',
    inputKind: 'browser_source',
    inputSettings: {
      height: 720,
      is_local_file: true,
      local_file: pathJoin(getAssetPath(), '/browser_source/soccer/stats.html'),
      width: 1280,
      css: '',
    },
  }).then((data) => console.log(data));
};

export const generateSubsSource = async () => {
  await runOBSMethod('CreateScene', { sceneName: 'substitution' });

  await runOBSMethod('CreateInput', {
    sceneName: 'substitution',
    inputName: 'substitutioncard',
    inputKind: 'browser_source',
    inputSettings: {
      height: 720,
      is_local_file: true,
      local_file: pathJoin(
        getAssetPath(),
        '/browser_source/soccer/substitution.html'
      ),
      width: 1280,
      css: '',
    },
  }).then((data) => console.log(data));
};

export const generateRedCardSource = async () => {
  await runOBSMethod('CreateScene', { sceneName: 'redcard' });

  await runOBSMethod('CreateInput', {
    sceneName: 'redcard',
    inputName: 'redcardcard',
    inputKind: 'browser_source',
    inputSettings: {
      height: 720,
      is_local_file: true,
      local_file: pathJoin(
        getAssetPath(),
        '/browser_source/soccer/red_card.html'
      ),
      width: 1280,
      css: '',
    },
  }).then((data) => console.log(data));
};

export const generateYellowCardSource = async () => {
  await runOBSMethod('CreateScene', { sceneName: 'yellowcard' });

  await runOBSMethod('CreateInput', {
    sceneName: 'yellowcard',
    inputName: 'yellowcardcard',
    inputKind: 'browser_source',
    inputSettings: {
      height: 720,
      is_local_file: true,
      local_file: pathJoin(
        getAssetPath(),
        '/browser_source/soccer/yellow_card.html'
      ),
      width: 1280,
      css: '',
    },
  }).then((data) => console.log(data));
};

export const generateFoulSource = async () => {
  await runOBSMethod('CreateScene', { sceneName: 'foul' });

  await runOBSMethod('CreateInput', {
    sceneName: 'foul',
    inputName: 'foulcard',
    inputKind: 'browser_source',
    inputSettings: {
      height: 720,
      is_local_file: true,
      local_file: pathJoin(getAssetPath(), '/browser_source/soccer/foul.html'),
      width: 1280,
      css: '',
    },
  }).then((data) => console.log(data));
};

export const generatePenaltySource = async () => {
  await runOBSMethod('CreateScene', { sceneName: 'penalty' });

  await runOBSMethod('CreateInput', {
    sceneName: 'penalty',
    inputName: 'penaltycard',
    inputKind: 'browser_source',
    inputSettings: {
      height: 720,
      is_local_file: true,
      local_file: pathJoin(
        getAssetPath(),
        '/browser_source/soccer/penalty.html'
      ),
      width: 1280,
      css: '',
    },
  }).then((data) => console.log(data));
};

export const generateOffsideSource = async () => {
  await runOBSMethod('CreateScene', { sceneName: 'offside' });

  await runOBSMethod('CreateInput', {
    sceneName: 'offside',
    inputName: 'offsidecard',
    inputKind: 'browser_source',
    inputSettings: {
      height: 720,
      is_local_file: true,
      local_file: pathJoin(
        getAssetPath(),
        '/browser_source/soccer/offside.html'
      ),
      width: 1280,
      css: '',
    },
  }).then((data) => console.log(data));
};
