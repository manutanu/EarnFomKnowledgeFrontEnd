import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { WebsocketdemoService } from 'src/services/websocketdemo.service';


@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit{

  //form for sending message
  messageSendingfrmgrp:FormGroup;
  usernameSendingFrmGrp:FormGroup;
  subscriptiontosocket;
  messageString;

  ngOnInit(): void {

    this.socket.messagetobeshown.subscribe((data:string) =>{
      // debugger;
      this.messageString=data;
      console.log("here "+data);

    });

    this.usernameSendingFrmGrp=new FormGroup({

      'username':new FormControl(null)

    });

    this.messageSendingfrmgrp=new FormGroup({

      'message':new FormControl(null)

    });

  }


  disconnectSockeet(){

    this.socket._disconnect();

  }

  sendMessage(){

    console.log(JSON.stringify(this.messageSendingfrmgrp.value.message));
    let objects= {'key':'value'};
    objects=this.messageSendingfrmgrp.value;
    console.log(objects['message']);
    console.log(objects);
    this.socket._send(objects['message']);

  }

  sendUsername(){
    //form for sending usernames to the websocket backend application
    console.log(this.usernameSendingFrmGrp);
    let objects={'key':'value'};
    objects =this.usernameSendingFrmGrp.value;
    console.log(objects['username']);
    this.socket._connect(objects['username']);

  }

  constructor(private http: HttpClient,private socket:WebsocketdemoService) {}



  // sendOnClick() {
  //   this.http
  //     .get<responseModel>("http://localhost:8080/test/11", {
  //       reportProgress: true
  //     })
  //     .pipe(
  //       map((response: responseModel) => {
  //         console.log(" here ");
  //         let responseobject: responseModel = new responseModel();

  //         for (let key in response) {
  //           console.log(key + " " + response[key]);
  //           responseobject._message = response[key];
  //         }

  //         return responseobject;
  //       })
  //     )
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         console.log(
  //           data._message +
  //             " here i used the data filtered and formatted by pipe and map"
  //         );
  //       },
  //       error => {
  //         let errorinfo:errorResponse=new errorResponse();
  //         errorinfo._message=error.error.message;
  //         errorinfo._code=error.error.code;
  //         errorinfo._url=error.error.url;
  //         console.log(errorinfo);
  //       }
  //     );
  // }
}
