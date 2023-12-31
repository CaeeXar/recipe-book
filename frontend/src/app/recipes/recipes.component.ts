import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Recipe } from '../types/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  inputSearch = '';
  cols!: number;
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  loading = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.initColumns();
    this.getRecipes();
  }

  initColumns() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        map((result) => {
          if (result.breakpoints[Breakpoints.XSmall]) return 1;
          if (result.breakpoints[Breakpoints.Small]) return 2;
          if (result.breakpoints[Breakpoints.Medium]) return 3;
          if (result.breakpoints[Breakpoints.Large]) return 4;
          if (result.breakpoints[Breakpoints.XLarge]) return 5;

          return 6;
        })
      )
      .subscribe((cols) => {
        this.cols = cols;
      });
  }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      this.recipes = this.recipes.map((card) =>
        card.description.length > 200
          ? { ...card, description: card.description.substring(0, 225) + '...' }
          : card
      );
      this.filteredRecipes = this.recipes;
      this.loading = false;
    });
  }

  addRecipes(): void {}

  onSearch(): void {
    if (this.inputSearch.length < 3) {
      this.filteredRecipes = this.recipes;
      return;
    }

    this.filteredRecipes = this.recipes.filter((recipe: Recipe) => {
      return Object.values(recipe)
        .join(' ')
        .toLowerCase()
        .includes(this.inputSearch.toLowerCase());
    });
  }
}
