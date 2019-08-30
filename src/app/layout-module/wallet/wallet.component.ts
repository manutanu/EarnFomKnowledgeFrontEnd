import { Component, OnInit } from '@angular/core';
import { SessionModel } from 'src/app/models/response.model';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  sessionModel:SessionModel;

  constructor() {
    this.sessionModel= JSON.parse(sessionStorage.getItem("usersession"));
   }

  ngOnInit() {
  }

}
