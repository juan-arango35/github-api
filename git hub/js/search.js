import { API_GITHUB_URL, API_URL } from './utils/config.js';
import sessionGithub from './utils/session-github.js';
import session from './utils/session.js';

const inputSearch = document.querySelector('#username');
const divUserInfo = document.querySelector('#user-info');
const searchContainer = document.querySelector('#search-container');

inputSearch.addEventListener('keydown', searchUser);
let userNameGithub;

function searchUser(event) {
  if (event.key !== 'Enter') return;
  event.preventDefault();

  const username = inputSearch.value.trim();

  //validacion
  if (username === '') {
    showError('Write a GitHub user...');
    return;
  }
  //prueba de consolelog
  console.log(username);
  inputSearch.value = '';

  userNameGithub = username;
  callApiUser(username);
}

async function callApiUser(username) {
  const urlUser = API_GITHUB_URL + username;
  try {
    /* const data = await Promise.all([fetch(urlUser)]);
    //condicional si el usuario no existe
    if (data[0].status === 404) {
      showError('No existe el usuario...');
      return;
    } */
    //const dataUser = await data[0].json();
    const response = await fetch(urlUser);
    //condicional si el usuario no existe
    if (response.status === 404) {
      showError('No existe el usuario...');
      return;
    }
    const user = await response.json();
    console.log(user);
    sessionGithub.saveUser({
      username: user.login,
      followers: user.followers,
      following: user.following,
      repos: user.public_repos,
      gists: user.public_gists,
    });

    //funciones par mostrar data
    mostrarData(user);
  } catch (error) {
    console.log(error);
  }
}

async function mostrarData(dataUser) {
  const {
    avatar_url,
    name,
    bio,
    followers,
    following,
    public_repos,
    public_gists,
  } = dataUser;
  divUserInfo.innerHTML = '';
  //crear en el html
  const container = document.createElement('div');
  container.innerHTML = `<img
            src="${avatar_url}"
            alt="user image"
            class="picture"
          />
          <div class="header">
          <h1 class="h1-search">${name}</h1> 
          <button id='star-button'>
            <img id='star-white' src="/assets/star.svg" alt="estrella blanca">
            <img class='star-hidden' id='star-yellow' src="/assets/star-yellow.svg" alt="estrella amarilla">
          </button>
          </div>
          <p>
            ${bio}
          </p>
        </div>
        <div class="stats">
          <ul>
            <li><a href="followers.html"><img src="/assets/followers.svg" alt="icono">${followers} followers</a></li>
            <li>
  <a href="followings.html" class="following-link">
    <img src="/assets/followings.svg" alt="icono"><br>${following}<br>following
  </a>
</li>
            <li><a href="public-repos.html"><img src="/assets/publicrepos.svg" alt="icono"><br>${public_repos}<br> public repos</a></li>
            <li><img src="/assets/publicgists.svg" alt="icono">${public_gists}<br>public gists</li>
          </ul>
        </div>`;
  divUserInfo.appendChild(container);

  const starFavorites = document.querySelector('#star-button');
  const exists = await existsFavorite();
  if (exists) {
    const white = document.querySelector('#star-white');
    const yellow = document.querySelector('#star-yellow');
    white.classList.add('star-hidden');
    yellow.classList.remove('star-hidden');
    starFavorites.disabled = true;
  }

  starFavorites.addEventListener('click', async (event) => {
    event.preventDefault();
    const white = document.querySelector('#star-white');
    const yellow = document.querySelector('#star-yellow');
    console.log(white.classList);
    white.classList.toggle('star-hidden');
    yellow.classList.toggle('star-hidden');

    const isHidden = white.classList.contains('star-hidden');

    if (isHidden) {
      //create favorite
      console.log('NO oculto crear favorito');
      let username = userNameGithub;
      username = username === '' ? 'name' : username;
      const exists = await existsFavorite();
      if (!exists) {
        await createFavorite(name, username, avatar_url);
      }
      starFavorites.disabled = true;
    }
  });
}

//funcion de showError();
function showError(message) {
  const error = document.createElement('h5');
  error.innerText = message;
  error.classList.add('error-message');
  inputSearch.insertAdjacentElement('afterend', error);
  setTimeout(() => error.remove(), 3000);
}

async function deleteFavorite(id) {}

async function createFavorite(name, username, avatarUrl) {
  const body = JSON.stringify({
    name: name,
    username: username,
    avatar_url: avatarUrl,
  });
  console.log(body);
  //body: '{"name":"asdfasdf","username":"juiana","avatar_url":"some_avatar.jpg"}'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.getToken()}`,
    },
    body: body,
  };

  fetch('https://github-stats-api-production.up.railway.app/favorites', options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

async function existsFavorite() {
  const options = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + session.getToken() },
  };
  const response = await fetch(API_URL + '/favorites', options);
  const favoriteList = await response.json();
  console.log('favorite list', favoriteList);
  const search = favoriteList.find((user) => user.username === userNameGithub);
  return search !== undefined;
}
