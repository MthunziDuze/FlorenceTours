import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import React from "react";
import { Link } from "react-router-dom";
const Offer = ({ offer }) => {
  localStorage.setItem("offer", JSON.stringify(offer));
  return (
    <div key={offer.id}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={offer.image} />
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>{offer.name}</Card.Title>
          <Card.Text>{offer.description}</Card.Text>
          <Button
            className="bt-secondarybtn btn-secondary btn btn-primary"
            style={{ display: "block" }}
            as={Link}
            to={"/buy"}
            state={offer}
          >
            View More Details
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Offer;
