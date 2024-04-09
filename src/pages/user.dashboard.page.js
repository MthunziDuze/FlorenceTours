import { useNavigate } from "react-router-dom";
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
import vacationService from "../services/vacation.service";
const MyContext = React.createContext();

const UserDashboardPage = () => {
  const navigate = useNavigate();
  const [vacation, setVacation] = useState({});

  const handleChange = (e) => {
    setVacation({ ...vacation, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(vacation);
    vacationService
      .create(vacation)
      .then((res) => {
        const vacationRes = res.data;
        setVacation(vacationRes);

        const myData = [];
        myData.push(vacation);
        console.log(res);

        return navigate("/checkout", { state: myData });
      })
      .catch((err) => {
        console.log("err saving vacatiom info", err);
      });
  };

  return (
    <MyContext.Provider value={vacation}>
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
                User Management Shadow..
              </CardTitle>
              <CardBody>
                <p className="title">
                  Welcome Here You can manage your Florence tours offerings{" "}
                </p>
                <Form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      value={vacation.price || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="discount" className="form-label">
                      Discount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="discount"
                      value={vacation.province || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="description"
                      className="form-control"
                      id="description"
                      value={vacation.description || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="placename" className="form-label">
                      From Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="placename"
                      value={vacation.fromDate || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="toDate" className="form-label">
                      To Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="toDate"
                      value={vacation.toDate || ""}
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
export default UserDashboardPage;
