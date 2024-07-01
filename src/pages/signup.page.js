import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  Row,
  Button,
} from "react-bootstrap";

import CarouselImage from "../Components/imageComponent";
import CustomerService from "../services/customer.serice";
const MyContext = React.createContext();

const SignupPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const offer = state;

  const [customer, setCustomer] = useState({});
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customer);
    CustomerService.create({
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJNdGh1bnppIiwibGFzdG5hbWUiOiJEdXplIiwiZW1haWwiOiJtdGh1bnppZHV6ZUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im10aHVuemlkdXplIiwicGFzc3dvcmQiOiJjMWY1YmNhMjYwYzhmM2ViMDViZDMyZGE2NGFiNTE5ZTA1MGU0Zjg5MmVlYmQ4M2E5M2NmYmUzYjdkODIwODk3NTAwYjExYTllZmYyNmFkOGU0OGE5NWY4NDlkNGUxODRiOTJlYzVlZGVhYWQzYjQ3MTQ5ZmFhZTM5NzJiZDM5OGNhOTBjNDcyZjA5OTE4OTZkNTM1M2U0ZjU2NmJhMjgwNjZjNGVhNzYxMTM0MzA2NzBiOTc5OTRiOGM1NDNmZWMxYTI5YTMyNyIsInVzZXJUeXBlIjoiVVNFUiIsImlhdCI6MTcxOTQ0Nzc5OCwiZXhwIjoxNzIxMTY3MjQ2OTQ3fQ.RVUPAbEoc6EvEZbtezXew71bsrCFv8-XCahMQBQY9SQ",
    })
      .then((res) => {
        setCustomer(res.data);

        const myData = [];
        myData.push(offer);
        myData.push(customer);
        console.log(res);

        return navigate("/login", { state: myData });
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
              <CardTitle>Signup with Florence Tours</CardTitle>
              <CardBody>
                <p className="title">Travel and Touring</p>
                <Form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Firstname
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      value={customer.firstname || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">
                      Lastname
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      value={customer.lastname || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      area-describedby="emialHelp"
                      value={customer.email || ""}
                      onChange={handleChange}
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your Email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={customer.username || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={customer.password || ""}
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

                  <div className="mb-3">
                    <Button type="Submit" className="submit-btn">
                      Submit
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
export default SignupPage;
