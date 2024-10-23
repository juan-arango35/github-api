import session from './utils/session.js';
import { API_URL } from './utils/config.js';

//const API_URL = 'https://github-stats-api-production.up.railway.app';
const url = API_URL + '/login';

//agregamos la fucnionalidad del boton
const butonSubmit = document.getElementById('login-button');

async function login(event) {
  //inicio
  //Agregamos el prevent defaul para que no se envie tradicionalmente
  event.preventDefault();
  //capturamos los valores de los input ingresados
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // los mostramos en la consola

  console.log('Email:', email);
  console.log('Password:', password);
  const body = {
    email,
    password,
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  //final

  try {
    console.log(url);
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const user = await response.json();
    console.log(user);

    session.saveToken(user.token);
    window.location.href = './html/search.html';
  } catch (error) {
    console.log('Error al realizar el login:', error);
    alert('Email o password incorrectos');
  }
}
butonSubmit.addEventListener('click', login);
/* login(); */

/* // Respuesta de la peticion de fetch con el metodo POST - 'login'
{
  id: 6,
  email: 'jhon@mail.com',
  first_name: 'jhon',
  last_name: 'zegarra',
  token: 'NFA4iyVCRf1YZTE2QWc7WKjc'
}
*/
