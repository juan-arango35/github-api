
import { API_URL } from "./utils/config.js";
import session from './utils/session.js'


//1.tomamos el formulario de signup.html
const signupForm = document.querySelector("#form-signup");

//2.se agrega el evento submit y se define una funcion de callback.
//la funcion es async para poder usar await dentro de ella, lo que permite manejar operaciones asincronicas como fetch de manera mas sencilla
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  //3.creamos las variables que almacenan los valores de los elementos del formulario
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;

  //4.Crear una mini base de datos para probar si el usuario ya esta registrados, si esta no se crea, y si si esta, se crea
  const Users = JSON.parse(localStorage.getItem('users')) || [];
  const isUsserRegistered = Users.find(user => user.email === email);

  //5.validamos si el usuario ya esta registrado
  if(isUsserRegistered) {
    return alert("User already exists!");
  }

  //4.creamos el cuerpo de la peticion
  const body = {
    email: email,
    password: password,
    first_name: firstName,
    last_name: lastName,
  };

  //5.Definicion de las opciones para la peticion fetch
  const options = {
    method: "POST", // método HTTP a utilizar
    body: JSON.stringify(body), // cuerpo de la petición en formato JSON
    headers: {
      "Content-Type": "application/json", //encabezado de la peticion
    },
  };

  //.Definicion de la URL base y la ruta especifica para la peticion de registro
  // const BASE_URL = "https://github-stats-api-production.up.railway.app";
  const url = API_URL + "/signup";

  //7.Realizacion de la peticion fetch detro de un bloque try-catch
  try {
    const response = await fetch(url, options);
    //8.verificacion si la respuesta no es ok
    if (!response.ok) {
      const errorText = await response.text(); // Obtén el texto del error del servidor
      throw new Error(`Error: ${response.status}, ${errorText}`); //Lanzar un error con el código de estado y el texto del error
    }
    const data = await response.json(); //parsea la respuesta a JSON
    console.log(data); // imprime el token en la consola
    alert("Registered successfully!");
    
    //9. Se guarda el token en localStorage (opcional)

    localStorage.setItem("token", data.token);
    session.saveToken(data.token)


    //10. Redirecciona a search.html
    window.location.href = "search.html";
  } catch (error) {
    console.log("Error al realizar el registro:", error); // Imprimir el error en la consola
    alert(`Error al realizar el registro: ${error.message}`); // Mostrar mensaje de error
  }
});

