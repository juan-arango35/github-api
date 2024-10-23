import { API_GITHUB_URL } from './utils/config.js';
import { Pagination } from './utils/pagination.js';
import sessionGithub from './utils/session-github.js';

let pagination = null;
function setupPagination() {
  const user = sessionGithub.getUser() ?? {
    username: 'sindresorhus',
    followers: 67394,
  };
  const userName = user.username;
  const followers = user.followers;
  //https://api.github.com/users/{username}/followers
  const baseUrl = `${API_GITHUB_URL}${userName}/followers`;
  pagination = new Pagination(baseUrl, followers);
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
    await showFollowers();
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
    await showFollowers();
  });
}

async function getFollowers() {
  //with pagination
  //https://api.github.com/users/{username}/followers?page=1&per_page=30
  const url = pagination.getUrl();
  console.log('url:', url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const followers = await response.json();
  return { followers, totalItems: pagination.totalItems };

  //sd
  //without pagination
  //https://api.github.com/users/{username}/followers
  /* const user = sessionGithub.getUser();
  console.log('sesion github: ', user);

  const userName = user.username ?? 'sindresorhus';
  const userFollowersCount = user.followers ?? 67394;
  const url = `${API_GITHUB_URL}${userName}/followers`;
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const followers = await response.json();
  console.log('fetch :', followers);
  return { followers, totalItems: userFollowersCount }; */
}

async function showFollowers() {
  //followers view
  const { followers, totalItems } = await getFollowers();
  const span = document.querySelector('#counter-followers');
  span.innerText = `(${totalItems.toLocaleString('en-US')})`;
  const ul = document.querySelector('#list-followers');
  ul.innerHTML = '';

  const MAX = 5;
  for (let i = 0; i < Math.min(MAX, followers.length); ++i) {
    //console.log(followers[i]);
    const follower = followers[i];
    const login = follower.login;
    const avatar = follower.avatar_url;
    const htmlUrl = follower.html_url;

    //console.log(login);
    //console.log(avatar);

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
showFollowers();
