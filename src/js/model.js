// import { async } from "regenerator-runtime"
import { API_URL } from './config.js';
import { getJSON, sendJSON } from './helper.js';
import { RES_PER_PAGE, KEY } from './config.js';
export const state = {
  recipe: {}, //Create a recipe Obj
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
  newIngredient:[],
};

export const loadRecipe = async function (id) {
  try {
    const resjson = await getJSON(`${API_URL}${id}`);
    //Fetch data from API
    const { recipe: Recipe } = resjson.data; //Create an Obj call Recipe
    state.recipe = {
      id: Recipe.id,
      title: Recipe.title,
      publisher: Recipe.publisher,
      soureUrl: Recipe.source_url,
      image: Recipe.image_url,
      servings: Recipe.servings,
      cookingTime: Recipe.cooking_time,
      ingredients: Recipe.ingredients,
    }; //Set state.recipe =Recipe
    if (state.bookmarks.some(bk => bk.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    //Because when data JSON was called from API , and it loaded again .We need an if check
    //Arr state.bookmarks contains recipe which is marked . We check if in arr have bk.id === id (we click at recipe and it return an id) and we add state.recipe.bookmark
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const resjson = await getJSON(`${API_URL}?search=${query}`);
    // console.log(resjson);
    state.search.results = resjson.data.recipes.map(dt => {
      return {
        id: dt.id,
        title: dt.title,
        publisher: dt.publisher,
        image: dt.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServing = function (newServing) {
  //state.recipe.ingredients hss quantity
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
    //This code mean like ing.quantity=1 x (8) / 4 (the original serving) = 2
  });

  state.recipe.servings = newServing;
  //And the state.recipe.serving will be assighed =newServings like 1 = 2
};

const persistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookMark = function (recipe) {
  state.bookmarks.forEach(dt => console.log(dt));
  //Mark current recipe as bookmark
  state.recipe.bookmarked = true; //This is a method that can add a key/value to Obj (Obj.key=value)

  //Add bookmarks

  state.bookmarks.push(recipe);

  persistBookmark();
};

export const deleteBookmark = function (id) {
  //Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id); //Find the first element which satisfy
  // console.log(index);
  state.bookmarks.splice(index, 1); //Delete element at index position in array bookmark .EX:a=  ["pizza","avcado","pasta"]  a.splce(1,1) => a =["pizza","pasta"]

  //Mark current recipe as not bookmark
  state.recipe.bookmarked = false;

  persistBookmark();
};

const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

export const uploadRecipe = async function (newRecipe) {
  try {
    // ingredients.map(dt => {
    //   console.log(dt);
    // });
    // .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    // .map(ing => {
    //   const ingArr = ing[1].replaceAll(' ', '').split(',');
    //   if (ingArr.length !== 3)
    //     throw new Error(
    //       'Wrong Ingredient format! Please use the correct format'
    //     );
    //   const [quantity, unit, description] = ingArr;

    //   if (ing)
    //     return { quantity: quantity ? +quantity : null, unit, description };
    // });

    const recipe = {
      title: newRecipe[0].title,
      source_url: newRecipe[0].sourceUrl,
      image_url: newRecipe[0].image,
      publisher: newRecipe[0].publisher,
      cooking_time: +newRecipe[0].cookingTime,
      servings: +newRecipe[0].servings,
      ingredients:newRecipe.slice(1),
    };
    console.log(recipe);
    // const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    // console.log(data);
  } catch (err) {
    throw err;
  }
};


