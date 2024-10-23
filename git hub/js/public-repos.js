import { API_GITHUB_URL } from './utils/config.js';
import sessionGithub from './utils/session-github.js';
import { Pagination } from './utils/pagination.js';

let pagination = null;
function setupPagination() {
  const user = sessionGithub.getUser() ?? {
    username: 'sindresorhus',
    repos: 67394,
  };
  const userName = user.username;
  const repos = user.repos;
  //https://api.github.com/users/{username}/repos
  const baseUrl = `${API_GITHUB_URL}${userName}/repos`;
  //              `${API_GITHUB_URL}${userName}/repos`
  pagination = new Pagination(baseUrl, repos);
  //pagination view
  pagination.renderComponent();

  const previous = document.querySelector('#left-page');
  const next = document.querySelector('#right-page');

  const MAX_PAGES = 5;
  previous.addEventListener('click', async (e) => {
    e.preventDefault();
    if (pagination.currentPage <= MAX_PAGES) {
      const oldPage = document.querySelector(`#page-${pagination.currentPage}`);
      oldPage.classList.remove('pagination-item_current');
    }
    pagination.previusPage();
    console.log(pagination.currentPage);
    if (pagination.currentPage <= MAX_PAGES) {
      const currentPage = document.querySelector(
        `#page-${pagination.currentPage}`
      );
      currentPage.classList.add('pagination-item_current');
    }
    await showRepos();
  });

  next.addEventListener('click', async (e) => {
    if (pagination.currentPage <= MAX_PAGES) {
      const oldPage = document.querySelector(`#page-${pagination.currentPage}`);
      oldPage.classList.remove('pagination-item_current');
    }
    pagination.nextPage();
    console.log(pagination.currentPage);
    if (pagination.currentPage <= MAX_PAGES) {
      const currentPage = document.querySelector(
        `#page-${pagination.currentPage}`
      );
      currentPage.classList.add('pagination-item_current');
    }
    await showRepos();
  });
}

async function getRepos() {
  /* const userName = localStorage.getItem('redirect-username') ?? 'mouredev';
  const userRepos = localStorage.getItem('redirect-repos'); //?? 67394
  localStorage.clear('redirect-username');
  localStorage.clear('redirect-repos'); */

  const user = sessionGithub.getUser();
  console.log('sesion github: ', user);
  const userName = user.username;
  const userRepos = user.repos;

  //without pagination
  //const url = `${API_GITHUB_URL}${userName}/repos`;
  const url = pagination.getUrl();
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const repos = await response.json();
  return { repos, totalCount: userRepos };
}

async function showRepos() {
  const { repos, totalCount } = await getRepos();
  const span = document.querySelector('#counter-repos');
  span.innerText = `(${totalCount})`;
  const ul = document.querySelector('#publicrepo-ul');
  ul.innerHTML = '';

  const MAX = 5;
  for (let i = 0; i < Math.min(MAX, repos.length); ++i) {
    console.log(repos[i]);
    const repo = repos[i];
    const name = repo.name;
    const description = repo.description;
    const language = repo.language;
    const stargazers_count = repo.stargazers_count;
    const htmlUrl = repo['html_url'];
    console.log('redirect:', htmlUrl);

    console.log(name);
    console.log(description);

    const li = document.createElement('li');
    li.innerHTML = `

            <h2>${name}</h2>
            <p>${description}</p>
            <h3>${language}</h3>
          `;
    ul.append(li);
    li.addEventListener('click', (event) => {
      event.preventDefault();

      window.open(htmlUrl, '_blank');
    });
  }
}

setupPagination();
showRepos();
