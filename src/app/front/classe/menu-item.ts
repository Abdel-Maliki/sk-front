/**
 * @author abdel-maliki
 * Date : 30/08/2020
 */

export class MenuItem {
  constructor(public title: string,
              public link?: string,
              public icon?: string,
              public menuItems?: MenuItem[],
              public id?: string,
  ) {
  }
}
