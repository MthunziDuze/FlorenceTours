import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Col,
  Image,
  Row,
} from "react-bootstrap";
import Button from "../Components/buttonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import "./buy.css";
import React from "react";
import TitleContainer from "../Components/containerComponent";

var totalPrice;
const BuyPage = (props) => {
  const { state } = useLocation();
  const offer = state;
  const access_token = localStorage.getItem("access_token");

  const [total, setTotal] = useState(offer.price);
  const [quantity, setQuantity] = useState(1);
  console.log(state);
  const [imgSrc, setImgSrc] = useState([offer.image]);
  totalPrice = offer.price;
  const navigate = useNavigate();
  let btnText = "";

  const myFunc = (e) => {
    setImgSrc(
      <Image
        src={e.target.src}
        alt="hello"
        style={{ width: "100%", height: "30%" }}
      ></Image>
    );
  };

  const handleSubmit = () => {
    const usertoken = localStorage.getItem("access_token");
    if (!usertoken) {
      navigate("/login", { offer });
    } else {
      navigate("/checkout", { offer });
    }
  };

  if (!access_token) {
    btnText = "Login to check out";
  } else {
    btnText = "CheckOut";
  }
  return (
    <div className="App">
      <TitleContainer></TitleContainer>
      <Row>
        <Col style={{ width: "50%" }}>
          <Row>
            {offer.images.map((image) => (
              <Col className="column" key={image.id}>
                <Card
                  onClick={(e) => {
                    myFunc(e);
                  }}
                >
                  <Image src={image.imagePath} alt="hello"></Image>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="container">
            <span
              onClick={(e) => {
                e.target.parent.style.display = "none";
              }}
              className="closebtn"
            >
              &times;
            </span>
            <Card>
              <div>{imgSrc}</div>
            </Card>
          </div>
        </Col>
        <Col style={{ width: "50%" }}>
          <br></br>
          <Card style={{ padding: "18px 16px" }}>
            <div className="row-wrapper">
              <div className=" text-white text-center">
                <CardHeader style={{ backgroundColor: "rgb(75, 93, 115)" }}>
                  {offer.name}
                </CardHeader>
              </div>
              <CardBody>
                <CardText>
                  <h3>{offer.description}</h3>
                  <br></br>
                  <h3>
                    Your GateAway To Unforgettable Adventure FOR JUST R
                    {offer.price} per person.
                  </h3>
                  <div>
                    <label htmlFor="customRange1" class="form-label">
                      Select number of people travelling
                    </label>
                    <input
                      type="range"
                      class="form-range"
                      min={1}
                      max={20}
                      defaultValue={1}
                      id="customRange1"
                      onChange={(e) => setTotal(calcTotal(e.target.value))}
                    ></input>
                    {quantity + " "} people travelling to {offer.name}
                  </div>
                  <div id="total">Total: R{total}</div>
                </CardText>
                <CardText>
                  <h3>Activities</h3>
                </CardText>
              </CardBody>
              <CardFooter>
                {
                  <Button onClick={handleSubmit} state={offer}>
                    {btnText}
                  </Button>
                }
              </CardFooter>
            </div>
          </Card>
          <br></br>
        </Col>
      </Row>
    </div>
  );
  function calcTotal(p) {
    setQuantity(p);
    totalPrice = offer.price * p;
    return totalPrice;
  }
};
export default BuyPage;
