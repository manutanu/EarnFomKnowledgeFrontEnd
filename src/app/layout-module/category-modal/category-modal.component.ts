import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {

  formGroupArray:FormGroup[]=[];
  panelOpenState = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , public router:Router) {

    for(let i=0; i<3 ; i++ ){

      this.formGroupArray.push(new FormGroup({
          opponentName:new FormControl('')
      }));

    }

  }

  ngOnInit() {
  }

  onSubmit(index,){
    console.log(index);
    console.log(this.formGroupArray[index]);
    this.router.navigate(['layout','quiz',index]);
  }
}
