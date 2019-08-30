import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CategoryModalComponent } from "../category-modal/category-modal.component";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { ModalService } from '../modal.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/models/response.model';
import { LoadingscreenService } from 'src/services/loadingscreen.service';


export interface User {
  name: string;
}

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"]
})
export class ContentComponent implements OnInit {

  searchForm: FormGroup;
  myControl = new FormControl();
  categorytosearch:string;
  filteredOptions: Observable<User[]>;
  cardarray:String[]=[];
  categoryList:Category[]=[];
  categoryNameList:string[]=[];


  constructor(public dialog: MatDialog,public modalservice:ModalService,private http:HttpClient,private _snackBar:MatSnackBar,
    private loadingScreen:LoadingscreenService) {

    this.searchForm = new FormGroup({
      category: new FormControl("")
    });

    //calling rest api to get different categories for quiz application and converting data using pipe and map
    this.loadingScreen.startLoading();
    let obs= this.http.get(environment.urlstring+"/allcategories").pipe(map(data=>{

      for(let ii in data){

        for(let category in data[ii]){

            // console.log(category + "  "+data[ii][category] );
              let categoryObj:Category=data[ii][category];
              this.categoryList.push(categoryObj);
              this.categoryNameList.push(categoryObj.categoryName);

            }
        }

        this.loadingScreen.stopLoading();

      },error=>{

      this.loadingScreen.stopLoading();
      this.openSnackBarError("Something went Wrong Can't Load data right Now !","close");
      console.log(error);

    })).subscribe();

  }

  ngOnInit() {

  }

  // Method to open Modal
  openDialog() {

    const componentName = CategoryModalComponent;
    const dialogRefer = this.dialog.open(componentName);
    this.modalservice.dialogRef=dialogRefer;

    dialogRefer.afterClosed().subscribe(result => {
      // console.log(result);
    });

  }

  //method for searching Category
  onSubmit() {

    console.log(this.searchForm.value["category"]);
    console.log(this.searchForm);
    this.categorytosearch=this.searchForm.value["category"];

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






















      // this.cardarray.push("General Knowledge");
      // this.cardarray.push("Computer Science");
      // this.cardarray.push("Mathematics");
      // this.cardarray.push("Economics");
      // this.cardarray.push("FootBall");
      // this.cardarray.push("Video Games");
      // this.cardarray.push("Cricket");
      // this.cardarray.push("BasketBall");
      // this.cardarray.push("Table Tennis");
      // this.cardarray.push("Indian Politics");
      // this.cardarray.push("Reasoning");
      // this.cardarray.push("English");
      // this.cardarray.push("Geography");
      // this.cardarray.push("History");
      // this.cardarray.push("Morals");
      // this.cardarray.push("Hindi");
