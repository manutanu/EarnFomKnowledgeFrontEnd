import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { responseModel, errorResponse } from './models/response.model';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

}
