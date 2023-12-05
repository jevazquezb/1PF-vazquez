import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { LoginPayload } from 'src/app/components/login-form/login-form.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private _authUser$ = new BehaviorSubject<User | null>(null);
  // authUser$ = this._authUser$.asObservable();
  authUser$ = this.store.select(selectAuthUser);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store
  ) { }

  handleAuthUser(authUser: User): void {
    // this._authUser$.next(authUser);
    this.store.dispatch(AuthActions.setAuthUser({ data: authUser }))
    localStorage.setItem('token', authUser.token);    
  }

  login(payload: LoginPayload): void {
    const url = `${environment.baseUrl}/users?email=${payload.email}&password=${payload.password}`;
    this.httpClient.get<User[]>(url).subscribe({
      next: (response) => {
        if (!response.length) {
          alert('Usuario o contraseña inválido')
        } else {
          const authUser = response[0];
          this.handleAuthUser(authUser);
          this.router.navigate(['home']);
        }
      },
      error: (err) => {
        alert('Error de conexión');
      }
    });
  }

  verifyToken(): Observable<boolean> {
    const getToken = localStorage.getItem('token');
    const url = `${environment.baseUrl}/users?token=${getToken}`;

    return this.httpClient.get<User[]>(url). pipe(
      map((users) => {
        if (!users.length) {
          return false;
        } else {
          const authUser = users[0];
          this.handleAuthUser(authUser);
          return true;
        }
      })
    );
  }

  logout(): void {
    // this._authUser$.next(null);
    this.store.dispatch(AuthActions.resetState());
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  };
}
