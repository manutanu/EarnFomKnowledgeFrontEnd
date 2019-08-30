import { Component, OnInit } from '@angular/core';
import { SessionModel } from 'src/app/models/response.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  sessionModel:SessionModel;

  constructor() {
      this.sessionModel= JSON.parse(sessionStorage.getItem("usersession"));
   }

  ngOnInit() {
  }

}
