import runOBSMethod, { obs } from '../Obs';

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
  runOBSMethod('StartStream');
};

export const stopStream = async () => {
  event.preventDefault();
  runOBSMethod('StopStream')
    .then(() => obs.disconnect().catch((e) => console.log(e)))
    .catch((e) => console.log(e));
};

export const showStats = async() => {};

export const showSubs = async() => {};


export const showRedCard = async() => {};


export const showYellowCard = async() => {};


export const showFoul = async() => {};


export const showPenalty = async() => {};

