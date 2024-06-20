import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import Button from "../Components/buttonComponent";
import { Card, CardBody, CardTitle, Col, Form, Row } from "react-bootstrap";
import CarouselImage from "../Components/imageComponent";
import authService from "../services/auth.service";
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

  const navToSignUp = (e) => {
    e.preventDefault();
    return navigate("/signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    authService
      .login(user)
      .then((res) => {
        console.log(res.data);
        const logintoken = res.data.access_token;
        const user = jwtDecode(logintoken);
        localStorage.setItem("access_token", logintoken);
        switch (user.payload.userType) {
          case "ADMIN":
            return navigate("/dashboard/userdash");
          case "USER":
            if (offer !== null) {
              return navigate("/checkout", { state: offer });
            } else {
              return navigate("/");
            }
          default:
            return navigate("/");
        }
      })
      .catch((err) => {
        console.log("err logging In: ", err);
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
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label htmlFor="username" className="form-label">
                      Username
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="username"
                      value={user.username || ""}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid" className="form-text">
                      Username is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label htmlFor="password" className="form-label">
                      Password
                    </Form.Label>
                    <Form.Control
                      required
                      type="password"
                      className="form-control"
                      id="password"
                      value={user.password || ""}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid" className="form-text">
                      Password is required.
                    </Form.Control.Feedback>
                  </Form.Group>
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
                  <div class="d-grid gap-2">
                    <Button onClick={handleSubmit} state={offer}>
                      {"Login"}
                    </Button>
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
                      <Button onClick={login} state={offer}>
                        {"Sign in with google"}
                      </Button>
                    )}
                    <Button onClick={navToSignUp} state={offer}>
                      No Account? Signup
                    </Button>
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
