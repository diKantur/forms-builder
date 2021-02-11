import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { shareReplay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const URL = 'http://127.0.0.1:4201';
@Injectable()
export class AuthService {
  isLogged = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<object> {
    return this.http.post(URL + '/signin', { email, password }).pipe(
      tap((res) => this.setSession(res)),
      shareReplay()
    );
  }

  register(email, password): Observable<object> {
    return this.http.post(URL + '/signup', { email, password });
  }

  private setSession(authResult): void {
    const expiresAt = moment().add(2, 'hours');

    localStorage.setItem('id_token', authResult.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
  public logIn(isLoggedIn): void {
    if (isLoggedIn) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): moment.Moment {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
