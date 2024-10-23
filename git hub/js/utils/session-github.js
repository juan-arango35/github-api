const sessionGithub = {
  /* estructura requerida en objeto 'user'
  const user = {
    username: 'gaearon', //nickname / username
    followers: 1234,
    following: 4321,
    repos: 99,
    gists: 666,
  }
  */
  saveUser(user) {
    localStorage.setItem('userGithub', JSON.stringify(user));
  },

  //promesa?
  getUser() {
    return JSON.parse(localStorage.getItem('userGithub'));
  },

  removeToken() {
    localStorage.removeItem('userGithub');
  },
};

export default sessionGithub;
