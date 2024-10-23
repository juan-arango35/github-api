const ITEMS_PER_PAGE = 5; //default

//baseUrl example: 'https://api.github.com/users/{username}/followers'
class Pagination {
  constructor(baseUrl, totalItems, itemsPerPage = ITEMS_PER_PAGE) {
    this.totalPages = Math.ceil(totalItems / itemsPerPage);
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.totalItems = totalItems; //total items example: total followers
    this.baseUrl = baseUrl;
  }

  //https://api.github.com/users/{username}/followers?page=1&per_page=30
  getUrl() {
    return `${this.baseUrl}?page=${this.currentPage}&per_page=${this.itemsPerPage}`;
  }

  toPage(page = 1) {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.currentPage = page;
    console.log('current page:', this.currentPage);
  }

  nextPage() {
    this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
    console.log('current page:', this.currentPage);
  }

  previusPage() {
    this.currentPage = Math.max(this.currentPage - 1, 1);
  }

  //return HTMLElement
  renderComponent() {
    const MAX_PAGES = 5; //maxima cantidad de paginas en el componente
    const pages = Math.min(pagination.totalPages, MAX_PAGES);
    const nav = document.querySelector('#pagination');

    nav.innerHTML = `
      <div class="pagination-prev">
        <a href="#">
          <img id='left-page' src="/assets/left.svg" alt="left svg" srcset="" />
        </a>
      </div>
      <ul class="pagination-list">
        <li id='page-1' class="pagination-item pagination-item_current">
          <a href="#"> 1 </a>
        </li>
        <li id='page-2' class="pagination-item">
          <a href="#"> 2 </a>
        </li>
        <li id='page-3' class="pagination-item">
          <a href="#"> 3 </a>
        </li>
        <li id='page-4' class="pagination-item">
          <a href="#"> 4 </a>
        </li>
        <li id='page-5' class="pagination-item">
          <a href="#"> 5 </a>
        </li>
        <li id='page-6' class="pagination-item" style="display: none">
          <a href="#"> 5 </a>
        </li>
      </ul>
      <div id='right-page' class="pagination-next">
        <a href="#">
          <img src="/assets/right.svg" alt="left svg" srcset="" />
        </a>
      </div>
    `;
  }
}

export { Pagination };

//tests
/* const baseUrl = 'https://api.github.com/users/gaearon/followers';
const totalItems = 1;
const pagination = new Pagination(baseUrl, totalItems);
for (let index = 0; index < 10; index++) {
  console.log(pagination.getUrl());
  pagination.nextPage();
} */
