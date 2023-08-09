export type Ingredient = {
  name: string;
  amount: number | string;
};

export type Recipe = {
  id: number;
  title: string;
  ingredients: Ingredient[];
  description: string;
  image?: string;
};
