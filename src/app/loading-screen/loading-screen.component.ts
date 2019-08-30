import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoadingscreenService } from 'src/services/loadingscreen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit ,OnDestroy {


  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingscreenService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value:boolean) => {
      // console.log("here i am in the loading screen"+value);
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }


}
