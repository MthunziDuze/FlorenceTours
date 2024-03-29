import http from "../http-common";

class CustomerService {
  create(data) {
    return http.post("/customer", data);
  }

  getAll() {
    return http.get("/customer");
  }

  get(id) {
    return http.get(`/customer/${id}`);
  }
  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }
  findByTitle(username) {
    return http.get(`/tutorials?username=${username}`);
  }
}
export default new CustomerService();
