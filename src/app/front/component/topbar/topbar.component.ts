import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {animate, AnimationEvent, style, transition, trigger} from '@angular/animations';
import {AuthenficationProvider} from '../../classe/authenfication-provider';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  animations: [
    trigger('overlayMenuAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'scaleY(0.8)'}),
        animate('.12s cubic-bezier(0, 0, 0.2, 1)', style({opacity: 1, transform: '*'})),
      ]),
      transition(':leave', [
        animate('.1s linear', style({opacity: 0}))
      ])
    ])
  ],
})
export class TopbarComponent implements OnInit, OnDestroy {

  @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

  @ViewChild('topbarMenu') topbarMenu: ElementRef;

  activeMenuIndex: number;

  @Input() active = true;

  text: string;

  results: string[];

  outsideClickListener: any;

  theme = 'arya-blue';

  blue = 'saga-blue';
  purple = 'arya-blue';

  constructor(private router: Router, protected authenficationProvider: AuthenficationProvider) {
  }

  ngOnInit(): void {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeMenuIndex = null;
      }
    });
  }

  logout(): void {
    this.authenficationProvider.getEnvService().logout();
  }

  onMenuButtonClick(event: Event): void {
    this.active = !this.active;
    this.menuButtonClick.emit();
    event.preventDefault();
  }

  ngOnDestroy(): void {

  }

  search(event): void {
    this.results = ['TOTO', 'TATA', 'TITI', 'TANAN'];
  }

  changeTheme(event: Event): void {
    const themeElement = document.getElementById('theme-link');
    themeElement.setAttribute('href', themeElement.getAttribute('href')
      .replace(this.theme, this.theme === this.blue ? this.purple : this.blue));
    this.theme = this.theme === this.blue ? this.purple : this.blue;
    event.preventDefault();
  }

  toggleMenu(event: Event, index: number): void {
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
    event.preventDefault();
  }

  isOutsideTopbarMenuClicked(event): boolean {
    return !(this.topbarMenu.nativeElement.isSameNode(event.target) || this.topbarMenu.nativeElement.contains(event.target));
  }

  onOverlayMenuEnter(event: AnimationEvent): void {
    switch (event.toState) {
      case 'visible':
        this.bindOutsideClickListener();
        break;

      case 'void':
        this.unbindOutsideClickListener();
        break;
    }
  }

  bindOutsideClickListener(): void {
    if (!this.outsideClickListener) {
      this.outsideClickListener = (event) => {
        if (this.isOutsideTopbarMenuClicked(event)) {
          this.activeMenuIndex = null;
        }
      };

      document.addEventListener('click', this.outsideClickListener);
    }
  }

  unbindOutsideClickListener(): void {
    if (this.outsideClickListener) {
      document.removeEventListener('click', this.outsideClickListener);
      this.outsideClickListener = null;
    }
  }
}
