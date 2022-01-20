import View from './View.js';
import prevView from './prevView.js';
class bookMarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMess = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _sucessmessage = '';

  addHandlerRender(hd) {
    window.addEventListener('load', hd);
  }

  _generateMarkup() {
    return this._data.reduce(
      (total, item) => total + prevView.render(item, false),
      ''
    );
  }
}
export default new bookMarkView();
