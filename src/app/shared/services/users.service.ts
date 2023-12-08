import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) { }

  getUsers$(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.baseUrl}/users`)
  }

  createUser$(user: User): Observable<User[]> {
    return this.httpClient
      .post<User>(`${environment.baseUrl}/users`, user)
      .pipe(concatMap(() => this.getUsers$()));
  }

  editUser$(editedUser: User): Observable<User[]> {
    return this.httpClient
      .put<User>(`${environment.baseUrl}/users/${editedUser.id}`, editedUser)
      .pipe(concatMap(() => this.getUsers$()));
  }

  removeUser$(userId: number): Observable<User[]> {
    return this.httpClient
      .delete<Object>(`${environment.baseUrl}/users/${userId}`)
      .pipe(concatMap(() => this.getUsers$()));
  }
}
