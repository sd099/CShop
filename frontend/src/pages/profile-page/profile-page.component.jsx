import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/message.component";
import Loader from "../../components/loader/loader.component";
import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/user/user.actions";
import { listMyOrders } from "../../redux/order/order.actions";
import "./profile-page.styles.css";

const ProfilePage = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Container fluid>
      <div className="user-profile-header">
        <h2>{name}</h2>
      </div>
      <Row>
        <Col md={3}>
          <div className="update-form">
            {message && <Message variant="danger">{message}</Message>}
            {}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <form onSubmit={submitHandler}>
                <h2>Update Profile</h2>
                <hr></hr>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <span className="fa fa-user"></span>
                      </span>
                    </div>
                    <input
                      type="name"
                      value={name}
                      className="form-control"
                      name="fullname"
                      placeholder="Full name"
                      required="required"
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-paper-plane"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email Address"
                      required="required"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      required="required"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-lock"></i>
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      required="required"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg cus-b"
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
        </Col>
        <Col md={9}>
          <div className="my-4">
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-6">
                      <h2>
                        My <b>Orders</b>
                      </h2>
                    </div>
                  </div>
                </div>
                {loadingOrders ? (
                  <Loader />
                ) : errorOrders ? (
                  <Message variant="danger">{errorOrders}</Message>
                ) : (
                  <div>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Delivered</th>
                          <th>Paid</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                              {order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)
                              ) : (
                                <i
                                  className="fas fa-times"
                                  style={{ color: "red" }}
                                ></i>
                              )}
                            </td>
                            <td>
                              {order.isPaid ? (
                                order.paidAt.substring(0, 10)
                              ) : (
                                <i
                                  className="fas fa-times"
                                  style={{ color: "red" }}
                                ></i>
                              )}
                            </td>

                            <td>
                              <Link
                                to={`/order/${order._id}`}
                                className="a edit"
                                data-toggle="modal"
                              >
                                Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
