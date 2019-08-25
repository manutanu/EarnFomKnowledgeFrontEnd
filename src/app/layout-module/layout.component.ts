import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { fader, stepper } from './route-animations';

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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
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

}

