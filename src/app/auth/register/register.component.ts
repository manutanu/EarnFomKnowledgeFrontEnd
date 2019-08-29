import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { RegistrationModel } from 'src/app/models/response.model';
import { LoadingscreenService } from 'src/services/loadingscreen.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm:FormGroup;
  registrationModel:RegistrationModel ;
  registerresponse;
  registerflag;
  errormessageFlagusername;
  errormessageFlaguseremail;
  errormessageFlagemailnotfound;


  constructor(private http:HttpClient,private router:Router,private loadingScreenService:LoadingscreenService,private _snackBar:MatSnackBar
    ) {
    this.signupForm = new FormGroup({
      username:new FormControl(''),
      password:new FormControl(''),
      email:new FormControl(''),
      repassword:new FormControl(''),
      completeName:new FormControl('')
    });

  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.signupForm);
    this.loadingScreenService.startLoading();
    //create model to send registration data
    if(this.signupForm.value["password"] === this.signupForm.value["repassword"] && this.signupForm.value["username"] != '' && this.signupForm.value["username"]!= undefined){

      this.registrationModel=new RegistrationModel(this.signupForm.value["username"],this.signupForm.value["password"],this.signupForm.value["email"],this.signupForm.value["completeName"]);

    }

  let obs= this.http.post(environment.urlstring+"/register", this.registrationModel);
      obs.subscribe(data => {

          this.registerresponse=data;
          if(this.registerresponse.status.length>0){
            if(this.registerresponse.status === 'SUCCESS'){
            this.registerflag=true;
            this.router.navigate(['/login']);
            }else if(this.registerresponse.status === 'Username'){
              this.openSnackBar("This Username is already occupied !","close");
            }else if(this.registerresponse.status === 'Useremail'){
              this.openSnackBar("This email is already occupied !","close");
            }else if(this.registerresponse.status === 'ADDRESS'){
              this.openSnackBar("This address is not a valid email address !","close");
            }
          }
          this.loadingScreenService.stopLoading();
      },
      error => {
          window.alert("Sorry you are not in our family ");
          this.loadingScreenService.stopLoading();
      }
      );
  }

  openSnackBar(message: string,action:string) {
    this._snackBar.open(message, action, {
      duration: 10000,
      panelClass: ['snack-bar-error']
    });
  }

}
