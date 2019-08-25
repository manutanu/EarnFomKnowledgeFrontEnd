import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CategoryModalComponent } from "../category-modal/category-modal.component";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { ModalService } from '../modal.service';

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
  options: User[] = [{ name: "Mritunjay " }, { name: "Tanuj" }, { name: "IronMan" }];

  filteredOptions: Observable<User[]>;

  constructor(public dialog: MatDialog,public modalservice:ModalService) {
    this.searchForm = new FormGroup({
      category: new FormControl("")
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice()))
    );
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
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
    console.log(this.searchForm.value.category);
    console.log(this.searchForm);
  }
}
