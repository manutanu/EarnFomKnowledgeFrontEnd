import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RouterLink, Router } from "@angular/router";
import { startWith, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { SessionModel } from 'src/app/models/response.model';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: "app-category-modal",
  templateUrl: "./category-modal.component.html",
  styleUrls: ["./category-modal.component.css"]
})
export class CategoryModalComponent implements OnInit {

  formGroupArray: FormGroup[] = [];
  panelOpenState = false;
  newoptionslist: string[] = [];
  usernamesListtemp:string[]=[];
  usersession:SessionModel;

  // myControl = new FormControl();
  options: string[] = [];
  filteroption: Observable<string[]>;


  constructor(

    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,private http:HttpClient
    ) {

      for (let i = 0; i < 3; i++) {
      this.formGroupArray.push(
        new FormGroup({
          opponentName: new FormControl("")
        })
      );
    }


    //casting Usersession json to object to fetch current user object
    this.usersession = JSON.parse(sessionStorage.getItem("usersession"));

    //filtering the username list for creating options array and removed current username from the list
    this.usernamesListtemp = JSON.parse(sessionStorage.getItem("usernamesList"));
    for(let i=0;i<this.usernamesListtemp.length;i++){
      if(this.usernamesListtemp[i] != this.usersession.username)
        this.options.push(this.usernamesListtemp[i]);
    }


  }

  onSubmit(index) {

    console.log(index);
    console.log(this.formGroupArray[index]);
    console.log(this.formGroupArray[index].value["opponentName"]);
    // console.log(this.myControl.value);

    //call rest api to generate quiz and then send the quiz id to quizComponent


    this.router.navigate(["layout", "quiz", index]);
  }



  ngOnInit() {
    this.filteroption = this.formGroupArray[0].controls[
      "opponentName"
    ].valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    var sortedarray = this.options.sort();
    return sortedarray;
    //  .filter(option => option.toLowerCase().indexOf(filterValue) === 0)
  }
}
