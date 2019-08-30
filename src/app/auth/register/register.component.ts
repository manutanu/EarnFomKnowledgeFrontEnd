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

      //intializing already present values
      sessionStorage.setItem("usersession",null);
      sessionStorage.setItem("verified","false");
      sessionStorage.setItem("usernamesList",null);

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
            this.openSnackBarSuccess("Verification Mail has been sent on your email address Please verify your account !","close");
            this.router.navigate(['/login']);
            }else if(this.registerresponse.status === 'Username'){
              this.openSnackBarError("This Username is already occupied !","close");
            }else if(this.registerresponse.status === 'Useremail'){
              this.openSnackBarError("This email is already occupied !","close");
            }else if(this.registerresponse.status === 'ADDRESS'){
              this.openSnackBarError("Email Can't be sent at the moment Please try again later !","close");
            }else if(this.registerresponse.status === 'PARSE'){
              this.openSnackBarError("This address is not a valid email address !","close");
            }else if(this.registerresponse.status === 'ERROR'){
              this.openSnackBarError("Something went wrong on our side ! dont worry we will be back soon ","close");
            }
          }
          this.loadingScreenService.stopLoading();
      },
      error => {
          this.openSnackBarError("Something went wrong on our side ! dont worry we will be back soon ","close");
          this.loadingScreenService.stopLoading();
      }
      );
  }

  //for error messages snackbar
  openSnackBarError(message: string,action:string) {
    this._snackBar.open(message, action, {
      duration: 10000,
      panelClass: ['snack-bar-error']
    });
  }

  //for success messages snackbar
  openSnackBarSuccess(message: string,action:string) {
    this._snackBar.open(message, action, {
      duration: 10000,
      panelClass: ['snack-bar-success']
    });
  }

}
