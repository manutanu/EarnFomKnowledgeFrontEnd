import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, ActivatedRoute, Routes, Router } from '@angular/router';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { MatDialogRef } from '@angular/material';
import { ModalService } from '../modal.service';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formGroupArray:FormGroup[] = [];
  index;
  isEditable=false;

  constructor(public modalservice:ModalService ,public activateRoutes:ActivatedRoute  , public routes:Router ,public _formBuilder:FormBuilder ) {
    // dialogRef.close('closed from quiz component');
    console.log((modalservice.dialogRef === undefined )?"yess":"NO");

    if(modalservice.dialogRef != undefined){

      modalservice.dialogRef.close();

    // tslint:disable-next-line: curly
    }else

    // routes.navigate(['']);
    console.log(activateRoutes.params['value']['quizid']);

  }

  ngOnInit() {
    for(let i=0;i<3;i++){
      // tslint:disable-next-line: prefer-const
      let tempFormgroup=new FormGroup({
        // tslint:disable-next-line: object-literal-key-quotes
        'name':new FormControl('')

      });
      this.formGroupArray.push(tempFormgroup);
    }
  }

  processResults(){

    // tslint:disable-next-line: whitespace
    for(let i=0;i<3;i++){
      console.log(this.formGroupArray[i].value['name']);
    }

  }

}
