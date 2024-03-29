import runOBSMethod, { obs } from "../Obs";

export const getAssetPath = () => (
    window.electron.ipcRenderer.sendSync('get-assets-dir')
);

export const pathJoin = (...args) => (
    window.electron.path.join(...args)
);

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const writeToFile = async (args) => (
    window.electron.ipcRenderer.invoke('write-file',args).then(async(result) => {
        await runOBSMethod('PressInputPropertiesButton',{inputName:args.inputName,propertyName:'refreshnocache'});
      })
);