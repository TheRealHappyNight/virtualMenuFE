import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthLoginInfo} from '../model/login-info';
import {TokenStorageService} from '../token-storage.service';
import {AuthService} from '../auth.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(public authService: AuthService,
              private tokenStorage: TokenStorageService,
              private fb: FormBuilder,
              private router: Router,
              private injector: Injector,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
    this.loginFormGroup = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    this.loginInfo = new AuthLoginInfo(
      this.loginFormGroup.get('username').value,
      this.loginFormGroup.get('password').value
    );
    if (this.loginInfo.username === '' || this.loginInfo.password === '') {
      const notificationService = this.injector.get(NotificationService);
      notificationService.notify('Username or Password not filled!');
    } else {
      this.authenticate();
    }
  }

  private authenticate() {
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        localStorage.setItem('restaurantUUID', data.restaurantUUID);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.authService.isLoggedIn.emit(true);
        this.redirect();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.authService.isLoggedIn.emit(false);
        this.isLoginFailed = true;
        this.notificationService.notify('Wrong credentials');
      }
    );
  }

  redirect() {
    this.router.navigate(['/admin']);
  }

  get password() {
    return this.loginFormGroup.get('password');
  }

  get username() {
    return this.loginFormGroup.get('username');
  }
}
