import http from "../http-common";

class UserService {
  create(data) {
    return http.post("/user", data);
  }
  login(data) {
    return http.post("/auth", data);
  }

  logout() {
    return http.post("/auth/logout");
  }

  getAll() {
    return http.get("/user");
  }

  get(id) {
    return http.get(`/user/${id}`);
  }
  update(id, data) {
    return http.put(`/user/${id}`, data);
  }
  findByTitle(username) {
    return http.get(`/user?username=${username}`);
  }
}
export default new UserService();
