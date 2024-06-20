import Offer from "./cardTitle";
//import { data } from "./offeringList";
import style from "../pages/home-style.module.css";
import React, { useEffect, useState } from "react";
import vacationService from "../services/vacation.service";

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
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await vacationService.getAll();
      let vacatioms = response.data;
      vacatioms.map((vac) => {
        vac.image = vac.images[0]?.imagePath;
        console.log(vac);
      });
      console.log(vacatioms);
      setData(vacatioms);
    })();
  }, []);
  return (
    <div className={style.main}>
      <div>
        <div className={style.scrollcontainer} onWheel={handleScroll}>
          {data.map((offer) => (
            <Offer key={offer.id} offer={offer} style={{ width: "100vw" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offerings;
