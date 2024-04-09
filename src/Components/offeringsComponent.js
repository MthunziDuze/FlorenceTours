import Offer from "./cardTitle";
import { data } from "./offeringList";
import style from "../pages/home-style.module.css";
import React from "react";

const handleScroll = (event) => {
  const container = event.target;
  const scrollAmount = event.deltaY;
  container.scrollTo({
    top: 0,
    left: container.scrollLeft + scrollAmount,
    behavior: "smooth",
  });
};

const Offerings = () => {
  return (
    <div className={style.main}>
      <div>
        <div className={style.scrollcontainer} onWheel={handleScroll}>
          {data.map((offer) => (
            <Offer key={offer.id} offer={offer} style={"width: 100vw"} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offerings;
