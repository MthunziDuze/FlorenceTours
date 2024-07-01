import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Image,
  Row,
} from "react-bootstrap";
import Button from "../Components/buttonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import "./buy.css";
import React from "react";
import TitleContainer from "../Components/containerComponent";
import locationActivityService from "../services/location.activity.service";

var totalPrice;
const BuyPage = (props) => {
  const { state } = useLocation();
  const vacation = state;
  const access_token = localStorage.getItem("access_token");

  const [total, setTotal] = useState(vacation.price);
  const [quantity, setQuantity] = useState(1);
  console.log(state);
  const [imgSrc, setImgSrc] = useState([vacation.image]);
  totalPrice = vacation.price;
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
      navigate("/login", { vacation });
    } else {
      navigate("/checkout", { vacation });
    }
  };

  if (!access_token) {
    btnText = "Login to check out";
  } else {
    btnText = "CheckOut";
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      console.log(state);
      const response = await locationActivityService.findByVactiobId(state.id);
      console.log(response);
      let vacationActivities = new Array([]);
      vacationActivities = response.data;

      setData(vacationActivities);
    })();
  }, []);
  return (
    <div className="App">
      <TitleContainer></TitleContainer>
      <Row>
        <Col style={{ width: "50%" }}>
          <Row>
            {vacation.images.map((image) => (
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
                  <CardTitle style={{ color: "white" }}>
                    {vacation.name}
                  </CardTitle>
                </CardHeader>
              </div>
              <CardBody>
                <h3>{vacation.description}</h3>
                <br></br>
                <h3>
                  Your GateAway To Unforgettable Adventure FOR JUST R
                  {vacation.price} per person.
                </h3>
                <div>
                  <label htmlFor="customRange1" className="form-label">
                    Select number of people travelling
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min={1}
                    max={20}
                    defaultValue={1}
                    id="customRange1"
                    onChange={(e) => setTotal(calcTotal(e.target.value))}
                  ></input>
                  {quantity + " "} people travelling to {vacation.name}
                </div>
                <div id="total">Total: R{total}</div>
                <div className=" text-white text-center">
                  <CardHeader style={{ backgroundColor: "rgb(75, 93, 115)" }}>
                    <CardTitle style={{ color: "white" }}>Activities</CardTitle>
                  </CardHeader>
                </div>
                <div>
                  <div class="container">
                    {data.map((activity) => (
                      <div className="row" key={activity.id}>
                        <div className="col">{activity.name}</div>
                        <div className="col">{activity.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                {
                  <Button onClick={handleSubmit} state={vacation}>
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
    totalPrice = vacation.price * p;
    return totalPrice;
  }
};
export default BuyPage;
