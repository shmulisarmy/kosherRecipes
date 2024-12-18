import { availibleIngredients } from "../data/availibleIngredients";



/**
 * Component that displays the list of ingredients with their quantities
 * @returns JSX.Element
 */
/**
 * Displays the list of ingredients with their quantities
 * @returns JSX.Element
 */
export default function AvailibleIngredientsList(): JSX.Element {
    return (
        <ul className="ingredients-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {Object.entries(availibleIngredients).map(([ingredient, quantity]) => (
                <li
                    key={ingredient}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}
                    className={`ingredient-item ${availibleIngredients[ingredient] >= quantity ? 'sufficient' : 'insufficient'}`}
                >
                    <span className="ingredient-name" style={{ marginRight: '1rem', fontWeight: 'bold' }}>{ingredient}</span>
                    <span className="ingredient-quantity">
                        (have: {availibleIngredients[ingredient] || 0})
                        <button
                            className="decrease-btn"
                            style={{
                                marginLeft: '0.5rem',
                                padding: '0.3rem 0.6rem',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                backgroundColor: '#f0f0f0',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                        >
                            -
                        </button>
                    </span>
                </li>
            ))}
        </ul>
    );
}

