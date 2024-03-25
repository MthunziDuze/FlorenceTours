import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
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

const MyContext = React.createContext();
function LoginPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const offer = state;
  console.log("offer :", offer);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const login = useGoogleLogin({
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

            return navigate("/checkout", { state: profile });
          });
        })
        .catch((err) => {
          console.log("err geting user info", err);
        });
    }
  }, [user]);

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
                <Button onClick={login}>Sign in with google</Button>
              )}
              <CardTitle style={{ backgroundColor: "rgb(75, 93, 115)" }}>
                Florence Tours
              </CardTitle>
              <CardBody>
                <p className="title">Travel and Touring</p>
                <Form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="username"
                      area-describedby="emialHelp"
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
                </Form>
              </CardBody>
            </div>
          </Card>
        </Col>
      </Row>
    </MyContext.Provider>
  );
}
export default LoginPage;
