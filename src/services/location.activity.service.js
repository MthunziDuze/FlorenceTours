import http from "../http-common";

class LocationActivityService {
  create(data) {
    return http.post("/locationactivity", data);
  }

  getAll() {
    return http.get("/locationactivity");
  }

  get(id) {
    return http.get(`/locationactivity/${id}`);
  }
  findByVactiobId(vacationId) {
    return http.get(`/locationactivity/vacation/${vacationId}`);
  }
  update(id, data) {
    return http.put(`/locationactivity/${id}`, data);
  }
  findByLocationId(locationId) {
    return http.get(`/locationactivity?locationId=${locationId}`);
  }
}
export default new LocationActivityService();
