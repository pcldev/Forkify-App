import View from './View.js';
class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload__ingredient');
  _mainEl = document.querySelectorAll('.upload');
  _uploadCol = document.querySelector('.upload__column.ingredient');
  _btnUpload = document.querySelector('.upload__btn');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnAddRecipe = document.querySelector('.add__more__recipe');
  _btnDelete = document.querySelectorAll('.delete__ingredient');
  _arrIng = [];
  _currentNumber = 1;
  _temp = [];
  // _btnDelete=document.querySelectorAll('.delete__ingredient')

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  getArrData() {
    return this._arrIng;
  }

  setData(arr = []) {
    this._arrIng = arr;
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(hd) {
    // let mainEl = this._mainEl;
    let allData = [];
    this._btnUpload.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.upload').forEach(dt => {
        allData.push(dt);
      });
      const dataArr = [];
      allData.forEach(dt => {
        dataArr.push([...new FormData(dt)]);
      });
      let EntriData = [];
      dataArr.forEach(dt => {
        EntriData.push(Object.fromEntries([...new Set(dt)]));
      });
      EntriData = EntriData.filter(dt => {
        if (dt.quantity !== '') return dt;
      });
      hd(EntriData);
    });
    // _generateMarkup() {}
  }
  addHandleMoreRecipe() {
    const thisData = this;
    this._btnAddRecipe.addEventListener('click', function () {
      console.log(thisData._uploadCol);
      const markup = `<form class="upload">
      <label class >Ingredient ${thisData._currentNumber}</label>
      <input value="0" type="number" name="quantity">
      <select name="unit">
        <option value="kg">kg</option>
        <option value="g">g</option>
      </select>
      <input value="Avocado" name="description" type="text">
      <div class="delete__ingredient">
        <i class="far fa-trash-alt"></i>
      </div>
    </form>`;
      thisData._uploadCol.insertAdjacentHTML('beforeend', markup);
      console.log(thisData._uploadCol);
      thisData._currentNumber++;

      thisData._updateData(thisData);

      thisData._temp = thisData._btnDelete;
      thisData._temp.forEach(btn => {
        btn.addEventListener('click', () => {
          thisData._currentNumber--;
          const item = btn.closest('.upload');
          item.parentNode.removeChild(item);
          console.log(item);
          console.log(
            document
              .querySelectorAll('.delete__ingredient')
              .forEach(dt => console.log(dt))
          );
        });
      });
    });
  }

  addHandleDelateIngredient() {
    let arr = [];
    const thisData = this;
    this._updateData(this);
    arr = this._btnDelete;
    console.log(arr);
    arr.forEach(btn => {
      btn.addEventListener('click', () => {
        if (thisData._currentNumber >= 7) thisData._currentNumber--;
        const item = btn.closest('.upload');
        item.parentNode.removeChild(item);
        console.log(item);
        console.log(
          document
            .querySelectorAll('.delete__ingredient')
            .forEach(dt => console.log(dt))
        );
      });
    });
  }

  _updateData(data) {
    if (!data) return;
    data._btnDelete = document.querySelectorAll('.delete__ingredient');
  }
}
export default new AddRecipeView();
