const Net = require('net');
const EXEC = require('child_process').exec;
const PORT = process.env.PORT ? process.env.PORT : 3000
// 挂载全局electron的url，方便入口文件使用
process.env.ELECTRON_WATCHER_URL = `http://localhost:${PORT}`;
// 挂载全局启动方式
const model = process.env.NODE_ENV ? process.env.NODE_ENV : "development";


const directive = model == "development" ? "npm run serve:electron" : "npm run build:electron";
let MoonClient = undefined
if (model == "development") {

    MoonClient = new Net.Socket();
    MoonClient.on('error', (error) => {
        console.log("等待react启动中...")
        console.log(process.env.NODE_ENV)
   
        setTimeout(TryConnection, 1000);
    });
} else {

}

let startedElectron = false;
function TryConnection(event = null) {
    // 进行判断，如果是想要看react打包之后的生产环境之后的预览界面，
    // 那么就不需要监听react服务的端口了，直接进行静态react资源文件打包进electron里面就可以了
    if (model == "production") {
        EXEC("npm run build:electron");
    }else{
        // socket监听端口
        MoonClient.connect({ port: PORT }, () => {
            MoonClient.end();
            // 如果已经启动了electron之后就不要再运行启动了，不要重复其中多个
            if (!startedElectron) {
                startedElectron = true;
                EXEC(directive);
            }
        })
    }
}
TryConnection()
