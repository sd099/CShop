import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTopProducts } from "../../redux/products/product.actions";
import Message from "../message/message.component";
import Loader from "../loader/loader.component";
import ProductCard from "../product-card/product-card.component";
import "./top-products.styles.css";

const TopProduct = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="container feature">
      <div className="title">
        <h2>Featured Products</h2>
      </div>
      <div className="row">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default TopProduct;
