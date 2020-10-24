import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/**
 * @author abdel-maliki
 * Date : 22/09/2020
 */

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
  public isLoading = new BehaviorSubject(false);
  constructor() { }
}
