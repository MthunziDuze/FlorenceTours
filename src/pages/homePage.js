import TitleContainer from "../Components/containerComponent";
import Offerings from "../Components/offeringsComponent";
import { Card, CardHeader } from "react-bootstrap";
import CarouselHeader from "../Components/carouselComponent";
import React from "react";
const HomePage = () => {
  return (
    <div id="root">
      <TitleContainer></TitleContainer>
      <CarouselHeader></CarouselHeader>
      <TitleContainer></TitleContainer>
      <Card>
        <CardHeader style={{ textAlign: "center" }}>
          <h1>Tour With Us</h1>
        </CardHeader>
        <Offerings></Offerings>
      </Card>
    </div>
  );
};
export default HomePage;
