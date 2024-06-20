import { useEffect, useState } from "react";
import React from "react";
import Button from "../Components/buttonComponent";
import {
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Col,
  Form,
  Row,
  Dropdown,
} from "react-bootstrap";

import axios from "axios";

import vacationService from "../services/vacation.service";
import locationService from "../services/location.service";

const MyContext = React.createContext();

const VacationPage = () => {
  const [image, setImage] = useState({
    preview: "",
    raw: "",
  });

  const [data, setData] = useState([]);

  const [vacation, setVacation] = useState({
    price: "",
    description: "",
    discount: 0,
    fromDate: Date,
    toDate: Date,
    locationId: 0,
  });

  function handleUpload(e) {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  }

  const props = {
    backgroundColor: "grey",
    // onClick: handleSubmit(),
    text: "Submit",
  };

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

  useEffect(() => {
    (async () => {
      const response = await locationService.getAll();
      let locations = response.data;

      console.log(locations);

      setData(locations);
    })();
  }, []);

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
            <CardTitle></CardTitle>
            <CardFooter>
              <input
                name="image"
                type="file"
                id="upload-button"
                onChange={handleUpload}
              ></input>
            </CardFooter>
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
                    <label htmlFor="name" className="form-label">
                      Place Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={vacation.name || ""}
                      onChange={handleChange}
                    />
                  </div>
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
                    <Button
                      as="Link"
                      name="image"
                      type="file"
                      id="upload-button"
                      onClick={uploadImage}
                    >
                      Upload Image
                    </Button>
                    <Button type="Submit" {...props}>
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
