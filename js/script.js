const submit = document.getElementById('submit');
const search = document.getElementById('search');
const random = document.getElementById('random');
const headings = document.getElementById('headings');
const meals = document.getElementById('meals');
const singleMeal = document.getElementById('single-meal');




// Add meal to DOM

function addMealToDOM(meal){
  const ingredients = [];
  
  for(let i = 1; i <= 20; i++){
    if(meal[`strIngredient${i}`]){
      ingredients.push(`${meal[`strIngredient${i}`]} -- ${meal[`strMeasure${i}`]}`);
      console.log(ingredients);
    }
  
  else{
    break;
  }
}
singleMeal.innerHTML = `
 <div class="single-meal">
 <h1> ${meal.strMeal}</h1>
 <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
 <div class="single-meal-info">
   ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
   ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
 </div>
 <div class="main">
 <p>${meal.strInstructions}</p>
 <h2>Ingredients</h2>
 <ul>
   ${ingredients.map(ing => `
   <li>${ing}</li>
   `).join('')}
 </ul>
 </div>
 </div>
`
}



//  getMealByID

function getMealByID (mealID){
 fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
 .then(res => res.json())
 .then(data => {
  console.log(data);
   const meal = data.meals[0];
   addMealToDOM(meal);
 });
}



// get Meal Function
function getMeal (e){
 e.preventDefault();
//   clear single meal
singleMeal.innerHTML = '';

//   Get Search Term
const term = search.value;

if(term.trim()){
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
  .then(res => res.json())
  .then(data => {
    headings.innerHTML = `<h2>You Searched for the meal term "${term}"</h2>`;

    if(data.meals === null){
        headings.innerHTML = `<p>You Searched the wrong meal, try gain later</p>`;
    } else{
        meals.innerHTML = data.meals.map((meal) => 
         `<div class="meal"> 
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="meal-info" data-mealID="${meal.idMeal}">
          <h3>${meal.strMeal}</h3>
          </div>
         </div>`
        )
        .join("");
    }

  })
     search.value =''
} else{

}

}

// get random meal
function randomMeal(){
  meals.innerHTML = '';
  headings.innerHTML ='';
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  .then(res => res.json())
  .then(data =>{
     const meal = data.meals[0];
     addMealToDOM(meal);
  })
}

//  Event listener

submit.addEventListener('submit', getMeal)
meals.addEventListener('click', (e) => {
  const mealInfo = e.path.find(item => {
    if(item.classList){
    return  item.classList.contains('meal-info')
    } else{
      return false;
    }
  });

    if(mealInfo){
     const mealID = mealInfo.getAttribute('data-mealid');
     getMealByID(mealID);
    }
});
random.addEventListener('click', randomMeal)