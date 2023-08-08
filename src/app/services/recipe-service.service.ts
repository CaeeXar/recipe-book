import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeServiceService {
  recipes: Recipe[] = [
    {
      id: 1,
      title: 'Teriyaki',
      description: 'Lorem ipsum.',
      ingredients: [],
      image: undefined,
    },
    {
      id: 2,
      title: 'Pesto',
      description: 'Lorem ipsum.',
      ingredients: [],
      image: undefined,
    },
    {
      id: 3,
      title: 'Kaki',
      description: 'Lorem ipsum.',
      ingredients: [],
      image: undefined,
    },
    {
      id: 4,
      title: 'Deine Mutter',
      description: 'Lorem ipsum.',
      ingredients: [],
      image: undefined,
    },
    {
      id: 5,
      title: 'Schmeckt',
      description: 'Lorem ipsum.',
      ingredients: [],
      image: undefined,
    },
  ];

  constructor() {}

  getRecipes(empty?: boolean): Observable<Recipe[]> {
    if (empty) return of([]);

    return of(this.recipes);
  }
}
