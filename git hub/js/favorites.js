import { API_URL } from './utils/config.js';
import session from './utils/session.js';

const ul__container = document.getElementById('ul__container');

//agregado
const token = session.getToken();
if (!token) {
  console.error('El token no es válido');
}
//agregado final

const options = {
  method: 'GET',
  headers: { Authorization: 'Bearer ' + session.getToken() },
};

function showFavorites() {
  fetch(API_URL + '/favorites', options)
    .then((response) => response.json())
    /*  .then(response => console.log(response)) */
    .then((data) => {
      console.log(data);

      document.querySelector(
        '#title-favorites'
      ).innerText = `Favorites (${data.length})`;

      data.slice(0, 5).forEach((item) => {
        console.log('id', item.id);
        const svg = document.createElement('img');
        //svg.setAttribute('id', 'yellow-star');
        svg.classList.add('star__favorites');
        svg.src = '/assets/star-yellow.svg';
        const img = document.createElement('img');
        img.classList.add('img__favorites');
        img.src = item.avatar_url;
        const li = document.createElement('li');
        li.classList.add('lista__usuario');
        li.innerHTML = `<div class='content__user'>
        <div class='name__perfil'>${item.name}</div><span class='nombre__user'>${item.username}</span>
        </div>
        `;
        li.prepend(img);
        li.append(svg);
        ul__container.append(li);

        //evento
        svg.addEventListener('click', (event) => {
          deleteFavorite(item.id);
          ul__container.innerHTML = '';

          //location.reload();
        });
      });
    })
    .catch((err) => console.error(err));
}

function deleteFavorite(id) {
  const options = {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${session.getToken()}` },
  };

  fetch(
    `https://github-stats-api-production.up.railway.app/favorites/${id}`,
    options
  )
    /* .then((response) => {
      console.log(response);
      return response.json();
    }) */
    .then((response) => {
      console.log(response);
      showFavorites();
    })
    .catch((err) => console.error(err));
}

showFavorites();
