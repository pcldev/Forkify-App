export default class View {
  _data; //Private property
  //Create render() function to render the recipe
  /**
   *
   * @param {Object | Object[]} data The data to be rendered (e.g recipe)
   * @param {boolean} [render=true] If false create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} Vierw instance
   * @author Phan Công Long
   * @todo finish implementation
   */
  render(dt, render = true) {
    //This dt is model.state.recipe obj which decleared in model.js

    if (!dt || (Array.isArray(dt) && dt.length === 0))
      return this.renderError();

    this._data = dt;
    const markup = this._generateMarkup();
    if (!render) return markup; //If render is false return markup because this._parentEl default = "" sao we need to return markup to prevent
    this._clear(); //Clear all recipe
    this._parentEl.insertAdjacentHTML('afterbegin', markup); //Add generateMarkup to #parentEL
  }

  update(dt) {
    this._data = dt;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    // console.log(newDom);
    //Create virtual DOM to compare virtual DOM to parent DOM
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, index) => {
      const curEl = curElements[index];
      // console.log(newEl);
      //Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
        //Những cái nào khác nhau sẽ được trọn ra và những phần tử con của tất cả các phần tủ khác nhau có giá trị khác "" và nodeValue là giá trị của dang node đó sẽ trả về text và thêm hàm trim() để loại bọ khoảng trắng , nếu phần tử nào có text ="" thì loại bỏ
        //Note: firstChild trả về dạng node nếu nó là text thì lấy các element khác sẽ trả về "\n      "
      ) {
        curEl.textContent = newEl.textContent;
      }

      //Updates changed data ATTRIBUTES

      if (!newEl.isEqualNode(curEl)) {
        //Những cái nào khác nhau sẽ được lọc ra , tạo một array với newEl.attribute để có thể thay đổi thuộc tính data-update-to
        //attr.name là những thuộc tính có trong 1 div ví dụ như class hay data-update-to rồi ta setAttribute với từng phần tử của curEl (CurElement[index]) =NewEl đã được thay đổi
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
     <div class="spinner">
      <svg>
        <use href="src/img/icons.svg#icon-loader"></use>
      </svg>
    </div> `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  } //This is global property

  renderError(message = this._errorMess) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="src/img/icons.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._sucessmessage) {
    const markup = `
    <div class="message">
      <div>
          <svg>
              <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
