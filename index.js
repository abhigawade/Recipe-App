const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDdetailsContent = document.querySelector('.recipe-details-content')
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const fetchRecipes = async (sInput) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${sInput}`);
    const response = await data.json();

    // console.log(response.meals[0])
    recipeContainer.innerHTML = "";
    response.meals.forEach( meal =>{
        const recipediv = document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea} Dish </p>
        <p>${meal.strCategory}</p>
        `
        const button = document.createElement('button');
        button.textContent = 'View Recipe';
        recipediv.appendChild(button);

        button.addEventListener('click', () =>{
            openRecipePopup(meal);
        })

        recipeContainer.append(recipediv)
    });
}

const fetchIngredients = (meal) =>{
    let ingredientsList = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;

}

const openRecipePopup = (meal) => {
    recipeDdetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeiInstructions">
         <h3>Instructions :</h3>
         <p>${meal.strInstructions}</p>
    </div>
    `

    recipeDdetailsContent.parentElement.style.display ='block';
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDdetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});