function viewRecipe(id) {
    const viewed_recipes = localStorage.getItem("viewed_recipes") || "[]";
    const recipes = JSON.parse(viewed_recipes);
    recipes.push(id);
    localStorage.setItem("viewed_recipes", JSON.stringify(recipes));
}