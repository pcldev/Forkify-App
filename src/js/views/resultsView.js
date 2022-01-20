import View from './View.js';
import prevView from './prevView.js';
class ResulesView extends View {
  _parentEl = document.querySelector('.results');
  _errorMess = 'No recipes found for your query! Please try again';
  _sucessmessage = '';
  _generateMarkup() {
    return this._data.reduce(
      (total, item) => total + prevView.render(item, false),
      ''
    );
  }
}
export default new ResulesView();
