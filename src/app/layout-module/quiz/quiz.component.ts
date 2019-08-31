import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import {
  RouterLinkActive,
  ActivatedRoute,
  Routes,
  Router
} from "@angular/router";
import { MatDialogRef, MatStepper } from "@angular/material";
import { ModalService } from "../modal.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { interval } from "rxjs/internal/observable/interval";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit,OnDestroy {

  formGroupArray: FormGroup[] = [];
  index;
  isEditable = false;
  countervariable = '0';
  sourceobservable = interval(1000);
  subscribe;
  quizid:number;
  quizplayername:string;

  @ViewChild("stepper", { static: true }) stepperGlobal: MatStepper;


  constructor(public modalservice: ModalService,public activateRoutes: ActivatedRoute,public routes: Router,
    public _formBuilder: FormBuilder)
    {

    if (modalservice.dialogRef != undefined) {

      modalservice.dialogRef.close();

    }

    // routes.navigate(['']);
    console.log(activateRoutes.params["value"]["quizid"]+"  ss  "+activateRoutes.params["value"]["username"]);
    this.quizid=activateRoutes.params["value"]["quizid"];
    this.quizplayername = activateRoutes.params["value"]["username"];
    this.subscribeToTimer();
  }

  ngOnInit() {

    for (let i = 0; i < 10; i++) {
      // tslint:disable-next-line: prefer-const
      let tempFormgroup = new FormGroup({
        // tslint:disable-next-line: object-literal-key-quotes
        name: new FormControl("")
      });
      this.formGroupArray.push(tempFormgroup);
    }

    //important --> setInterval(this.moveStepperNext.bind(this), 1000);
  }

  subscribeToTimer(){

    this.subscribe = this.sourceobservable.subscribe(val => {
      this.countervariable =""+( val % 11);
      if (this.countervariable === "10") {
        // this.countervariable=0;
        this.moveStepperNext();
        if (this.stepperGlobal.selectedIndex === 10) {
          this.subscribe.unsubscribe();
          this.countervariable="END";
          this.processResults();
        }
      }
    });

  }

  unsubscribeToTimer(){
    this.subscribe.unsubscribe();
  }

  ngOnDestroy(): void {
    console.log("destroyed in seconds ");
    this.subscribe.unsubscribe();
  }


  processResults() {

    // tslint:disable-next-line: whitespace
    for (let i = 0; i < 10; i++) {
      console.log(this.formGroupArray[i].value["name"]);

      if (this.formGroupArray[i].value["name"] === "") console.log("herer");
    }

    this.routes.navigate(['layout','activity']);
  }

  moveStepperNext() {

    console.log("here inside the next stepper method");
    console.log(this.stepperGlobal.selectedIndex);
    this.stepperGlobal.next();
    this.countervariable = "0";
    this.unsubscribeToTimer();
    this.subscribeToTimer();

  }
}
