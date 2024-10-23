# GitHub Stats

Explora las principales estadísticas de la comunidad de Github y guarda a tus usuarios favoritos para futuras referencias utilizando la aplicación `Github Stats`.

## Recursos

- Diseño: [aquí](https://www.figma.com/design/C8B1T1HFdUI2kaFGYwXOOI/Github-Stats?m=dev)
- Importa al programa insomnia el archivo [JSON](https://drive.google.com/file/d/1UWqGoX9QcBZtqjVsxRIOTfIR7vJggMjv/view?usp=sharing)
- [GitHub REST API](https://docs.github.com/en/rest)
  

## **Perfiles de usuario**

Solo hay un tipo de usuario para la aplicación Github Stats, al que nos referiremos como "usuario".


## ✍️ **Historias**

### **El usuario puede iniciar sesión**

Como usuario, quiero acceder a la aplicación para poder empezar a disfrutar de sus beneficios. Dado que no he iniciado sesión

- Cuando entro a la aplicación (`/`), veo el formulario de inicio de sesión
- Cuando ingreso mis credenciales correctas y hago clic en el botón “Iniciar sesión”, soy redirigido a `/search`
  

### **El usuario puede registrarse**

Como usuario, quiero crear una cuenta.

Dado que no estoy registrado

- Cuando entro a la aplicación (`/`), veo el formulario de inicio de sesión
- Cuando hago clic en el enlace “Crear cuenta”, veo el formulario de registro
- Cuando ingreso mi información y hago clic en el botón “Crear cuenta”, soy redirigido a `/search`
  

### **El usuario puede actualizar su perfil**

Como usuario, quiero actualizar mi información personal para que refleje mi identidad actual.

Dado que he iniciado sesión

- Cuando hago clic en el ícono de Usuario en la barra de navegación, soy redirigido a `/profile` y veo el formulario de perfil
- Cuando cambio mi información y hago clic en el botón “Actualizar”, mi información se actualiza


### **El usuario puede ver la página de búsqueda**

Como usuario, quiero acceder a la página de búsqueda para empezar a buscar usuarios de GitHub.

Dado que estoy en cualquier página

- Cuando hago clic en el ícono de búsqueda en la barra de navegación, soy redirigido a la Página de Búsqueda.
- Cuando ingreso manualmente la ruta `/search,` soy redirigido a la Página de Búsqueda

y veo un campo de entrada, resultados de búsqueda y la barra de navegación.


### **El usuario puede buscar un usuario de GitHub**

Como usuario, quiero buscar las estadísticas de un usuario de GitHub.

Dado que estoy en la página de búsqueda

- Cuando escribo un nombre de usuario de GitHub válido en el campo de búsqueda, se muestra la información del usuario de GitHub en la página


### **El usuario puede marcar a un usuario como favorito**

Como usuario, quiero marcar a cualquier usuario de GitHub como favorito para poder acceder a ellos más rápidamente en el futuro.

Dado que estoy en la página de búsqueda y se está mostrando un usuario que no es favorito

- Cuando hago clic en el ícono de estrella, el usuario se agrega como favorito y la estrella cambia al estado seleccionado.


### **El usuario puede ver a sus usuarios favoritos de GitHub**

Como usuario, puedo ver una lista de todos mis usuarios favoritos de GitHub para poder verificar sus estadísticas directamente.

Dado que estoy en cualquier página

- Cuando hago clic en el ícono de Estrella en la barra de navegación, soy redirigido a la página de Favoritos (`/favorites`)
    - y veo una lista de mis primeros 7 usuarios favoritos con su avatar, nombre y nombre de usuario
    - **[opcional]** y un componente de paginación que me permite explorar más usuarios favoritos si hay más de 7


### **El usuario puede ver los seguidores (followers) de un usuario de GitHub**

Como usuario, puedo ver una lista de seguidores de un usuario de GitHub para poder explorar su red de contactos.

Dado que estoy en la página de búsqueda y se está mostrando un usuario

- Cuando hago clic en la tarjeta de “followers”, soy redirigido a la página de seguidores (`/users/:username/followers`)
    - y veo una lista de los primeros 7 seguidores de ese usuario con su avatar y nombre de usuario
    - **[opcional]** y un componente de paginación que me permite explorar más seguidores si hay más de 7


### **El usuario puede ver los usuarios a los que sigue un usuario de GitHub (followings)**

Como usuario, puedo ver una lista de los usuarios a los que sigue un usuario de GitHub para poder explorar su red de contactos.

Dado que estoy en la página de búsqueda y se está mostrando un usuario

- Cuando hago clic en la tarjeta de “followings”, soy redirigido a la página de seguidos (`/users/:username/followings`)
    - y veo una lista de los primeros 7 seguidos por ese usuario con su avatar y nombre de usuario
    - **[opcional]** y un componente de paginación que me permite explorar más seguidos si hay más de 7


### **El usuario puede ver los repositorios públicos de un usuario de GitHub**

Como usuario, puedo ver una lista de los repositorios públicos de un usuario de GitHub para poder explorar su contenido.

Dado que estoy en la página de búsqueda y se está mostrando un usuario

- Cuando hago clic en la tarjeta de repositorios públicos, soy redirigido a la página de repositorios públicos (`/users/:username/repos`)
    - y veo una lista de los primeros 5 repositorios públicos de ese usuario con su nombre completo, descripción, lenguaje, conteo de estrellas y conteo de bifurcaciones.
    - **[opcional]** y un componente de paginación que me permite explorar más repositorios si hay más de 5

<aside>
💡 Cada lenguaje debería tener un color específico (ustedes deciden cuál).

</aside>


### **El usuario puede navegar a un repositorio público de un usuario de GitHub**

Como usuario, puedo navegar a cualquier repositorio público para poder aprender más sobre él.

Dado que estoy en la página de repositorios públicos

- Cuando hago clic en cualquier tarjeta de repositorio, soy redirigido al repositorio de GitHub en una pestaña separada.



HAPPY CODING! 🚀
