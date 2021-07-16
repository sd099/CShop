import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./product-page.styles.css";
import {
  listProductDetails,
  createProductReview,
} from "../../redux/products/product.actions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../redux/products/product.types";

import Rating from "../../components/rating/rating.component";
import Loader from "../../components/loader/loader.component";
import Message from "../../components/message/message.component";

const ProductPage = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, product._id, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="whole">
          <section className="mt-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 mb-5">
                  <Link to="#" className="img-bg a">
                    <img
                      src={product.image}
                      className="img-fluid"
                      alt={product.name}
                    ></img>
                  </Link>
                </div>
                <div className="col-lg-6 prod-des pl-md-5">
                  <h3> {product.name}</h3>
                  <div className="rating d-flex">
                    <p className="text-left mr-4">
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </p>
                  </div>
                  <p className="amount">${product.price}</p>
                  <p
                    className={`status ${
                      product.countInStock === 0 ? "status-o" : ""
                    }`}
                  >
                    Status:{" "}
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </p>
                  <p className="des">{product.description}</p>
                  <div className="row mt-4">
                    <div className="input-group col-md-6 d-flex mb-3">
                      <button
                        onClick={(e) => setQty(qty > 1 ? qty - 1 : 1)}
                        type="button"
                        disabled={product.countInStock === 0}
                        className="button minus btn mr-2"
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <p className="form-control input-number text-center">
                        {qty}
                      </p>
                      <button
                        type="button"
                        disabled={
                          qty === product.countInStock ||
                          product.countInStock === 0
                        }
                        onClick={(e) => setQty(qty > 0 ? qty + 1 : 1)}
                        className="button plus btn ml-2"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <p>
                    <button
                      disabled={product.countInStock === 0}
                      className="a btn btn-bg py-2 px-3 mr-2"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="des-area">
            <div className="container">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <Link
                    href="#review"
                    className="nav-link active a"
                    id="review-tab"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="review"
                    aria-selected="false"
                  >
                    Review
                  </Link>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane active"
                  id="review"
                  role="tabpanel"
                  aria-labelledby="review-tab"
                >
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="row review-rate">
                        <div className="col-6">
                          <div className="review-sum">
                            <h5>Overall</h5>
                            <h4>{Number(product.rating).toFixed(1)}</h4>
                            <h6>({product.numReviews} reviews)</h6>
                          </div>
                          <br />
                          <br />
                        </div>
                      </div>
                      <div>
                        {product.reviews.length === 0 && (
                          <Message>No Reviews</Message>
                        )}
                        {product.reviews.map((review) => (
                          <div className="review-sec">
                            <div className="item">
                              <div className="item-sec">
                                <h4>{review.name}</h4>
                                <Rating value={review.rating} />
                              </div>
                            </div>
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="review-add">
                        <h4>Add a review</h4>
                        {successProductReview && (
                          <Message variant="success">
                            Review submitted successfully
                          </Message>
                        )}
                        {loadingProductReview && <Loader />}
                        {errorProductReview && (
                          <Message variant="danger">
                            {errorProductReview}
                          </Message>
                        )}
                        {userInfo ? (
                          <form
                            className="row contact-form"
                            onSubmit={submitHandler}
                          >
                            <div className="col-md-12">
                              <p>Your rating:</p>
                              <ul className="list">
                                <li>
                                  <Link
                                    className="a"
                                    to="#"
                                    onClick={(e) => setRating(1)}
                                  >
                                    <i
                                      className={`${
                                        rating >= 1
                                          ? "fas fa-star"
                                          : "far fa-star"
                                      } `}
                                    ></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    className="a"
                                    to="#"
                                    onClick={(e) => setRating(2)}
                                  >
                                    <i
                                      className={`${
                                        rating >= 2
                                          ? "fas fa-star"
                                          : "far fa-star"
                                      } `}
                                    ></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    className="a"
                                    to="#"
                                    onClick={(e) => setRating(3)}
                                  >
                                    <i
                                      className={`${
                                        rating >= 3
                                          ? "fas fa-star"
                                          : "far fa-star"
                                      } `}
                                    ></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    className="a"
                                    to="#"
                                    onClick={(e) => setRating(4)}
                                  >
                                    <i
                                      className={`${
                                        rating >= 4
                                          ? "fas fa-star"
                                          : "far fa-star"
                                      } `}
                                    ></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    className="a"
                                    to="#"
                                    onClick={(e) => setRating(5)}
                                  >
                                    <i
                                      className={`${
                                        rating >= 5
                                          ? "fas fa-star"
                                          : "far fa-star"
                                      } `}
                                    ></i>
                                  </Link>
                                </li>
                              </ul>
                              <div className="form-group">
                                <textarea
                                  className="form-control"
                                  name="message"
                                  rows="5"
                                  placeholder="Write your Review........"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                              </div>
                            </div>
                            <div className="col-md-12 text-center">
                              <button
                                disabled={loadingProductReview}
                                type="submit"
                                className="sub-btn"
                              >
                                Submit Now
                              </button>
                            </div>
                          </form>
                        ) : (
                          <Message>
                            Please <Link to="/login">sign in</Link> to write a
                            review{" "}
                          </Message>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProductPage;
