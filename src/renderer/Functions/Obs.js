import OBSWebSocket from 'obs-websocket-js';

export const obs = new OBSWebSocket();


export default async function runOBSMethod(method, param = {}) {
  return obs
    .call(method, param)
    .catch((err) => console.log(err, 'NO SOURCES'));
}

obs.on('error', err => {
  console.error('Socket error:', err);
});