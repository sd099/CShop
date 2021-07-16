import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { listCategoryProducts } from "../../redux/products/product.actions";
import Message from "../../components/message/message.component";
import Loader from "../../components/loader/loader.component";
import ProductCard from "../../components/product-card/product-card.component";
import Paginate from "../../components/paginate/paginate.component";

const CategoryWiseProducts = ({ match }) => {
  const category = match.url.substring(1);

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productCategory = useSelector((state) => state.productCategory);
  const { loading, error, products, page, pages } = productCategory;

  useEffect(() => {
    dispatch(listCategoryProducts(pageNumber, category));
  }, [dispatch, category, pageNumber]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="container feature">
      <div className="title">
        <h2>
          {category === "man" ? "Men's Collection" : "Women's Collection"}
        </h2>
      </div>
      <div className="row">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
      <Paginate pages={pages} page={page} />
    </div>
  );
};

export default withRouter(CategoryWiseProducts);
