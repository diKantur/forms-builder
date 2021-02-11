import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  hide = true;
  destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
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
      this.authService
        .login(val.email, val.password)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.authService.logIn(true);
          this.router.navigateByUrl('/');
        });
    }
  }

  register(): void {
    const val = this.loginForm.value;

    if (val.email && val.password) {
      this.authService
        .register(val.email, val.password)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.router.navigateByUrl('/');
        });
    }
  }
}
