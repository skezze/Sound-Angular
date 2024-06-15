// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Configuration } from '../../configuration/configuration';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = Configuration.authUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { email, password }).pipe(
      tap((response) => {
        this.cookieService.set('auth_token', response.accessToken);
      }),
      catchError(this.handleError<any>('login'))
    );
  }
  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, { email, password }).pipe(
      tap(
      catchError(this.handleError<any>('register'))
    ));
  }

  logout(): void {
    this.cookieService.delete('auth_token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('auth_token');
  }

  getToken(): string | null {
    return this.cookieService.get('auth_token');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
