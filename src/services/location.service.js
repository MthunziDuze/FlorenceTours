import http from "../http-common";
import api from "../interceptors/http.interceptor";

class LocationService {
  create(data) {
    return http.post("/location", data);
  }

  getAll() {
    const token = localStorage.getItem("access_token");
    return api.get("/location");
  }

  get(id) {
    return http.get(`/location/${id}`);
  }
  update(id, data) {
    return http.put(`/location/${id}`, data);
  }
  findByTitle(username) {
    return http.get(`/location?username=${username}`);
  }
}
export default new LocationService();
