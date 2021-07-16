import React from "react";
import { Link } from "react-router-dom";
import Rating from "../rating/rating.component";
import "./product-card.styles.css";

const ProductCard = ({ product }) => (
  <div className="col-md-3 col-sm-6">
    <div className="product-grid">
      <div className="product-image">
        <Link to={`/product/${product._id}`} className="image a">
          <img className="pic-1" src={product.image} alt={product.name}></img>
        </Link>
      </div>
      <div className="product-content">
        <Rating className="rating li" value={product.rating} />
        <h3 className="title">
          <Link className="a" to={`/product/${product._id}`}>
            {product.name}
          </Link>
        </h3>
        <div className="price"> ${product.price}</div>
      </div>
    </div>
  </div>
);

export default ProductCard;
