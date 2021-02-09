import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}

  getErrorMessage() {
    const val = this.loginForm.value;

    if (val.email.hasError('required')) {
      return 'You must enter a value';
    }

    return val.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const val = this.loginForm.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe(() => {
        this.authService.logIn(true);
        this.router.navigateByUrl('/');
      });
    }
  }

  register() {
    const val = this.loginForm.value;

    if (val.email && val.password) {
      this.authService.register(val.email, val.password).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }
  }
}
