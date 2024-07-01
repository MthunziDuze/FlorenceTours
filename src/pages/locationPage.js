import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  CardHeader,
  CardTitle,
} from "react-bootstrap";
import Button from "../Components/buttonComponent";

import locationService from "../services/location.service";
const MyContext = React.createContext();

const LocationPage = () => {
  const { state } = useLocation();
  const offer = state;
  const [location, setLocation] = useState({});
  const [locations, setLocations] = useState([]);

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mydata = await locationService
      .create(location)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("err saving location info", err);
      });

    setLocation(mydata);
  };

  useEffect(() => {
    (async () => {
      await locationService.getAll().then((res) => {
        let locationsData = res.data;
        console.log(locationsData);
        setLocations(locationsData);
      });
    })();
  }, []);

  const handleEdit = (location) => {
    console.log(location);
    setLocation(location);
  };

  return (
    <MyContext.Provider value={offer}>
      <Row>
        <Col style={{ width: "90%" }}>
          <br></br>
          <Card
            className="card"
            style={{ padding: "18px 16px", height: "90%" }}
          >
            <CardHeader style={{ backgroundColor: "rgb(75, 93, 115)" }}>
              <CardTitle style={{ color: "white" }}>
                Location Management
              </CardTitle>
            </CardHeader>
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
                <br></br>
                <div class="row">
                  <div class="col">
                    <div class="container">
                      {locations?.map((locatio, index) => {
                        return (
                          <div class="row" key={index}>
                            <div class="col">{locatio.placename}</div>
                            <div class="col">{locatio.city}</div>
                            <div class="col">
                              <Button onClick={() => handleEdit(locatio)}>
                                Edit Location
                              </Button>
                            </div>
                            <br></br>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div>
                  <Button onClick={handleSubmit}>Save Location</Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </MyContext.Provider>
  );
};
export default LocationPage;
