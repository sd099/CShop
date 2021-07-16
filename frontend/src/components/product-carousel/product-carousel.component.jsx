import React from "react";
import { Carousel, Image } from "react-bootstrap";
import GiftCard from "../gift-card/gift-card.component";
import "./product-carousel.styles.css";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";

const ProductCarousel = () => {
  return (
    <>
      <Carousel fade={true} controls={false} interval={5000}>
        <Carousel.Item>
          <Image src={img1} className="d-block w-100" alt="..." />
          <Carousel.Caption className="carousel-caption">
            <div className="container">
              <div className="row justify-content-start text-left">
                <div className="col-lg-8">
                  <p>SUMMER COLLECTION 2021</p>
                  <h1>Get up to 40% off</h1>
                  <h1>New Collections</h1>
                  <button className="btn0 mt-3 ml-2">Shop Now</button>
                </div>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={img2} className="d-block w-100" alt="..." />
          <Carousel.Caption className="carousel-caption">
            <div className="container">
              <div className="row justify-content-start text-left">
                <div className="col-lg-8">
                  <p>SUMMER COLLECTION 2021</p>
                  <h1>Get up to 40% off</h1>
                  <h1>New Collections</h1>
                  <button className="btn0 mt-3 ml-2">Shop Now</button>
                </div>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <GiftCard />
    </>
  );
};

export default ProductCarousel;
