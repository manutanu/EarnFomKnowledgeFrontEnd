import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RouterLink, Router } from "@angular/router";
import { startWith, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-category-modal",
  templateUrl: "./category-modal.component.html",
  styleUrls: ["./category-modal.component.css"]
})
export class CategoryModalComponent implements OnInit {
  formGroupArray: FormGroup[] = [];
  panelOpenState = false;
  newoptionslist: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router
  ) {
    for (let i = 0; i < 3; i++) {
      this.formGroupArray.push(
        new FormGroup({
          opponentName: new FormControl("")
        })
      );
    }
  }

  onSubmit(index) {
    console.log(index);
    console.log(this.formGroupArray[index]);
    console.log(this.formGroupArray[index].value["opponentName"]);
    // console.log(this.myControl.value);
    this.router.navigate(["layout", "quiz", index]);
  }

  // myControl = new FormControl();
  options: string[] = [
    "Mritunjay",
    "Tanuj",
    "Anuyuksha",
    "vivaan",
    "Megha",
    "shubhangi",
    "vaibhav"
  ];
  filteroption: Observable<string[]>;

  ngOnInit() {
    this.filteroption = this.formGroupArray[0].controls[
      "opponentName"
    ].valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    var sortedarray = this.options.sort();
    return sortedarray;
    //  .filter(option => option.toLowerCase().indexOf(filterValue) === 0)
  }
}
