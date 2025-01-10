import { availibleIngredients } from "../data/availibleIngredients";
import { addToast } from "../lightning/toast";

/**
 * Component that displays the list of ingredients with their quantities
 * @returns JSX.Element
 */
export default function AvailibleIngredientsList(): JSX.Element {
    let inputRef: HTMLInputElement | undefined;
    return (
        <>
        <ul class="ingredients-list">
            {Object.entries(availibleIngredients).map(([ingredient, quantity]) => (
                <li key={ingredient} class="ingredient-item">
                    <span class="ingredient-name">{ingredient}</span>
                    <span class="ingredient-quantity">
                        (have: {availibleIngredients[ingredient] || 0})
                        <button
                            class="decrease-btn"
                            onclick={() => {
                                availibleIngredients[ingredient] -= 1;
                            }}
                        >
                            -
                        </button>
                        <button
                            class="increase-btn"
                            onclick={() => {
                                availibleIngredients[ingredient] += 1;
                            }}
                        >
                            +
                        </button>
                    </span>
                </li>
            ))}
        </ul>
        <form>
            <label for="new-ingredient">
                Add new ingredient:
                <input
                    ref={inputRef}
                    type="text"
                    id="new-ingredient"
                    name="new-ingredient"
                />
            </label>
            <button onclick={(e) => {
                e.preventDefault();
                if (!inputRef?.value) return;
                if (availibleIngredients[inputRef!.value]) {
                    addToast("error", `already have ${inputRef!.value}`);
                    return;
                }
                availibleIngredients[inputRef!.value] = 0; 
                inputRef!.value = "";
            }}>Add</button>
        </form>
        </>
    );
}

