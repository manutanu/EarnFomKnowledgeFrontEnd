import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import { fader, stepper } from './route-animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionModel } from '../models/response.model';

/** @title Responsive sidenav */
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations:[
    // fader,
    // slider,
    // transformer,
    // stepper
  ]
})
export class LayoutComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  fillerNav:string[]=[];
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private router:Router,private _snackBar: MatSnackBar) {

    //check if the user is verified or not
    if(sessionStorage.getItem("verified")=== "false"){
      this.openSnackBar("You are not Authenticated Please login to Play !","close");
      this.router.navigate(['/login']);
    }

    this.fillerNav.push("Dashboard");
    this.fillerNav.push("Quiz");
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // document.querySelector('snav').toggleAttribute('snav');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  // }

  logout(){
    sessionStorage.setItem("usersession","");
    sessionStorage.setItem("verified","false");
    this.router.navigate(['/login']);
  }

  openSnackBar(message: string,action:string) {
    this._snackBar.open(message, action, {
      duration: 10000,
      panelClass: ['snack-bar-error']
    });
  }
}
