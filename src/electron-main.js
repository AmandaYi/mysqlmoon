const Electron = require("electron")
const {
    app,
    BrowserWindow
} = Electron;
const Path = require('path');
const Url = require('url');
// 创建一个开发环境
const model = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
// 得到挂载的全局electron的url，
const ELECTRON_WATCHER_URL = process.env.ELECTRON_WATCHER_URL
// 创建moon
let MoonMainWindow = null;
function CreateWindow() {
    MoonMainWindow = new BrowserWindow({ width: 800, height: 600 });
    let startUrl = undefined
    switch (model) {
        case "development": {
            startUrl = ELECTRON_WATCHER_URL;
            break
        }
        case "production": {
            startUrl = Url.format({
                pathname: Path.join(__dirname, './../build/index.html'),
                protocol: 'file:',
                slashes: true
            });

            break
        }
        default: {
            console.log("你必须传入mode模式,model可以选的值是development和production");
            startUrl = ELECTRON_WATCHER_URL;
            break
        }
    }
    MoonMainWindow.loadURL(startUrl);

    // MoonMainWindow.webContents.openDevTools();
    MoonMainWindow.on('closed', function () {
        MoonMainWindow = null
    })
}

app.on('ready', CreateWindow);

app.on('window-all-closed', function () {

    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        CreateWindow()
    }
});