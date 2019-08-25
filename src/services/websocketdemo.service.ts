import { Injectable, OnDestroy } from "@angular/core";
import * as Stomp from "stompjs";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { debug } from "util";
declare var SockJS;

@Injectable({
  providedIn: "root"
})
export class WebsocketdemoService implements OnDestroy {

  messagetobeshown: Subject<string> = new Subject<string>();
  webSocketEndPoint: string = "http://localhost:8080/my-chat-websocket";
  topic: string = "/topic/questions";
  stompClient: any;


  _connect(username) {

    sessionStorage.setItem("username", username);
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;

    _this.stompClient.connect(

      { username: username },

      function (frame) {

        _this.stompClient.subscribe(_this.topic, function (sdkEvent) {

          console.log(sdkEvent);
          // debugger;
          _this.onMessageReceived(sdkEvent);

        });
        //_this.stompClient.reconnect_delay = 2000;

      },

      this.errorCallBack

    );

  }

  _disconnect() {

    if (this.stompClient !== null) {

      this.stompClient.unsubscribe(sessionStorage.getItem("username"), {});
      this.stompClient.disconnect();

    }

    console.log("Disconnected");

  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {

    console.log("errorCallBack -> " + error);

    setTimeout(() => {

      this._connect(sessionStorage.getItem("username"));
    }, 5000);

  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message) {

    console.log("calling logout api via web socket");

    this.stompClient.send("/topic/questions",
      { username: sessionStorage.getItem("username") },
      message
    );

  }

  onMessageReceived(message) {

    // debugger;
    console.log("Message Recieved from  " + message.body.toString());
    this.messagetobeshown.next(message.body);
    // this.handleMessage(JSON.stringify(message.body));

  }

  ngOnDestroy(): void { }

}
