const database = {
  getToken() {
    return localStorage.getItem("token");
  },
  setToken(token) {
    localStorage.setItem("token", token);
  },
  getMenu() {
    return localStorage.getItem("menu");
  },
  setMenu(menu) {
    localStorage.setItem("menu", menu);
  }
};

export default database;
