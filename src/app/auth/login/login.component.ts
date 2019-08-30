import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginModel, JwtResponse, SessionModel } from 'src/app/models/response.model';
import { Router } from '@angular/router';
import { LoadingscreenService } from 'src/services/loadingscreen.service';
import { MatSnackBar } from '@angular/material';
import { UserDetailService } from 'src/app/user-detail.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm:FormGroup;
  loginModel:LoginModel;
  jwtresponse:JwtResponse;
  flag;

  constructor(private http:HttpClient,private router:Router,private loadingScreenService:LoadingscreenService,private _snackBar:MatSnackBar,
    private userdetailService:UserDetailService) {
      sessionStorage.setItem("usersession",null);
      sessionStorage.setItem("verified","false");
      sessionStorage.setItem("usernamesList",null);
      this.loadingScreenService.stopLoading();

    this.signinForm = new FormGroup({
      username:new FormControl(''),
      password:new FormControl('')
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.signinForm);
    this.loadingScreenService.startLoading();
    if(this.signinForm.value["username"]==='' || this.signinForm.value["username"]=== undefined ||
    this.signinForm.value["password"]==='' || this.signinForm.value["password"]=== undefined){
      this.loadingScreenService.stopLoading();
      this.openSnackBarError("Please fill in Username and Password to Login !","close");
      return ;
    }

    this.loginModel=new LoginModel(this.signinForm.value["username"],this.signinForm.value["password"]);

    let obs= this.http.post<JwtResponse>(environment.urlstring+"/authenticate",this.loginModel);

    obs.subscribe(data => {

            this.jwtresponse=data;
            let sessionobject = new SessionModel(this.jwtresponse.jwttoken, this.jwtresponse.userid,this.signinForm.value["username"],this.jwtresponse.email,this.jwtresponse.completename,this.jwtresponse.wallet,this.jwtresponse.creationDate,this.jwtresponse.lose,this.jwtresponse.win);
            sessionStorage.setItem("usersession",JSON.stringify(sessionobject));
            console.log(JSON.stringify(sessionobject));
            sessionStorage.setItem("verified","true");
            this.loadingScreenService.stopLoading();
            this.openSnackBarSuccess("Welcome "+this.signinForm.value["username"]+" to KnowledgeApp !","close");
            this.userdetailService.fetchAllUsernames();
            this.router.navigate(['/layout']);

        },
        error => {
            // flag=false;
            // window.alert("Sorry you are not in our family or incorrect credentials ! ");
            this.openSnackBarError("Sorry it seems like you are not a Registered user !","close");
            this.loadingScreenService.stopLoading();
        }
        );
        this.loadingScreenService.stopLoading();
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
