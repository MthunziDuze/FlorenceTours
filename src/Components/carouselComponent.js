import { Carousel } from "react-bootstrap";
import CarouselImage from "./imageComponent";
import React from "react";
function CarouselHeader() {
  // const [index, setIndex] = useState(0);
  // const handleSelect = (s) => {
  //     setIndex(s);
  // }
  return (
    <Carousel>
      <Carousel.Item>
        <CarouselImage text="First Image" />
        <Carousel.Caption>
          <h3>Welcome To Mzansi</h3>
          <p>Your GateAway To Unforgettable Adventure</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage text="First Image" />
        <Carousel.Caption>
          <h3>Welcome To Mzansi</h3>
          <p>Your GateAway To Unforgettable Adventure</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default CarouselHeader;
