import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { LoginPayload } from 'src/app/components/login-form/login-form.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);
  authUser$ = this._authUser$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(payload: LoginPayload): void {
    const url = `${environment.baseUrl}/users?email=${payload.email}&password=${payload.password}`;
    this.httpClient.get<User[]>(url).subscribe({
      next: (response) => {
        if (!response.length) {
          alert('Usuario o contraseña inválido')
        } else {
          const authUser = response[0];
          this._authUser$.next(authUser);
          localStorage.setItem('token', authUser.token);
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
          this._authUser$.next(authUser);
          localStorage.setItem('token', authUser.token);
          return true;
        }
      })
    );
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  };
}
