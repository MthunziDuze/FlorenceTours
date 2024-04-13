import { useGoogleLogin } from "@react-oauth/google";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import CarouselImage from "../Components/imageComponent";
import userService from "../services/user.service";
import { jwtDecode } from "jwt-decode";

const MyContext = React.createContext();

const LoginPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const offer = state;
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState([]);

  const login = (useGoogleLogin) => ({
    onSuccess: (res) => {
      setUser(res);
    },
    onError: (err) => console.log("Login Failed", err),
  });

  useEffect(() => {
    if (user.access_token) {
      fetch("http://localhost:8000/login", {
        headers: { access_token: user.access_token },
      })
        .then((res) => {
          res.json().then((res_JSON) => {
            setProfile([res_JSON]);
            profile.push(offer);
            profile.push(res_JSON);
            console.log("complete profile with offer: ", profile);

            return navigate("/dashboard/userdash", { state: profile });
          });
        })
        .catch((err) => {
          console.log("err geting user info", err);
        });
    }
  }, [user, profile, navigate, offer]);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    userService
      .login(user)
      .then((res) => {
        console.log(res.data);
        const logintoken = res.data.access_token;
        const user = jwtDecode(logintoken);
        localStorage.setItem("access_token", logintoken);
        if (user.userType === "ADMIN") {
          return navigate("/dashboard/userdash");
        } else if (user.userType === "USER" && offer !== null) {
          return navigate("/checkout", { state: offer });
        }
        return navigate("/");
      })
      .catch((err) => {
        console.log("err saving customer info", err);
      });
  };

  return (
    <MyContext.Provider value={offer}>
      <Row>
        <Col style={{ width: "50%" }}>
          <br></br>
          <Card className="card" style={{ padding: "18px 16px" }}>
            <CarouselImage></CarouselImage>
            <CardTitle></CardTitle>
          </Card>
        </Col>
        <Col style={{ width: "50%" }}>
          <br></br>
          <Card
            className="card"
            style={{ padding: "18px 16px", height: "90%" }}
          >
            <div className="container">
              <CardTitle style={{ backgroundColor: "rgb(75, 93, 115)" }}>
                Florence Tours
              </CardTitle>
              <CardBody>
                <p className="title">Travel and Touring</p>
                <Form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={user.username || ""}
                      onChange={handleChange}
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your Email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={user.password || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="checkBoxRememberMe"
                    />
                    <label htmlFor="checkBoxRememberMe" className="form-label">
                      Remember me
                    </label>
                  </div>
                  <div style={{ align: "center" }}>
                    <div className="mb-3">
                      <Button type="submit" className="btn-secondary">
                        Login
                      </Button>
                    </div>
                    <div className="mb-3">
                      {profile.length > 0 ? (
                        profile.map((user) => {
                          return (
                            <div>
                              <h1>Welcome {user.name}</h1>
                              <div class="card" style={{ width: "18rem" }}>
                                <img
                                  class="card-img-top"
                                  src={user.picture}
                                  alt="Card cap"
                                />
                                <div class="card-body">
                                  <p class="card-text">{user.email}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <Button className="btn-secondary" onClick={login}>
                          Sign in with google
                        </Button>
                      )}
                    </div>
                    <div className="mb-3">
                      <Button
                        className="btn-secondary"
                        as={Link}
                        to={"/signup"}
                        state={offer}
                      >
                        No Account? Signup
                      </Button>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </div>
          </Card>
        </Col>
      </Row>
    </MyContext.Provider>
  );
};
export default LoginPage;
