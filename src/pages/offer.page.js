import { useLocation, useNavigate } from "react-router-dom";
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
} from "react-bootstrap";

import CarouselImage from "../Components/imageComponent";
import offerService from "../services/offer.service";
import vacationService from "../services/vacation.service";
const MyContext = React.createContext();

const OfferPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadPageDate() {
      // const { vacations } = vacationService.getAll();
      // const results = [];
      // vacations.forEach((vacation) => {
      //   results.push({
      //     key: vacation.name,
      //     value: vacation.id,
      //   });
      // });
      setOffers([{ key: "Select a Vacation", value: "1" }]);
    }
    loadPageDate();
  }, []);

  const [offer, setOffer] = useState({});
  const handleChange = (e) => {
    setOffer({ ...offer, [e.target.id]: e.target.value });
  };

  const handleChangeSelect = (e) => {
    setOffer(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(offer);
    offerService
      .create(offer)
      .then((res) => {
        const offer1 = res.data;
        setOffer(offer1);

        const myData = [];
        myData.push(offer);

        return navigate("/checkout", { state: myData });
      })
      .catch((err) => {
        console.log("err saving Offer info", err);
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
                Signup with Florence Tours
              </CardTitle>
              <CardBody>
                <p className="title">Maintain Offers Here</p>
                <Form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Offer Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={offer.name || ""}
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
                      value={offer.description || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      price
                    </label>
                    <input
                      type="price"
                      className="form-control"
                      id="price"
                      value={offer.price || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="amountPaid" className="form-label">
                      Amount Paid
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="amountPaid"
                      value={offer.amountPaid || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="balanceRemaining" className="form-label">
                      Balance Remaining
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="balanceRemaining"
                      value={offer.balanceRemaining || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="typeOfPayment" className="form-label">
                      Type of Payment
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="typeOfPayment"
                      value={offer.typeOfPayment || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="numberofPeople" className="form-label">
                      Number of People
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="numberofPeople"
                      value={offer.numberofPeople || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                      Offer End Date
                    </label>
                    <input
                      type="Date"
                      className="form-control"
                      id="endDate"
                      value={offer.endDate || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                      Select Location
                    </label>
                    <select
                      className="form-control"
                      id="location"
                      onChange={handleChangeSelect}
                    >
                      {offers.map((offer) => {
                        //<option value={offer.key}>{offer.value}</option>;
                      })}
                    </select>
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
export default OfferPage;
