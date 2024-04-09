import http from "../http-common";

class ActivityService {
  create(data) {
    return http.post("/activity", data);
  }

  getAll() {
    return http.get("/activity");
  }

  get(id) {
    return http.get(`/activity/${id}`);
  }
  update(id, data) {
    return http.put(`/activity/${id}`, data);
  }
  findByActivity(activity) {
    return http.get(`/activity?activity=${activity}`);
  }
}
export default new ActivityService();
