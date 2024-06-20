import http from "../http-common";

class ImageService {
  upload(data) {
    return http.post("/images", data);
  }
  create(data) {
    return http.post("/image", data);
  }
  getImage() {
    return http.get;
  }
}

export default new ImageService();
