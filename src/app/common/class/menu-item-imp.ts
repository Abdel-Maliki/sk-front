/**
 * @author abdel-maliki
 * Date : 12/09/2020
 */
import {MenuItem} from 'primeng/api/menuitem';
import {QueryParamsHandling} from '@angular/router';
import {Observable} from 'rxjs';

export class MenuItemImp implements MenuItem {
  public label: string;

  constructor(label?: Promise<string> | Observable<string> | string,
              public icon?: string,
              public command?: (event?: any) => void,
              url?: string,
              public items?: MenuItem[],
              public expanded?: boolean,
              public disabled?: boolean,
              public visible?: boolean,
              public target?: string,
              public routerLinkActiveOptions?: any,
              public separator?: boolean,
              public badge?: string,
              public badgeStyleClass?: string,
              public style?: any,
              public styleClass?: string,
              public title?: string,
              public id?: string,
              public automationId?: any,
              public tabindex?: string,
              public routerLink?: any,
              public queryParams?: {
                [k: string]: any,
              },
              public fragment?: string,
              public queryParamsHandling?: QueryParamsHandling,
              public preserveFragment?: boolean,
              public skipLocationChange?: boolean,
              public replaceUrl?: boolean,
              public state?: {
                [k: string]: any;
              }) {
    label instanceof Promise
      ? label.then(value => this.label = value)
      : label instanceof Observable
      ? label.subscribe(value => this.label = value)
      : this.label = label;
  }
}
