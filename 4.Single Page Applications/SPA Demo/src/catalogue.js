// get data from REST service;
// parse and display each recipe;

import { get } from "./api.js";
import { showDetailsView } from "./details.js";

document.getElementById('recipe-list').addEventListener("click", openRecipe)
const section = document.getElementById("catalog-view");
section.remove();

let ctx = null;
export async function showCatalogueView(Inctx) {
    ctx = Inctx;
    ctx.render(section)
    displayRecipes([]);
    
    const recipes = await getAllRecipes();

    displayRecipes(recipes);

}

async function getAllRecipes() {
    const recipes = await get('/data/recipes?select=' + encodeURIComponent('_id,name'))
    return recipes;
}

function displayRecipes(recipes) {
    const cards = recipes.map(createRecipesCard);

    const fragment = document.createDocumentFragment();
    for (let item of cards) {
        fragment.appendChild(item);
    }

    const list = document.getElementById("recipe-list");
    list.replaceChildren(fragment);

}

function createRecipesCard(recipe) {
    const element = document.createElement("li");
    element.textContent = recipe.name;
    const link = document.createElement('a');
    link.href = 'javascrip:void(0)';
    link.textContent = "[Details]";
    link.id = recipe._id;
    element.appendChild(link);
    return element;
}

function openRecipe(e) {
    if (e.target.tagName == 'A') {
        e.preventDefault();
        const id = e.target.id;
        ctx.goto('details-link', id)
    }
} 