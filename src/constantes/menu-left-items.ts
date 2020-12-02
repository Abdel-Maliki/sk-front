import {MenuCategory} from '../app/front/classe/menu-category';
import {MenuItem} from '../app/front/classe/menu-item';


/**
 * @author abdel-maliki
 * Date : 02/12/2020
 */

export const MenuLeftItems: MenuCategory[] = [
  new MenuCategory('categorie 1',
    [
      new MenuItem('Utilisateurs', '/user-management/users/list', 'fa fa-arrows'),
      new MenuItem('Profiles', '/user-management/profils/list', 'fa fa-car'),
      new MenuItem('Logs', '/user-management/logs/list', 'fa fa-cubes'),
    ]),
  new MenuCategory('categorie 2',
    [
      new MenuItem('item3', '#', 'fa fa-deaf'),
      new MenuItem('item21', '#', 'fa fa-cubes', [
        new MenuItem('sub1 item1', '#', 'fa fa-fax'),
        new MenuItem('sub1 item2', '#', 'fa fa-cubes'),
        new MenuItem('sub1 item3', '#', 'fa fa-fire'),
      ]),
      new MenuItem('item22', '#', 'fa fa-film', [
        new MenuItem('sub item1', '#', 'fa fa-question'),
        new MenuItem('sub item2', '#', 'fa fa-filter', [
          new MenuItem('sub1 sub item1', '#', 'fa fa-plane'),
          new MenuItem('sub1 sub item2', '#', 'fa fa-random'),
          new MenuItem('sub1 sub item3', '#', 'fa fa-paw'),
        ]),
        new MenuItem('sub item3', '#', 'fa fa-folder-o', [
          new MenuItem('sub sub item1', '#', 'fa fa-photo'),
          new MenuItem('sub sub item2', '#', 'fa fa-cubes', [
            new MenuItem('sub sub sub1 item1', '#', 'fa fa-magic'),
            new MenuItem('sub sub sub1 item2', '#', 'fa fa-recycle'),
            new MenuItem('sub sub sub1 item3', '#', 'fa fa-cubes'),
          ]),
          new MenuItem('sub sub item3', '#', 'fa fa-history', [
            new MenuItem('sub sub sub2 item1', '#', 'fa fa-legal'),
            new MenuItem('sub sub sub2 item2', '#', 'fa fa-reoader'),
            new MenuItem('sub sub sub2 item3', '#', 'fa fa-print'),
          ]),
        ]),
      ]),
    ]),
];

