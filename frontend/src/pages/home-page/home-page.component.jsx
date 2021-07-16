import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Message from "../../components/message/message.component";
import Loader from "../../components/loader/loader.component";
import ProductCarousel from "../../components/product-carousel/product-carousel.component";
import TopProduct from "../../components/top-products/top-products.component";
import ProductBanner from "../../components/product-banner/product-banner.component";
import ProductCategory from "../../components/product-category/product-category.component";

import { listProducts } from "../../redux/products/product.actions";

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <TopProduct />
          <ProductBanner />
          <ProductCategory />
        </>
      )}
    </>
  );
};

export default HomePage;
