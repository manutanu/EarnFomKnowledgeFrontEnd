import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  forgetForm:FormGroup;
  constructor() {
    this.forgetForm=new FormGroup({
      username:new FormControl(''),
      newpassword:new FormControl(''),
      repassword:new FormControl(''),
      email:new FormControl('')
    })

  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.forgetForm);
  }

}
