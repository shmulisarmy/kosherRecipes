import { createSignal, Show } from "solid-js";
import { Dish } from './types/dish';
import { recipeData } from "./data/all_recipies";
import { availibleIngredients } from "./data/availibleIngredients";
import { canMakeRecipe, canMakePercentage } from "./canMakeRecipe";
import { recipies_making } from "./data/recipies_making";
import { add_to_planner } from "./statfullUtils.ts/add_to_planner";


interface RecipeItemProps {
  recipe: Dish;
}

function RecipeItem({ recipe }: RecipeItemProps) {
  const [isLiked, setIsLiked] = createSignal(recipe.is_liked === 1);
  const [isVisible, setIsVisible] = createSignal(false);
  const [showOptions, setShowOptions] = createSignal(false);

  const toggleLike = () => {
    setIsLiked(!isLiked());
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible());
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions());
  };

  let buttonRef: HTMLButtonElement | undefined;

  return (
    <div class="recipe-item">
      <div class="recipe-header">
        <h2>{recipe.name}</h2>
        <button class="info-btn" onClick={toggleOptions}>...</button>
        {showOptions() && (
          <div class="options-menu">
            <p>Option 1: Save Recipe</p>
            <p>Option 2: Share Recipe</p>
          </div>
        )}
      </div>

      {/* Recipe Image */}
      <img src={recipe.image_url} alt={recipe.name} class="recipe-image" />
      <div style={{color: canMakeRecipe(recipe) ? 'green' : 'red'}} class="can-make-display">

      <Show when={canMakeRecipe(recipe)} fallback={<p>Cannot make this recipe</p>}><p>Can make this recipe</p></Show>
      </div>
        <progress value={canMakePercentage(recipe)} max="100" style={{ "--progress-bar-color": canMakeRecipe(recipe) ? 'green' : 'red' }}>
          {Math.round(canMakePercentage(recipe))}%
        </progress>

        <div onMouseEnter={() => buttonRef!.style.display = 'inline'} class="planner">

          <p class="info">you have {recipies_making[recipe.name] || 0} of this recipe on your planner</p>
        <button ref={buttonRef} disabled={!canMakeRecipe(recipe)} onClick={() => add_to_planner(recipe)}>add to planner</button>
        </div>

      <p><strong>Time to make:</strong> {recipe.time_to_make} minutes</p>
        <button onClick={toggleLike}>
          {isLiked() ? "♡" : "♥"}
        </button>

      {/* Ingredients and Time to make */}
      <div class="recipe-details" style={{ display: isVisible() ? 'block' : 'none' }}>
        <p><strong>Ingredients:</strong></p>
        <Ingredients_display ingredients={recipe.ingredients} />
       
      </div>

      {/* Toggle visibility button */}
      <button class="toggle-visibility" onClick={toggleVisibility}>
        {isVisible() ? "Hide" : "Show"} Ingredients
      </button>
    </div>
  );
}

function Ingredients_display({ ingredients }: { ingredients: { [key: string]: number } }) {
  return (
    <ul class="ingredients-list">
      {Object.entries(ingredients).map(([ingredient, quantity]) => (
        <li style={{ color: availibleIngredients[ingredient] >= quantity ? 'green' : 'red' }}>
          {ingredient}: {quantity} 
          <span class="have-amount" style={{ color: 'black' }}>
            {" "}(have: {availibleIngredients[ingredient] || 0})
            </span>
        </li>
      ))}
    </ul>
  );
}


export function RecipeList() {
  return (
    <div class="recipe-list">
      {recipeData.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

