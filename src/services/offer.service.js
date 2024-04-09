import http from "../http-common";

class OfferService {
  create(data) {
    return http.post("/offer", data);
  }

  getAll() {
    return http.get("/offer");
  }

  get(id) {
    return http.get(`/offer/${id}`);
  }
  update(id, data) {
    return http.put(`/offer/${id}`, data);
  }
  findByName(name) {
    return http.get(`/offer?name=${name}`);
  }
}
export default new OfferService();
