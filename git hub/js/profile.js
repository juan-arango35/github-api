import { API_URL } from './utils/config.js';
import session from './utils/session.js';

//endpoint
const url = API_URL + '/profile';

//obtener datos del usuario logeado - llamada a API
async function getUserProfile() {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session.getToken()}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error (response.ok): ${response.status}`);
    }
    const userProfile = await response.json();
    return userProfile;
  } catch (error) {
    console.log('Error al obtener datos del perfil', error);
  }
}

//Mostrar los datos del Usuario en pantalla
async function showProfile() {
  const userProfile = await getUserProfile();
  if (!userProfile) {
    alert('Por favor inicie sesion');
    return;
  }

  console.log(userProfile);
  const email = userProfile.email;
  const first_name = userProfile.first_name;
  const last_name = userProfile.last_name;

  document.querySelector('#email').value = email;
  document.querySelector('#password').value = '';
  document.querySelector('#first-name').value = first_name;
  document.querySelector('#last-name').value = last_name;
}

//Actualizar los datos del usuario logeado - llamada a API
async function updateProfile() {
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const firstName = document.querySelector('#first-name');
  const lastName = document.querySelector('#last-name');

  const body = {
    email: email.value,
    first_name: firstName.value,
    last_name: lastName.value,
  };

  if (password && password.value !== '') body.password = password.value;

  const options = {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.getToken()}`,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Error: ', response.status);
  }
  const user = await response.json();
  alert('Datos actualizados!!');

  console.log(user);
}

//creando el evento de formulario que actualiza el perfil de usuario
const form = document.querySelector('#update-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  await updateProfile();
  window.location.href = 'search.html';
});

//iniciar la pagina html con la informacion de usuario
showProfile();
