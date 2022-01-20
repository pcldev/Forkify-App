class SearchView {
  _parentEl = document.querySelector('.search');
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
    this._parentEl.querySelector('.search__field').blur();
  }
  addHandelerSearch(hd) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      hd();
    });
  }
}
export default new SearchView();
