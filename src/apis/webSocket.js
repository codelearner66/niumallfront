import Cookies from "js-cookie";

let websocket = null;
//是否真正建立连接
let lockReconnect = false
//40秒一次心跳
let timeout = 40 * 1000
//心跳心跳倒计时
let timeoutObj = null
//心跳倒计时
let serverTimeoutObj = null
//断开 重连倒计时
let timeoutnum = null
export const webSocket = () => {
    return initWebSocket();
}

function initWebSocket() {
    if ('WebSocket' in window) {
        let item = localStorage.getItem('token');
        let token = Cookies.get("token");
        let temp = String(token).length !== String(item).length ? token : item;
        if (temp.length !== 0) {
            let webUrl = 'ws://localhost:8081/socket/api/messageService/' + temp;
            websocket = new WebSocket(webUrl);
            // 连接错误
            websocket.onerror = setErrorMessage
            // 连接成功
            websocket.onopen = setOnopenMessage
            // 收到消息的回调
            websocket.onmessage = onMessage
            // 连接关闭的回调
            websocket.onclose = setOncloseMessage
            // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            window.onbeforeunload = onbeforeunload
        } else {
            this.$message({
                type: "error",
                message: "请先登录"
            })
        }
    } else {
        alert('当前浏览器不支持WebSocket!!!')
    }
    return websocket;
}

function setErrorMessage() {
    window.console.log('WebSocket连接发生错误，状态码：' + websocket.readyState)
    reconnect();
    return websocket.readyState;
}

function setOnopenMessage() {
    window.console.log('WebSocket连接成功，状态码：' + websocket.readyState)
    //开启心跳
    start();
    return websocket.readyState;
}

const onMessage = e => {
    // console.log(e.data)
    if (e.data != 'pong') {
        window.dispatchEvent(new CustomEvent("onMessage", {
            detail: {
                data: e.data
            }
        }))

    } else reset();
}

function setOncloseMessage() {
    window.console.log('WebSocket连接关闭，状态码：' + websocket.readyState)
    return websocket.readyState;
}

function onbeforeunload() {
    websocket.close()
}

//重新连接
function reconnect() {
    if (lockReconnect) {
        return;
    }
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    timeoutnum && clearTimeout(timeoutnum);
    timeoutnum = setTimeout(function () {
        //新连接
        websocket = null;
        websocket = initWebSocket();
        lockReconnect = false;
    }, 5000);
}

//重置心跳 清除时间
function reset() {
    clearTimeout(timeoutObj);
    clearTimeout(serverTimeoutObj);
    //重启心跳
    start();
}

function start() {
    //开启心跳
    timeoutObj && clearTimeout(timeoutObj);
    serverTimeoutObj && clearTimeout(serverTimeoutObj);
    timeoutObj = setTimeout(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息
        if (websocket.readyState === 1) {
            //如果连接正常
            websocket.send(JSON.stringify({
                ping: "ping"
            }));
            return;
        } else {
            //否则重连
            reconnect();
        }
        serverTimeoutObj = setTimeout(function () {
            //超时关闭
            websocket.close();
        }, 20000);
    }, timeout);
}