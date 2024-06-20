import http from "../http-common";

class LocationService {
  create(data) {
    return http.post("/location", data);
  }

  getAll() {
    return http.get("/location");
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
