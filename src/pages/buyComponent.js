import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImgOverlay,
  CardText,
  Col,
  Image,
  Row,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import CarouselImage from "../Components/imageComponent";
import NavBarComponent from "../Components/navBarComponent";
import "./buy.css";
import React from "react";
import MyLogo from "../images/mylogo.jpg";
import TitleContainer from "../Components/containerComponent";

var totalPrice;
const BuyPage = (props) => {
  const { state } = useLocation();
  const offer = state;
  const [text, setText] = useState(offer.price);
  console.log(state.image);
  const [imgSrc, setImgSrc] = useState(MyLogo);
  totalPrice = offer.price;

  const myFunc = (e) => {
    setImgSrc(
      <Image
        src={e.target.src}
        alt="hello"
        style={{ width: "100%", height: "30%" }}
      ></Image>
    );
  };
  return (
    <div className="App">
      <NavBarComponent></NavBarComponent>
      <TitleContainer></TitleContainer>
      <Row>
        <Col style={{ width: "50%" }}>
          <Row>
            <Col className="column">
              <Card
                onClick={(e) => {
                  myFunc(e);
                }}
              >
                <CarouselImage></CarouselImage>
              </Card>
            </Col>
            <Col className="column">
              <Card
                onClick={(e) => {
                  myFunc(e);
                }}
              >
                <CarouselImage></CarouselImage>
              </Card>
            </Col>
            <Col className="column">
              <Card
                onClick={(e) => {
                  myFunc(e);
                }}
              >
                <CarouselImage></CarouselImage>
              </Card>
            </Col>
            <Col className="column">
              <Card
                onClick={(e) => {
                  myFunc(e);
                }}
              >
                <CarouselImage></CarouselImage>
              </Card>
            </Col>
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
              <CardImgOverlay>
                Login to continue with the check out
              </CardImgOverlay>
            </Card>
          </div>
        </Col>
        <Col style={{ width: "50%" }}>
          <br></br>
          <Card style={{ padding: "18px 16px" }}>
            <div className="row-wrapper">
              <CardHeader style={{ backgroundColor: "rgb(75, 93, 115)" }}>
                {offer.name}
              </CardHeader>
              <CardBody>
                <CardText>
                  <h3>{offer.description}</h3>
                  <br></br>
                  <h3>
                    Your GateAway To Unforgettable Adventure FOR JUST R
                    {offer.price} per person.
                  </h3>
                  <div>
                    <input
                      id="quantity"
                      name="quant"
                      style={{ width: "10%" }}
                      type="number"
                      min={1}
                      onChange={(e) => setText(calcTotal(e.target.value))}
                      defaultValue={1}
                    />{" "}
                    people people travelling to {offer.name}
                  </div>
                  <div id="total">Total: R{text}</div>
                </CardText>
                <Button as={Link} to={"/dashboard/userdash"} state={offer}>
                  Login to check out
                </Button>
              </CardBody>
            </div>
          </Card>
          <br></br>
        </Col>
      </Row>
    </div>
  );
  function calcTotal(p) {
    totalPrice = offer.price * p;
    return totalPrice;
  }
};
export default BuyPage;
