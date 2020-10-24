import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from '../../../common/service/loader-service';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  loading = false;
  loadingSubscription: Subscription;

  constructor(public loadingService: LoaderService) {
  }

  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.isLoading.pipe(
      debounceTime(200)
    ).subscribe((value: boolean) => {
      this.loading = value;
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

}

