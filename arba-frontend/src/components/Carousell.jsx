import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousell() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    maxHeight: "400px",
  };

  return (
    <Slider {...settings}>
      <div>
        <img style={imageStyle} src={"/1.jpg"} alt="Image 1" />
      </div>
      <div>
        <img style={imageStyle} src={"/2.jpg"} alt="Image 2" />
      </div>
      <div>
        <img style={imageStyle} src={"3.png"} alt="Image 3" />
      </div>
      <div>
        <img style={imageStyle} src={"4.jpg"} alt="Image 4" />
      </div>
    </Slider>
  );
}

export default Carousell;
