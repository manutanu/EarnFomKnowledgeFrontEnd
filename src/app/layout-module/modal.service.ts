import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { CategoryModalComponent } from './category-modal/category-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  dialogRef:MatDialogRef<CategoryModalComponent>;

  constructor() { }

  // openThisModal(modalComponentName){

  //   console.log(modalComponentName);

  // }
}
