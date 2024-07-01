import { useEffect, useState } from "react";
import React from "react";
import Button from "../Components/buttonComponent";
import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  Row,
  CardHeader,
  CardTitle,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalBody,
} from "react-bootstrap";

import axios from "axios";

import vacationService from "../services/vacation.service";
import locationService from "../services/location.service";
import { useNavigate } from "react-router-dom";
import locationActivityService from "../services/location.activity.service";

const MyContext = React.createContext();

const VacationPage = () => {
  const [image, setImage] = useState({
    preview: "",
    raw: "",
  });

  const [data, setData] = useState([]);
  const [ladata, setLadata] = useState([]);
  const [locationActivities, setLocationActivities] = useState([]);
  const navigate = useNavigate();

  const [vacation, setVacation] = useState({
    price: 0,
    description: "",
    discount: 0,
    name: "",
    locationActivityId: [],
    fromDate: Date,
    toDate: Date,
  });

  const [vacatioms, setVacations] = useState([]);

  function handleUpload(e) {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  }

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("image", image.raw);
    console.log(vacation);
    await axios
      .post(`http://localhost:8000/api/images`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          vacationId: vacation.id,
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res.data);

        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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

  const updateLocationActivity = (newLocation) => {
    setVacation((previosState) => {
      return { ...previosState, locationId: newLocation };
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "price") {
      let value = Number(e.target.value);
      calcTotal(value);
    } else if (e.target.id === "discount") {
      let value = Number(e.target.value);
      calcTotal(value);
    }
    setVacation({ ...vacation, [e.target.id]: e.target.value });
  };
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

  const [totalPrice, setTotalPrice] = useState(0);
  function calcTotal(price) {
    let total = vacation.price - vacation.discount + price;
    setTotalPrice(total);
    return total;
  }

  async function handleSelectChange(evt) {
    //updateLocationActivity(locActId);
    let locationId = Number.parseInt(evt.target.value);
    //Find all location Vacations baed on the selected location
    const res = await locationActivityService.get(locationId);
    setLocationActivities(res.data);
    setLadata(res.data);
    //setTotalPrice(vacation.price);
    setVacation((previosState) => {
      return { ...previosState, locationActivityId: res.data.id };
    });
    console.log(locationActivities);
  }
  useEffect(() => {
    console.log("heart beat");
    if (locationActivities.length > 0) {
      let total = 0;
      locationActivities.forEach((la) => {
        let activityPrice = Number(la.price);
        total = total + activityPrice;
        console.log(total);
      });
      total = calcTotal(total);
      console.log(total);
    }
  }, [locationActivities]);

  useEffect(() => {
    (async () => {
      const response = await locationService.getAll();
      let locationActivities = response.data;

      setData(locationActivities);

      const vacationsList = await vacationService.getAll();
      let vacations = vacationsList.data;

      setVacations(vacations);
    })();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    vacation.locationActivityId = locationActivities;
    console.log(vacation);
    let res = await vacationService
      .create(vacation)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("err saving vacatiom info", err);
        handlwShow();
      });

    if (res) {
      console.log(res);

      const vacationRes = res.data;
      setVacation(vacationRes);

      const myData = [];
      myData.push(vacation);
      localStorage.setItem("vacation", JSON.stringify(vacation));

      if (image) {
        const response = uploadImage();
        if (response) console.log("image uploaded");
      }
      return navigate("/dashboard/location-activity");
    }
  };
  const editVacation = (e) => {
    setVacation(e);
  };

  const [show, setShow] = useState(false);
  const handlwShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };
  const [rLocationActivities, setRLocationActivities] = useState([]);

  const removeLocationActivity = (locationActivity) => {
    rLocationActivities.push(locationActivity);
    console.log(rLocationActivities);
    setRLocationActivities(rLocationActivities);
    const data1 = locationActivities.filter((ac) => ac != locationActivity);
    setLocationActivities(data1);
  };

  const addLocationActivity = (lActivity) => {
    locationActivities.push(lActivity);
    setLocationActivities(locationActivities);
    const data1 = rLocationActivities.filter((ac) => ac != lActivity);
    setRLocationActivities(data1);
  };

  const [validated, setValidated] = useState(false);

  return (
    <MyContext.Provider value={vacation}>
      <Row>
        <Col style={{ width: "50%" }}>
          <br></br>
          <Row>
            <Card className="card" style={{ padding: "18px 16px" }}>
              {image.preview ? (
                <img
                  src={image.preview}
                  alt="Upload-Preview"
                  width="300"
                  height="300"
                  className="my-10 mx-5"
                />
              ) : (
                <>
                  <p>Upload Image</p>
                </>
              )}
              <CardFooter>
                <input
                  name="image"
                  type="file"
                  id="upload-button"
                  onChange={handleUpload}
                ></input>
              </CardFooter>
            </Card>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <div className="card">
              <CardHeader>Maintain Vacations</CardHeader>
              <CardBody>
                <div className="container">
                  {vacatioms?.map((vacatiom, index) => {
                    return (
                      <div className="row" key={index}>
                        <div className="col">{vacatiom.name}</div>
                        <div className="col">{vacatiom.description}</div>
                        <div className="col">
                          <Button onClick={() => editVacation(vacatiom)}>
                            Edit Vacation
                          </Button>
                        </div>
                        <br></br>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </div>
          </Row>
        </Col>
        <Col style={{ width: "50%" }}>
          <br></br>
          <Card
            className="card"
            style={{ padding: "18px 16px", height: "90%" }}
          >
            <div className="container">
              <CardHeader style={{ backgroundColor: "rgb(75, 93, 115)" }}>
                <CardTitle style={{ color: "white" }}>
                  Vacation Management
                </CardTitle>
              </CardHeader>
              <CardBody>
                <p className="title">Here you can maintain vacation details </p>
                <Form onSubmit={handleSubmit} noValidate validated={validated}>
                  <Form.Group as={Col} controlId="name">
                    <Form.Label className="form-label">
                      Vacation Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      required
                      value={vacation.name}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Vacation Name Invalid
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Row>
                    <Form.Group as={Col} controlId="price">
                      <Form.Label className="form-label">Price</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        value={vacation.price}
                        onChangeCapture={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Vacation Price is Invalid
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="discount">
                      <Form.Label className="form-label">Discount</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        value={vacation.discount}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Vacation Discount is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Form.Group as={Col} controlId="description">
                    <label className="form-label">Description</label>
                    <textarea
                      type="text"
                      id="description"
                      className="form-control"
                      value={vacation.description}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Vacation Description is required
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Row>
                    <Form.Group as={Col} controlId="fromDate">
                      <label className="form-label">From Date</label>
                      <input
                        type="date"
                        className="form-control"
                        key={"fromDate"}
                        id="fromDate"
                        value={vacation.fromDate || Date.now()}
                        onChange={handleDateChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Vacation From Date is required
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="toDate">
                      <label htmlFor="toDate" className="form-label">
                        To Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        key={"toDate"}
                        id="toDate"
                        value={vacation.toDate || Date.now()}
                        onChange={handleDateChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Vacation to Date is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Form.Group as={Col} controlId="location">
                    <Form.Label className="form-label">
                      Select Location
                    </Form.Label>
                    <select
                      required
                      className="form-select"
                      onChange={handleSelectChange}
                      aria-label="Select Location"
                    >
                      <option defaultChecked value="">
                        Select Location
                      </option>
                      {data.map((location, index) => {
                        return (
                          <option value={location.id} key={index}>
                            {location.placename}
                          </option>
                        );
                      })}
                    </select>
                    <Form.Control.Feedback type="invalid">
                      Location is Invalid
                    </Form.Control.Feedback>
                  </Form.Group>
                  <br></br>
                  <div md="4">
                    <Button
                      as="Link"
                      name="image"
                      type="file"
                      id="upload-button"
                      onClick={uploadImage}
                    >
                      Upload Image
                    </Button>

                    <button type="Submit" className="btn btn-secondary">
                      Save and Continue
                    </button>
                  </div>
                  <br></br>
                  <br></br>
                  {/* Create a table t display and select Location Activities */}
                </Form>
              </CardBody>
            </div>
          </Card>
        </Col>
      </Row>
      <div className="container">
        <Row>
          <div className="container">
            <table
              className="table table-striped"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead>
                <tr>
                  <th scope="col">Activity Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col"></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {locationActivities.map((activity, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{activity.activity.name}</th>
                      <td>{activity.description}</td>
                      <td>{activity.price}</td>
                      <td>
                        <Button
                          name="btnRemoveLocationActivity"
                          onClick={() => {
                            removeLocationActivity(activity);
                          }}
                        >
                          remove
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <th></th>
                <th></th>
                <th></th>
                <th> TOTAL: R{totalPrice}</th>
              </tfoot>
              <tr></tr>
            </table>
          </div>
        </Row>
        <Row>
          <div className="container">
            <table
              className="table table-striped"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead>
                <tr>
                  <th scope="col">Activity Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col"></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rLocationActivities.map((ractivity, index) => {
                  return (
                    <tr key={ractivity.id}>
                      <th scope="row">{ractivity.activity.name}</th>
                      <td>{ractivity.description}</td>
                      <td>{ractivity.price}</td>
                      <td>
                        <Button
                          id="btnAddLocationActivity"
                          onClick={() => {
                            addLocationActivity(ractivity);
                          }}
                        >
                          Add
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tfoot>
              <tr></tr>
            </table>
          </div>
        </Row>
      </div>
      <Modal show={show}>
        <ModalHeader>
          <ModalTitle>Update Activities Offered By Vacation</ModalTitle>
        </ModalHeader>
        <ModalBody>Error Saving data please try again</ModalBody>

        <ModalFooter>
          <Button
            type="button"
            onClick={handleHide}
            className="btn btn-secondary"
          >
            Save changes
          </Button>
        </ModalFooter>
      </Modal>
    </MyContext.Provider>
  );
};
export default VacationPage;
