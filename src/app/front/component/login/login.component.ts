import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ServiceUtils} from '../../../common/service/service-utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private serviceUtils: ServiceUtils,
    private route: ActivatedRoute,
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

    this.serviceUtils.authenficationProvider.getEnvService().login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: async () => {
          await this.serviceUtils.authenficationProvider.getEnvService().loadCurrentUserDatas().toPromise().then();
          this.serviceUtils.userConfigurationService.password = this.f.password.value;
          this.serviceUtils.userConfigurationService.passwordStateService.setStateToValid();
          this.serviceUtils.router
            .navigateByUrl(this.route.snapshot.queryParams.returnUrl ? this.route.snapshot.queryParams.returnUrl : '/').then();
        },
        error: (error: HttpErrorResponse) => {
          this.serviceUtils.notificationService.showError(error.error.message).then();
        }
      });
  }
}
