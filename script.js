//References
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3>Please input food name!</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        console.log(ingredients);

        result.innerHTML = `
          <div class="thumb-img">
             <img src=${myMeal.strMealThumb}>
          </div>
          <div class="details">
              <h2><span>Meal Name:</span>${myMeal.strMeal}</h2>
              <h4><span>Country of Origin:</span>${myMeal.strArea}</h4>
          </div>
          <div id="ingredient-con"></div>
          
          <div id="recipe">
              <button id="hide-recipe"><i class="fa-solid fa-xmark"></i></button>
              <pre id="instructions">${myMeal.strInstructions}</pre>
              <div class="watch-tutorial">
                <h3>Wanna folow step by step? tap the link below to watch tutotial to learn more</h3>
              </div>
              <div class = "recipe-link">
                <a href = "${myMeal.strYoutube}" target = "_blank">Watch Video</a>
              </div>
          </div>
          <button id="show-recipe">Recipe &More</button>
    `;
        let ingredientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3>Error! Please try again</h3>`;
      });
  }
});
