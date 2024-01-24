window.widgetConfig.randomInteractionId = function(size){
    return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

window.widgetConfig.PERFTEST_INTERACTIONID = window.widgetConfig.randomInteractionId(16).toUpperCase();
window.widgetConfig.socket = null;

console.log(`RANDOM interactionId => ${window.widgetConfig.PERFTEST_INTERACTIONID}`);

window.widgetConfig.processEvent = function(event){
    switch (event.type) {
        case "connectionEstablished":{
            console.log('Connection established: ' + JSON.stringify(event));
            if (event.payload.status === "success" && event.payload.sender === "backend") {
                window.widgetConfig.socket?.emit("video", {
                    type: "createVideoRoom",
                    payload: {
                        sender: `${window.widgetConfig.PERFTEST_SENDER}`, 
                        interactionId: `${window.widgetConfig.PERFTEST_INTERACTIONID}`
                    },
                  });

                  window.postMessage(
                    {
                        "sender":"WIDGET",
                        "operation": "CONN-ESTABLISHED"
                    },"*");
              }
            break;
        }
        case "createVideoRoom":{
            console.log('Videoroom created: ' + JSON.stringify(event));
            if (event.payload.status === "success" && event.payload.sender === "backend") {
                console.log('Videoroom created: ' + event.payload.roomId);
                console.log('Videoroom username: ' + event.payload.username);
                console.log('Videoroom credential: ' + event.payload.credential);
                
                window.postMessage(
                    {
                        "sender":"WIDGET",
                        "operation": "ROOM-CREATED",
                        "data": {
                            "roomId": event.payload.roomId,
                            "username": `${event.payload.username}`,
                            "credential": `${event.payload.credential}`
                        }
                    },"*");
            }
            break;
        }
    }
}

window.widgetConfig.stopVideo = function(){
    window.postMessage(
        {
            "data": {
                "action":"STOP",
                "sender":"PAGE"
            }
        },"*");
}

window.widgetConfig.startVideo = function(roomId, username, credential){
    //{"sender":"WIDGET","action":"DATA","data":"{\"videoActionType\":\"VIDEO_ROOM_CREATED\",\"roomId\":8722711016310724}"}
    var dataPayload = JSON.stringify({"videoActionType":"VIDEO_ROOM_CREATED","roomId": roomId, "credential": `${credential}`, "username": `${username}`});
    window.postMessage(
        {"data": {
            "action":"DATA",
            "sender":"PAGE",
            "data": `${dataPayload}`
        }},"*");

    //CALL integration bridge
    //{\"contentType\":\"callClient\",\"content\":{\"interactionId\":\"0421FE35E78BJ09G\",\"roomId\":66589228182021,\"username\":\"1706007272:user-1\",\"credential\":\"TXgjOuZGm2i/9piEWSyU0cVGtDo=\",\"videoInitiatedByClient\":true},\"isVisible\":false}
    //{
    //  "contentType": "callClient",
    //  "content":{
        //  "interactionId":"042405U55MHJR0CY",
        //  "roomId":8722711016310724, 
        //  "username": "AAA", 
        //  "credential": "BBB", 
        //  "videoInitiatedByClient": false
        //}, 
    //  "isVisible":false
    //}
}

window.widgetConfig.startWidget = function(interactionId){
    window.widgetConfig.PERFTEST_INTERACTIONID = interactionId;

    window.postMessage(
        {"data": {
            "videoId":`${window.widgetConfig.PERFTEST_INTERACTIONID}`,
            "action":"START",
            "videoViewType":"EMBEDDED",
            "sender":"PAGE",
            "participantId":"1",
            "chatId":`${window.widgetConfig.PERFTEST_INTERACTIONID}`,
            "viewType":0,
            "viewTypeStr":"ACTIVE",
            "attributes":{
              "WDG_CAMERA_PERMISSION":"granted",
              "WDG_MICROPHONE_PERMISSION":"granted"
            }
          }},"*");
}

window.widgetConfig.startSocketIO = function(){

    if (window.widgetConfig.socket != null)
        return;

    window.widgetConfig.socket = io(`${window.widgetConfig.PERFTEST_SOCKET_URL}`,
        {
            transports: ["websocket"],
            query: { sender: `${window.widgetConfig.PERFTEST_SENDER}`, interactionId: `${window.widgetConfig.PERFTEST_INTERACTIONID}` }
        }
    );

    window.widgetConfig.socket.emit("video", {
        type: "connectionEstablished",
        payload: {
            sender: `${window.widgetConfig.PERFTEST_SENDER}`, 
            interactionId: `${window.widgetConfig.PERFTEST_INTERACTIONID}`
        }
      });

    window.widgetConfig.socket.on("video", (event) => {
        window.widgetConfig.processEvent(event);
    });
    
    window.widgetConfig.socket.on("error", (event) => {
        console.log('Connection error: ' + JSON.stringify(event));
    });
    
    window.widgetConfig.socket.on("message", (event) => {
        console.log('Message received: ' + JSON.stringify(event));
    });
    
    window.widgetConfig.socket.on("disconnect", (reason) => {
        console.log('Connection lost: ' + JSON.stringify(event));
    });

    window.widgetConfig.socket.on("connect", () => {
        console.log('SOCKET.IO myId: ' +window.widgetConfig.socket.id);
      });
}


window.chrome.webview = window.chrome.webview || {
    callbacks : [],
    postMessage : function(message){
      window.postMessage(message);
    },
    addEventListener : function(eventName, listener) {
      if (eventName in window.chrome.webview.callbacks)
        window.chrome.webview.callbacks[eventName].push(listener);
      else
        window.chrome.webview.callbacks[eventName] = [listener];
    },
    executeEventListener : function(eventName, payload){
      for (var i=0, len = window.chrome.webview.callbacks[eventName].length; i<len; i++)
        window.chrome.webview.callbacks[eventName][i](payload);
    }
  }

window.addEventListener(
    "message",
    (event) => {
        console.log("--- POST MESSAGE ---");
        console.log(event.data);
        console.log("--------------------");
        if (event.data?.sender !== "WIDGET"){
            window.chrome.webview.executeEventListener("message",event.data);
        } else if (event.data?.action === "DATA" && event.data?.data !== ""){
            var dataFromWindget = JSON.parse(event.data.data);
            if (dataFromWindget.videoActionType === "SET_VIDEO_ID")
                window.widgetConfig.startSocketIO();
        }
    },
    false,
  );
