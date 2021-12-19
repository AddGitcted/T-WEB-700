import Carousel from "react-elastic-carousel";
import myArrow from "./slider-arrow";
import "./slider.scss";
import { getPressNews } from "../../helpers/pressServices";
import { useEffect, useState } from "react";

const ArticleSlider = () => {
  const breakpoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 500, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3, itemsToScroll: 3 },
    { width: 1100, itemsToShow: 4, itemsToScroll: 4 },
    { width: 1400, itemsToShow: 5, itemsToScroll: 5 },
  ];
  let [items, setItems] = useState([]);

  useEffect(() => {
    getPressNews().then((r) => setItems(r));
  }, []);

  return (
    <Carousel
      breakPoints={breakpoints}
      itemsToShow={4}
      pagination={false}
      renderArrow={myArrow}
      disableArrowsOnEnd={true}
      isRTL={false}
    >
      {items
        .filter(function (item) {
          return typeof item === "object";
        })
        .map((item, index) => (
          <a key={index} target="_blank" rel="noreferrer" href={item.link}>
            <div className="slider__article">
              <img src={item.link_image} alt={"article"} />
              <p className={"article__title"}>{item.tittle}</p>
            </div>
          </a>
        ))}
    </Carousel>
  );
};

export default ArticleSlider;
