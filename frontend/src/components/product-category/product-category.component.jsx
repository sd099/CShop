import React from "react";
import "./product-category.styles.css";
import { Link } from "react-router-dom";

const ProductCategory = () => {
  return (
    <div class="product-collection">
      <div class="container">
        <div class="product-collection-wrapper">
          <div class="product-col-left flex">
            <div class="product-col-content">
              <h2 class="sm-title">men's DRESSES </h2>
              <h2 class="md-title">men's collection </h2>
              <p class="text-light">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Molestiae consequatur facilis eligendi quibusdam voluptatibus
                exercitationem autem voluptatum, beatae architecto odit,
                quisquam repellat. Deleniti, architecto ab.
              </p>
              <Link to="/man" class="btn-dark">
                Shop now
              </Link>
            </div>
          </div>

          <div class="product-col-right">
            <div class="product-col-r-top flex">
              <div class="product-col-content">
                <h2 class="sm-title">women's dresses </h2>
                <h2 class="md-title">women's collection </h2>
                <p class="text-light">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Molestiae consequatur
                </p>
                <Link to="/woman" class="btn-dark">
                  Shop now
                </Link>
              </div>
            </div>

            <div class="product-col-r-bottom">
              <div class="flex">
                <div class="product-col-content">
                  <h2 class="sm-title">summer sale </h2>
                  <h2 class="md-title">Extra 40% Off </h2>
                  <p class="text-light">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Molestiae consequatur
                  </p>
                  <Link to="/man" class="btn-dark">
                    Shop now
                  </Link>
                </div>
              </div>
              <div class="flex">
                <div class="product-col-content">
                  <h2 class="sm-title">best sellers </h2>
                  <h2 class="md-title">best sellers </h2>
                  <p class="text-light">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Molestiae consequatur facilis{" "}
                  </p>
                  <Link to="/woman" class="btn-dark">
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
