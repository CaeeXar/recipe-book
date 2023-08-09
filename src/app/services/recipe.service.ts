import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../types/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
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

  getRecipes(): Observable<Recipe[]> {
    return of(this.recipes);
  }

  getRecipeById(id: number): Observable<Recipe> {
    const recipe =
      this.recipes.filter((recipe) => recipe.id === id)[0] || undefined;
    return of(recipe);
  }
}
