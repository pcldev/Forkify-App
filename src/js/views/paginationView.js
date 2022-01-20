import View from './View.js';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(hd) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      hd(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    console.log(this._data);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1 and other page
    if (currentPage === 1 && numPages > 1) {
      return (
        this._generateMarkupPageNumber(currentPage) +
        this._generateMarkupBtnNext(currentPage)
      );
    }

    //Last page
    if (currentPage === numPages && numPages > 1) {
      return (
        this._generateMarkupBtnPre(currentPage) +
        this._generateMarkupPageNumber(currentPage)
      );
    }
    //Other page
    if (currentPage < numPages) {
      return (
        this._generateMarkupBtnPre(currentPage) +
        this._generateMarkupPageNumber(currentPage) +
        this._generateMarkupBtnNext(currentPage)
      );
    }
    //Page 1 and no other page
    return this._generateMarkupPageNumber(currentPage);
  }
  _generateMarkupBtnPre(curPage) {
    return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>`;
  }
  _generateMarkupBtnNext(curPage) {
    return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
      </button>`;
  }
  _generateMarkupPageNumber(curPage) {
    return `
    <div class="current__page">
      <div class="page__num">
        <p>Page ${curPage}</p>
      </div>
    </div>
      `;
  }
}
export default new PaginationView();
