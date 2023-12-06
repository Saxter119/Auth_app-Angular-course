import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { enviroments } from 'src/environment/environments';
import { CheckLoginResponse, LoginResponse, User } from '../interfaces/index'
import { AuthStatus } from '../enums/auth-status.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = enviroments.baseUrl
  
  private httpClient = inject(HttpClient)
  
  private _currentUser = signal<User | null>(null)
  
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)
  
  public currentUser = computed(() => this._currentUser())
  public authStatus = computed(() => this._authStatus())

  
  constructor() {
    this.checkAuthStatus().subscribe()
  }

  
  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`

    const body = { email, password }

    return this.httpClient.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(error => throwError(() => error.error.message))
      )
  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/check-token`

    const token = localStorage.getItem('token')

    if (!token) return of(false)

    const headers = new HttpHeaders()
                    .set('Authorization', `Bearer ${token}`)

    return this.httpClient.get<CheckLoginResponse>(url, {headers})
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError((error) => {
          this._authStatus.set(AuthStatus.notAuthenticated),
          console.log(error)
          return of(false)
        })
      )
  }

  private setAuthentication(user: User, token: string): boolean {

    this._currentUser.set(user),
      this._authStatus.set(AuthStatus.authenticated),
      localStorage.setItem('token', token);

    return true
  }

}
