import http from "../http-common";

class VacationService {
  create(data) {
    return http.post("/vacation", data);
  }

  getAll() {
    return http.get("/vacation");
  }

  get(id) {
    return http.get(`/vacation/${id}`);
  }
  update(id, data) {
    return http.put(`/vacation/${id}`, data);
  }
  findByPlacenamee(placenamee) {
    return http.get(`/vacation?placenamee=${placenamee}`);
  }
}
export default new VacationService();
