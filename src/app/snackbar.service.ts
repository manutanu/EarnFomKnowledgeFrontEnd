import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar:MatSnackBar) { }


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
