import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { map, shareReplay, tap } from 'rxjs/operators';

let URL = 'http://127.0.0.1:4201';
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(URL + '/signin', { email, password }).pipe(
      tap((res) => this.setSession(res)),
      shareReplay()
    );
  }

  register(email, password) {
    return this.http.post(URL + '/signup', { email, password })
  }

  private setSession(authResult) {
    const expiresAt = moment().add(2, 'hours');

    localStorage.setItem('id_token', authResult.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
  isLogged = false;
  public logIn(isLoggedIn) {
    if (isLoggedIn) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
