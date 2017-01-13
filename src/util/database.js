const database = {
  getToken() {
    return localStorage.getItem("token");
  },
  setToken(token) {
    localStorage.removeItem("token");

    localStorage.setItem("token", token);
  },
  getMenu() {
    return JSON.parse(localStorage.getItem("menu"));
  },
  setMenu(menu) {
    localStorage.removeItem("menu");

    localStorage.setItem("menu", JSON.stringify(menu));
  }
};

export default database;
