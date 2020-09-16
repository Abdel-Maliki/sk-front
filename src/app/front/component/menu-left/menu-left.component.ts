import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {MenuItem} from '../../classe/menu-item';
import {MenuCategory} from '../../classe/menu-category';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss'],
  animations: [
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden',
        opacity: 0,
      })),
      state('visible', style({
        height: '*',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
    trigger('mmmmmm', [
      state('hidden', style({
        transform: 'rotate(180deg)'
      })),
      state('visible', style({
        transform: 'rotate(0deg)'
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ])
  ]
})
export class MenuLeftComponent implements OnInit {

  menuItems: MenuCategory[] = [
    new MenuCategory('categorie 1',
      [
        new MenuItem('item1', '#', 'fa fa-arrows'),
        new MenuItem('item2', '#', 'fa fa-car'),
        new MenuItem('item3', '#', 'fa fa-cude'),
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
          new MenuItem('sub item3', '#', 'fa fa-folder-o' , [
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
  @Input() active = true;

  activeSubmenus: { [key: string]: boolean } = {};
  activeSubSubmenus: { [key: string]: boolean } = {};
  activeSubSubSubmenus: { [key: string]: boolean } = {};

  constructor(private router: Router) {
  }

  toggleSubmenu(event: Event, name: string): void {
    this.activeSubmenus = {[name]: !this.activeSubmenus[name]};
    event.preventDefault();
  }

  toggleSubSubmenu(event: Event, name: string): void {
    this.activeSubSubmenus = {[name]: !this.activeSubSubmenus[name]};
    event.preventDefault();
  }

  toggleSubSubSubmenu(event: Event, name: string): void {
    this.activeSubSubSubmenus = {[name]: !this.activeSubSubSubmenus[name]};
    event.preventDefault();
  }

  isSubmenuActive(name: string): boolean {
    if (this.activeSubmenus.hasOwnProperty(name)) {
      return this.activeSubmenus[name];
    } else if (this.router.isActive(name, false)) {
      this.activeSubmenus[name] = true;
      return true;
    }

    return false;
  }

  isSubSubmenuActive(parentName: string, name: string): boolean {
    if (!this.isSubmenuActive(parentName)) { return false; }
    if (this.activeSubSubmenus.hasOwnProperty(name)) {
      return this.activeSubSubmenus[name];
    } else if (this.router.isActive(name, false)) {
      this.activeSubSubmenus[name] = true;
      return true;
    }

    return false;
  }

  isSubSubSubmenuActive(parentparentName: string, parentName: string, name: string): boolean {
    if (!this.isSubSubmenuActive(parentparentName, parentName)) { return false; }
    if (this.activeSubSubSubmenus.hasOwnProperty(name)) {
      return this.activeSubSubSubmenus[name];
    } else if (this.router.isActive(name, false)) {
      this.activeSubSubSubmenus[name] = true;
      return true;
    }

    return false;
  }



  ngOnInit(): void {
  }

}
