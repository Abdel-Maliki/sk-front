import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilRoleComponent } from './profil-role.component';

describe('ProfilRoleComponent', () => {
  let component: ProfilRoleComponent;
  let fixture: ComponentFixture<ProfilRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
