export interface Ingredient {
  name: string;
  amount: number | string;
}

export interface Recipe {
  id: number;
  title: string;
  ingredients: Ingredient[];
  description: string;
  image?: string;
}
