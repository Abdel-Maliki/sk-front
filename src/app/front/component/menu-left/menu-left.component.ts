import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {MenuItem} from '../../classe/menu-item';
import {MenuCategory} from '../../classe/menu-category';
import {MenuLeftItems} from '../../../../constantes/menu-left-items';

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

  menuItems: MenuCategory[] = MenuLeftItems;
  @Input() active = true;

  activeSubmenus: { [key: string]: boolean } = {};
  activeSubSubmenus: { [key: string]: boolean } = {};
  activeSubSubSubmenus: { [key: string]: boolean } = {};

  constructor(private router: Router) {
  }

  ngOnInit(): void {
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
}
