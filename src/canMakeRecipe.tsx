import { availibleIngredients } from "./data/availibleIngredients";
import { Dish } from "./types/dish";

export function canMakeRecipe(recipe: Dish): boolean {
  const requiredIngredients = recipe.ingredients;
  return Object.entries(requiredIngredients).every(([ingredient, quantity]) => {
    return availibleIngredients[ingredient] >= quantity;
  });
}
export function canMakePercentage(recipe: Dish): number {
  console.log(recipe)
  console.count("canMakePercentage");
  const requiredIngredients = recipe.ingredients;
  const percentage_map_per_ingredient: { [key: string]: number; } = {};
  console.log({requiredIngredients})
  Object.entries(requiredIngredients).forEach(([ingredient, quantity]) => {
    percentage_map_per_ingredient[ingredient] = Math.min(availibleIngredients[ingredient] || 0, quantity) / quantity;
  });

  console.log({percentage_map_per_ingredient})

  const values = Object.values(percentage_map_per_ingredient);
  const rv = (values.reduce((acc, val) => acc + val, 0) / values.length) || 0;

  console.log({ canMakePercentage:rv})
  return rv * 100;
}
