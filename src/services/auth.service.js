import http from "../http-common";

class AuthService {
  validateToken() {
    const accessToken = localStorage.getItem("access_token");
    console.log("AuthGuard Access Tokon " + accessToken);
    return http.post("/auth/refresh/" + accessToken);
  }
  login(data) {
    return http.post("/auth", data);
  }

  logout() {
    return http.post("/auth/logout");
  }
}
export default new AuthService();
