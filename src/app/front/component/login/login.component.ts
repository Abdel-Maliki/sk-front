import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../common/service/notification-service';
import {AuthenficationProvider} from '../../classe/authenfication-provider';
import {first} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenficationProvider: AuthenficationProvider,
    private alertService: NotificationService
  ) {
  }

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls as { username: AbstractControl, password: AbstractControl };
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.authenficationProvider.getEnvService().login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: async () => {
          await this.authenficationProvider.getEnvService().currentUserRoles().toPromise().then();
          this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl ? this.route.snapshot.queryParams.returnUrl : '/').then();
        },
        error: (error: HttpErrorResponse) => {
          // this.alertService.error(error);
          // this.loading = false;
          this.alertService.showError(error.error.message).then();
        }
      });
  }
}
