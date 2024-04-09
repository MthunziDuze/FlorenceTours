import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
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
import locationService from "../services/location.service";
const MyContext = React.createContext();

const LocationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const offer = state;

  const [location, setLocation] = useState({});
  const handleChange = (e) => {
    setLocation({ ...location, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    locationService
      .create(location)
      .then((res) => {
        const cust = res.data;
        setLocation(cust);

        const myData = [];
        myData.push(state);

        return navigate("/checkout", { state: myData });
      })
      .catch((err) => {
        console.log("err saving location info", err);
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
                Location Management
              </CardTitle>
              <CardBody>
                <p className="title">Here you can maintain location details </p>
                <Form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      value={location.country || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">
                      Province
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="province"
                      value={location.province || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="city"
                      className="form-control"
                      id="city"
                      value={location.city || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="placename" className="form-label">
                      Place Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="placename"
                      value={location.placename || ""}
                      onChange={handleChange}
                    />
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
export default LocationPage;
