import React from "react";
import "./product-banner.styles.css";
import img from "./img.jpg";

const ProductBanner = () => {
  return (
    <section className="section-banner">
      <div className="product-banner">
        <div className="left">
          <img src={img} alt="" />
        </div>
        <div className="right">
          <div className="content">
            <h2>
              <span className="discount">40% </span> SALE OFF
            </h2>
            <h1>
              <span>Collect Your </span>
              <span>Summer Collection</span>
            </h1>
            <button className="btn0 mt-3 ml-2">Shop Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductBanner;
