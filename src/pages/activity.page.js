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
import activityService from "../services/activity.service";
const MyContext = React.createContext();

const ActivityPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const offer = state;

  const [activity, setActivity] = useState({});
  const handleChange = (e) => {
    setActivity({ ...activity, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(activity);
    activityService
      .create(activity)
      .then((res) => {
        const activ = res.data;
        setActivity(activ);

        const myData = [];
        myData.push(offer);
        myData.push(activity);
        console.log(res);

        return navigate("/checkout", { state: myData });
      })
      .catch((err) => {
        console.log("err saving activity info", err);
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
                Maintain Activity
              </CardTitle>
              <CardBody>
                <p className="title">Travel and Touring maintain activity</p>
                <Form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={activity.name || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={activity.description || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Activity Price
                    </label>
                    <input
                      type="price"
                      className="form-control"
                      id="price"
                      value={activity.price || ""}
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
export default ActivityPage;
