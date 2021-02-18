import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { LoginAction, RegisterAction } from '../core/store/core.actions';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  hide = true;
  destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private store: Store
  ) {}

  getErrorMessage(): string {
    const val = this.loginForm.value;

    if (val.email.hasError('required')) {
      return 'You must enter a value';
    }

    return val.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
