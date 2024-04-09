import http from "../http-common";

class CustomerService {
  create(data) {
    return http.post("/user", data);
  }

  getAll() {
    return http.get("/customer");
  }

  get(id) {
    return http.get(`/customer/${id}`);
  }
  update(id, data) {
    return http.put(`/customer/${id}`, data);
  }
  findByTitle(username) {
    return http.get(`/customer?username=${username}`);
  }
}
export default new CustomerService();
