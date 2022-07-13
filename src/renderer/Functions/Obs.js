// const OBSWebSocket = require('obs-websocket-js');

// export const obs = new OBSWebSocket();
import OBSWebSocket from 'obs-websocket-js';

export const obs = new OBSWebSocket();


// const {default: OBSWebSocket} = require('obs-websocket-js');
// const OBSWebSocket = require('obs-websocket-js').default;

// export const obs = new OBSWebSocket();


// export default async function a() {
//   console.log('a');
// //   obs.on("ConnectionOpened", () => {
// //     console.log("Connection Opened");

// //     // Send some requests.
// //     // obs.sendCallback("GetSceneList", {}, (err, data) => {
// //     //   console.log("Using callbacks:", err, data);
// //     // });

// //     // obs.send("GetSceneList").then((data) => {
// //     //   console.log("Using promises:", data);
// //     // });
// //   });

// //   obs.on("SwitchScenes", (data) => {
// //     console.log("SwitchScenes", data);
// //   });


// //   obs.on('ConnectionClosed', (data) => console.log(data,'closedfamxs'));

// //   obs.on("SwitchScenes", (data) => {
// //     console.log("SwitchScenes", data);
// //   });

// //   obs.send("SetCurrentScene", { "scene-name": 'Test iram' });


//   // obs.on('ConnectionOpened', () => {
//     // obs.send('GetSceneList').then(data => {
//     //   const sceneListDiv = document.getElementById('scene_list');

//     //   data.scenes.forEach(scene => {
//         // const sceneElement = document.createElement('button');
//         // sceneElement.textContent = scene.name;
//         // sceneElement.onclick = function() {
//           // Math.random()
//           let scene = Math.round(Math.random()) ? 'Scene' : 'Scene2';
//           obs.send('SetCurrentScene', {
//             'scene-name': scene
//           });

//         //   obs.send('RefreshBrowserSource',{sourceName:'TEST'})
//         // };

//         // sceneListDiv.appendChild(sceneElement);
//     //   });
//     // })
//   // });

// //   const data = await obs.send("GetSceneList");

// //   for (const scene of data.scenes) {
// //     const button = document.createElement("button");
// //     button.innerText = scene.name;
// //     button.addEventListener("click", () => {
// //       obs.send("SetCurrentScene", { "scene-name": scene });
// //     });
// //     document.body.appendChild(button);
// //   }
// //   obs.disconnect();

// }

// export async function test2() {
//   console.log('test2');
//     //   obs.on("ConnectionOpened", () => {
//     //     console.log("Connection Opened");

//     //     // Send some requests.
//     //     // obs.sendCallback("GetSceneList", {}, (err, data) => {
//     //     //   console.log("Using callbacks:", err, data);
//     //     // });

//     //     // obs.send("GetSceneList").then((data) => {
//     //     //   console.log("Using promises:", data);
//     //     // });
//     //   });

//     //   obs.on("SwitchScenes", (data) => {
//     //     console.log("SwitchScenes", data);
//     //   });


//     //   obs.on('ConnectionClosed', (data) => console.log(data,'closedfamxs'));

//     //   obs.on("SwitchScenes", (data) => {
//     //     console.log("SwitchScenes", data);
//     //   });

//     //   obs.send("SetCurrentScene", { "scene-name": 'Test iram' });


//       // obs.connect();

//       // obs.on('ConnectionOpened', () => {
//         // obs.send('GetSceneList').then(data => {
//         //   const sceneListDiv = document.getElementById('scene_list');

//         //   data.scenes.forEach(scene => {
//             // const sceneElement = document.createElement('button');
//             // sceneElement.textContent = scene.name;
//             // sceneElement.onclick = function() {
//             //   obs.send('SetCurrentScene', {
//             //     'scene-name': 'Scene'
//             //   });
//             obs.send("GetSourcesList").then((data) => {
//           console.log("Using promises:", data);
//         });
//       // });

//               obs.send('RefreshBrowserSource',{sourceName:'TEST'});
//               obs.send('GetBrowserSourceProperties',{source:'TEST'}).then(data=>console.log(data));
//             // };

//             obs.send('SetBrowserSourceProperties',{source:'TEST',render:true}).then(data=>console.log(data)).catch(()=>console.log('NO SOURCES'));

//             // sceneListDiv.appendChild(sceneElement);
//         //   });
//         // })
//       // });

//     //   const data = await obs.send("GetSceneList");

//     //   for (const scene of data.scenes) {
//     //     const button = document.createElement("button");
//     //     button.innerText = scene.name;
//     //     button.addEventListener("click", () => {
//     //       obs.send("SetCurrentScene", { "scene-name": scene });
//     //     });
//     //     document.body.appendChild(button);
//     //   }
//     //   obs.disconnect();

//     }

export default async function runOBSMethod(method, param = {}) {
  return obs
    .call(method, param)
    .catch((err) => console.log(err, 'NO SOURCES'));
}

obs.on('error', err => {
  console.error('Socket error:', err);
});