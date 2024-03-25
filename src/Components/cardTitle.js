import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import React from "react";
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
            style={{ display: "block" }}
            as={Link}
            to={"/buy"}
            state={offer}
          >
            Buy
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Offer;
