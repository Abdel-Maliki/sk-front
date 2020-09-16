/**
 * @author abdel-maliki
 * Date : 30/08/2020
 */
import {MenuItem} from './menu-item';

export class MenuCategory {
  constructor(public title: string, public menuItems: MenuItem[]) {
  }
}
