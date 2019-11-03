import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SignUpInfo} from './model/sigup-info';
import {AuthLoginInfo} from './model/login-info';
import {JwtResponse} from './model/jwt-response';
import {environment} from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {TokenStorageService} from './token-storage.service';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();

  private URL = environment.backendUrl + '/api/auth/';

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.URL + 'signin', credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.URL + 'signup', info, httpOptions);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.tokenStorage.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }
}
