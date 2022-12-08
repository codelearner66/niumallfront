let webUrl = 'ws://localhost:8081/socket/api/messageService/';
let websocket = null;
export const webSocket = () => {
    if ('WebSocket' in window) {
        if (localStorage.getItem('token') !== undefined) {
            webUrl = webUrl + localStorage.getItem('token');
            //console.log(webUrl);
            websocket = new WebSocket(webUrl);
            initWebSocket();
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

function initWebSocket() {
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
}

function setErrorMessage() {
    window.console.log('WebSocket连接发生错误，状态码：' + websocket.readyState)
    return websocket.readyState;
}

function setOnopenMessage() {
    window.console.log('WebSocket连接成功，状态码：' + websocket.readyState)
    return websocket.readyState;
}

function setOnmessageMessage(event) {
    // 根据服务器推送的消息做自己的业务处理
    window.console.log(event.data);
    return event.data;
}

const onMessage = e => {
    window.dispatchEvent(new CustomEvent("onMessage", {
        detail: {
            data: e.data
        }
    }))
}

function setOncloseMessage() {
    window.console.log('WebSocket连接关闭，状态码：' + websocket.readyState)
    return websocket.readyState;
}

function onbeforeunload() {
    closeWebSocket()
}

function closeWebSocket() {
    websocket.close()
}