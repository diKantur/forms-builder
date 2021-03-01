import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { LoginAction, RegisterAction } from '../core/store/core.actions';
import { AuthService } from '../services/auth.service';
import { AuthErrorType, InputType } from '../shared/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  destroy$ = new Subject<void>();
  errorValue: string = null;
  type = InputType;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private store: Store
  ) {}

  getErrorMessage(): string {
    const val = this.loginForm.value;

    if (val.email.hasError('required')) {
      return (this.errorValue = AuthErrorType.required);
    }

    this.errorValue = val.email.hasError(this.type.email)
      ? AuthErrorType.email
      : '';
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(): void {
    const val = this.loginForm.value;

    if (val.email && val.password) {
      this.store.dispatch(new LoginAction(val));
    }
  }

  register(): void {
    const val = this.loginForm.value;

    if (val.email && val.password) {
      this.store.dispatch(new RegisterAction(val));
    }
  }
}
