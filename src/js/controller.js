import * as model from './model.js';
import reciperView from './views/reciperView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookMarkView from './views/bookMarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.split('#')[1];

    if (!id) return;
    reciperView.renderSpinner();

    //0)Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    //Loading recipe
    await model.loadRecipe(id);
    //transmiss "id" into loadRecipe then fecth API and after that set the model.state.recipe=recipe which is data.json()
    // console.log(model.state.recipe);
    //2) Rendering recipe
    reciperView.render(model.state.recipe);
    //Render recipe with state.recipe now is fetch API with id
    //3)Updating bookmark
    bookMarkView.update(model.state.bookmarks);
  } catch (err) {
    reciperView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results

    await model.loadSearchResults(query);

    //3) Render results
    resultsView.render(model.getSearchResultsPage());

    //4)Render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = goToPage => {
  //1) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2)Render initial new pagination button
  paginationView.render(model.state.search);
};

const controlUpdateServing = newServing => {
  //Update the recipe serving
  model.updateServing(newServing);

  //Update the recipe view
  reciperView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1>Add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookMark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);
  //2>Update recipe view
  reciperView.update(model.state.recipe);
  //3>Render bookmarks
  bookMarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookMarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};



const init = function () {
  bookMarkView.addHandlerRender(controlBookmarks);
  reciperView.addhandleRender(controlRecipe);
  reciperView.addhandleUpdateServing(controlUpdateServing);
  reciperView.addhandleAddBookMark(controlAddBookmark);
  searchView.addHandelerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  addRecipeView.addHandleMoreRecipe()
  // addRecipeView.addHandleDelateIngredient()
};
init();

const clearBookmark = function () {
  localStorage.clear('bookmarks');
};

/**
 * Display number of pages between the pagination button
 */