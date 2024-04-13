import { useEffect, useState } from "react";
import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  Row,
  Button,
  Dropdown,
} from "react-bootstrap";

import vacationService from "../services/vacation.service";
import locationService from "../services/location.service";

const MyContext = React.createContext();

const VacationPage = () => {
  const [vacation, setVacation] = useState({
    price: "",
    description: "",
    discount: 0,
    fromDate: Date,
    toDate: Date,
    locationId: 0,
  });

  const updatefromDate = (fromDate) => {
    setVacation((previosState) => {
      return { ...previosState, fromDate: fromDate };
    });
  };

  const updatetoDate = (toDate) => {
    setVacation((previosState) => {
      return { ...previosState, toDate: toDate };
    });
  };

  const updateLocation = (newLocation) => {
    setVacation((previosState) => {
      return { ...previosState, locationId: newLocation };
    });
  };

  const handleChange = (e) => {
    setVacation({ ...vacation, [e.target.id]: e.target.value });
  };
  function handleSelectChange(evt) {
    updateLocation(evt);
    data.forEach((da) => {
      if (da.id === evt) {
        setText(da.placename);
      }
    });
  }
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const locations = await locationService.getAll();
      setData(locations.data);
    })();
  }, []);

  function handleDateChange(e) {
    console.log(e.target.id);
    const id = e.target.id;
    const value = e.target.value;
    if (id === "fromDate") {
      updatefromDate(value);
    } else if (id === "toDate") {
      updatetoDate(value);
    }
  }

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

        //return navigate("/checkout", { state: myData });
      })
      .catch((err) => {
        console.log("err saving vacatiom info", err);
      });
  };

  const [text, setText] = useState("");

  return (
    <MyContext.Provider value={vacation}>
      <Row>
        <Col style={{ width: "50%" }}>
          <br></br>
          <Card className="card" style={{ padding: "18px 16px" }}>
            <div className="list-group">
              <label className="list-group-item d-flex gap-2">
                <input
                  class="form-check-input flex-shrink-0"
                  type="radio"
                  name="listGroupRadios"
                  id="listGroupRadios1"
                  value={""}
                  checked
                />
                <span>
                  First radio
                  <small className="d-block text-body-secondary">
                    With support text underneath to add more detail
                  </small>
                </span>
              </label>
              <label className="list-group-item d-flex gap-2">
                <input
                  className="form-check-input flex-shrink-0"
                  type="radio"
                  name="listGroupRadios"
                  id="listGroupRadios2"
                  value={""}
                />
                <span>
                  Second radio
                  <small className="d-block text-body-secondary">
                    Some other text goes here
                  </small>
                </span>
              </label>
              <label className="list-group-item d-flex gap-2">
                <input
                  className="form-check-input flex-shrink-0"
                  type="radio"
                  name="listGroupRadios"
                  id="listGroupRadios3"
                  value={""}
                />
                <span>
                  Third radio
                  <small className="d-block text-body-secondary">
                    And we end with another snippet of text
                  </small>
                </span>
              </label>
            </div>
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
                Vacation Management
              </CardTitle>
              <CardBody>
                <p className="title">Here you can maintain vacation details </p>
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
                      value={vacation.discount}
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
                    <label htmlFor="fromDate" className="form-label">
                      From Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="fromDate"
                      key={"fromDate"}
                      value={vacation.fromDate || Date.now()}
                      onChange={handleDateChange}
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
                      key={"toDate"}
                      value={vacation.toDate || Date.now()}
                      onChange={handleDateChange}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="location"
                      className="form-control"
                      id="txtLocation"
                      onChange={(txtC) => setText(txtC.target.value)}
                      value={text}
                    />
                    <Dropdown onSelect={handleSelectChange}>
                      <Dropdown.Toggle variant="success" id="location">
                        Select Location
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {data.map((location, index) => {
                          return (
                            <Dropdown.Item eventKey={location.id} key={index}>
                              {location.placename}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
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
export default VacationPage;
