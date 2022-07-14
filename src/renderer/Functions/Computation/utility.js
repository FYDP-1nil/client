export const getAssetPath = () => (
    window.electron.ipcRenderer.sendSync('get-assets-dir')
);

export const pathJoin = (...args) => (
    window.electron.path.join(...args)
);

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const writeToFile = (args) => (
    window.electron.ipcRenderer.sendMessage('write-file',args)
);