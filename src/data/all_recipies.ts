import { createResource } from "solid-js";
import { Dish } from "../types/dish";



export const [recipeData, { refetch }]: any = createResource(async () => (await (fetch("/api/recipies/all"))).json())