import { API_GITHUB_URL } from './utils/config.js';
import { Pagination } from './utils/pagination.js';
import sessionGithub from './utils/session-github.js';

let pagination = null;
function setupPagination() {
  const user = sessionGithub.getUser() ?? {
    username: 'sindresorhus',
    following: 67394,
  };
  const userName = user.username;
  const following = user.following;
  //https://api.github.com/users/{username}/following
  const baseUrl = `${API_GITHUB_URL}${userName}/following`;
  pagination = new Pagination(baseUrl, following);
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
    await showFollowing();
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
    await showFollowing();
  });
}

async function getFollowing() {
  const user = sessionGithub.getUser();
  console.log('sesion github: ', user);
  //with pagination
  //https://api.github.com/users/{username}/following?page=1&per_page=30
  const url = pagination.getUrl();
  console.log('url:', url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const following = await response.json();
  return { following, totalItems: pagination.totalItems };

  //without pagination
  /* const userName = user.username ?? 'sindresorhus';
  const userFollowingCount = user.following ?? 67394;
  const url = `${API_GITHUB_URL}${userName}/following`;
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const following = await response.json();
  return { following, totalItems: userFollowingCount }; */
}

async function showFollowing() {
  const { following, totalItems } = await getFollowing();
  const span = document.querySelector('#counter-followers');
  span.innerText = `(${totalItems.toLocaleString('en-US')})`;
  const ul = document.querySelector('#list-followers');
  ul.innerHTML = '';

  const MAX = 5;
  for (let i = 0; i < Math.min(MAX, following.length); ++i) {
    console.log(following[i]);
    const follow = following[i];
    const login = follow.login;
    const avatar = follow.avatar_url;
    const htmlUrl = follow.html_url;

    console.log(login);
    console.log(avatar);

    const li = document.createElement('li');
    li.innerHTML = `
        <img
          src="${avatar}"
          alt="${login}"
        />
        <span>
          ${login}
        </span>`;
    ul.append(li);
  }
}

setupPagination();
showFollowing();
