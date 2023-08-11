import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../types/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipeById(id).subscribe((recipe) => {
      this.recipe = recipe;
    });
  }
}
