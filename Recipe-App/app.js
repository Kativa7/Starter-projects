const mealsEl = document.getElementById("meals");
const favContainer = document.getElementById("fav-meals");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";
  const response = await fetch(url);
  const data = await response.json();
  const randomMeal = data.meals[0];

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
  const response = await fetch(url);
  const data = await response.json();
  const meal = data.meals[0];
  return meal;
}

async function getMealsBySearch(term) {
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term;
  const response = await fetch(url);
  const data = await response.json();
  const meals = data.meals;
  return meals;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = ` 
 <div class="meal-header">
 ${random ? `<span class="random">Random Recipe</span>` : ""}
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
 </div>
 <div class="meal-body">
     <h4>${mealData.strMeal}</h4>
     <button class="fav-btn"><i class="fas fa-heart"></i></button>
 </div>
`;

  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealFromLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealToLS(mealData.idMeal);
      btn.classList.add("active");
    }
    favContainer.innerHTML = "";
    fetchFavMeals();
  });
  mealsEl.appendChild(meal);
}

function addMealToLS(mealId) {
  const mealIds = getMealsFromLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLS(mealId) {
  const mealIds = getMealsFromLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsFromLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  favContainer.innerHTML = "";
  const mealIds = getMealsFromLS();
  const meals = [];

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    const meal = await getMealById(mealId);
    addMealToFav(meal);
  }
}

function addMealToFav(mealData) {
  const favMeal = document.createElement("li");
  favMeal.innerHTML = `
<img
  src="${mealData.strMealThumb}"
  alt="${mealData.strMeal}"
/>
<span>${mealData.strMeal}</span>
<button class="clear"><i class="fas fa-window-close"></i></button>
`;

  const btn = favMeal.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealFromLS(mealData.idMeal);

    fetchFavMeals();
  });

  favContainer.appendChild(favMeal);
}

searchBtn.addEventListener("click", async () => {
  mealsEl.innerHTML = "";
  const search = searchTerm.value;

  const meals = await getMealsBySearch(search);
  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
  searchTerm.value = "";
});
