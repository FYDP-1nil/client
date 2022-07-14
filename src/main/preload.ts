import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import path from 'path';
export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    sendSync(channel: Channels, args: unknown[]) {
      return ipcRenderer.sendSync(channel, args);
    },
    invoke(channel:Channels,args: unknown[]){
      return ipcRenderer.invoke(channel, args);
    }
  },
  path: {
    join(...paths: string[]){
     return path.join(...paths);
    }
  }
});
