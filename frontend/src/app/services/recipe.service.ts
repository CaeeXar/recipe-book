import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Recipe } from '../types/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // apiUrl = process.env['NG_APP_API'];
  apiUrl = 'http://localhost:4201/api';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(this.apiUrl + '/recipes')
      .pipe(catchError(this.handleError<Recipe[]>('', [])));
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http
      .get<Recipe>(this.apiUrl + '/recipes/' + id)
      .pipe(catchError(this.handleError<Recipe>('', undefined)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error);

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
