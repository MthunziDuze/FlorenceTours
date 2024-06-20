import React from "react";
import TitleContainer from "../Components/containerComponent";
import { Col, Row } from "react-bootstrap";

const ContactUsPage = () => {
  return (
    <div>
      <TitleContainer></TitleContainer>
      <div className="container-fluid p-5 text-grey">
        <br></br>

        <Row>
          <Col>
            <h1 className="text-center">
              <b>Contact Address</b>
            </h1>
            <br></br>
            <br></br>
            <h2>
              <b>Contact Address</b>
            </h2>
            <p>28 Dayizendza street</p>
            <p>Mahushu Trust</p>
            <p>Nelspruit</p>
            <p>1200</p>
            <h3>Office Tel</h3>
            <b>(+27) 67 849 0504</b>
          </Col>
          <Col>
            <h1 className="text-center">
              <b>Contact Address</b>
            </h1>
            <br></br>
            <br></br>
            <h2>
              <b>Contact Email</b>
            </h2>
            <div>
              <p>
                <a class="link-secondary" href="Info@florencetours.co.za">
                  Info@florencetours.co.za
                </a>
              </p>
              <p>
                <a class="link-secondary" href="Service@florencetours.co.za">
                  Service@florencetours.co.za
                </a>
              </p>
              <p>
                <a class="link-secondary" href="Bookings@florencetours.co.za">
                  Bookings@florencetours.co.za
                </a>
              </p>
              <p>
                <a class="link-secondary" href="Hr@florencetours.co.za">
                  Hr@florencetours.co.za
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default ContactUsPage;
