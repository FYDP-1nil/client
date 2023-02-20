//CLOSED NOT WORKING ON IT

// import runOBSMethod, { obs } from "../Obs";

// export const slideDown = async () => {
//     // Execute a transition sequence to a different scene with a specific transition.
    
// // filterEnabled: true
// // filterIndex: 0
// // filterKind: "crop_filter"
// // filterName: "Crop/Pad"
// // filterSettings:
// //     bottom: 100
// //     cx: 424
// //     cy: 195
// //     left: 0
// //     relative: false
// //     top: -184

    
//     const transitions = [];
//     for(let i=0;i<=196;i=i+4){
//         transitions.push({
//             requestType:'SetSourceFilterSettings',
//             requestData: {
//                 sourceName:'test',
//                 filterName:'Crop/Pad',
//                 filterSettings: {
//                     bottom: 0,
//                     cx: 424,
//                     cy: 195,
//                     left: 0,
//                     relative: false,
//                     top: parseInt(i)*-1
//                 }
//             }
//         })
//     }
//     const results = await obs.callBatch(transitions)
  
// };

// // export const slideUp = async (args) => (
// //     // Execute a transition sequence to a different scene with a specific transition.
// //     const transitions = [];
// //     for(let i=0;i<)
// //     const results = await obs.callBatch([
// //     {
// //       requestType: 'GetVersion',
// //     },
// //     {
// //       requestType: 'SetCurrentPreviewScene',
// //       requestData: {sceneName: 'Scene 5'},
// //     },
// //     {
// //       requestType: 'SetCurrentSceneTransition',
// //       requestData: {transitionName: 'Fade'},
// //     },
// //     {
// //       requestType: 'Sleep',
// //       requestData: {sleepMillis: 100},
// //     },
// //     {
// //       requestType: 'TriggerStudioModeTransition',
// //     }
// //   ])
  
// // );