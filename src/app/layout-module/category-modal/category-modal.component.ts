import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RouterLink, Router } from "@angular/router";
import { startWith, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { SessionModel, QuizRequestModel } from 'src/app/models/response.model';
import { HttpClient } from '@angular/common/http';
import { SnackbarService } from 'src/app/snackbar.service';
import { environment } from 'src/environments/environment';



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
  options: string[] = [];
  filteroption: Observable<string[]>;
  selectedCategory:string;
  selectedLeague:number;
  quizid:number;


  constructor(

    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,private http:HttpClient,
    private snackbarservice:SnackbarService
    ) {

      this.selectedCategory=data.catname;

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

    let requestModel:QuizRequestModel;
    this.selectedLeague=index+1;
    console.log(this.selectedLeague);
    console.log(this.formGroupArray[index]);
    let opponentname=this.formGroupArray[index].value["opponentName"];
    console.log(opponentname);

    //call rest api to generate quiz and then send the quiz id to quizComponent
    if(opponentname === null || opponentname === undefined || opponentname===""){
      //call snackbar for messages
      this.snackbarservice.openSnackBarError("choose the opponent Please !","close");
    }else{
      //call rest api for lodging quiz requests and generating quizes
        requestModel = new QuizRequestModel(this.usersession.username,opponentname,this.selectedCategory,this.selectedLeague);
        let obj = this.http.post(environment.urlstring+"/createQuiz",requestModel).pipe(map((data:number)=>{
        console.log(data);
        this.quizid = data;
        this.router.navigate(["layout", "quiz",this.quizid,this.usersession.username]);
      },error=>{

        console.log(error);

      })).subscribe();

    }

    // {
    //   "whosharedid":"Mj07yadav",
    //   "towhomesharedid":"stormbreaker",
    //   "category":"General Knowledge",
    //   "leagueid":1
    // }
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
