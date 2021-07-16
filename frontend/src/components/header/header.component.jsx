import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/user.actions";
import "./header.styles.css";
import { withRouter } from "react-router";
const Header = ({ history }) => {
  //for css class change
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };

  const [isMenuActive, setMenuActive] = useState(false);
  const handleMenuToggle = () => {
    setMenuActive(!isMenuActive);
  };
  /////////////////////////////

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  //////////////////////
  //searchBar
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <div className="top">
      <section className="navigation">
        <header
          className={`${isActive ? "active-search" : ""} ${
            isMenuActive ? "active-menu" : ""
          }`}
        >
          <div
            onClick={handleMenuToggle}
            className={`toggle ${isMenuActive ? "active" : ""}`}
          ></div>
          <nav className="menu">
            <div className="logo">
              <Link className="a logo-a" to="/">
                CShop
              </Link>
            </div>
            <ul>
              <li>
                <Link className="a" to="/cart">
                  <i className="fas fa-shopping-cart" /> Cart
                </Link>
              </li>
              {userInfo ? (
                <li className="sub-menu dropdown">
                  <Link className="a">{userInfo.name}</Link>
                  <div className="dropdown-content">
                    <Link className="a" to="/profile">
                      Profile
                    </Link>
                    <Link onClick={logoutHandler} className="a" to="#">
                      Logout
                    </Link>
                  </div>
                </li>
              ) : (
                <li>
                  <Link className="a" to="/login">
                    <i className="fas fa-user" /> Sign In
                  </Link>
                </li>
              )}
              {userInfo && userInfo.isAdmin && (
                <li className="sub-menu dropdown">
                  <Link className="a">Dashboard</Link>
                  <div className="dropdown-content">
                    <Link className="a" to="/admin/userlist">
                      Users
                    </Link>
                    <Link className="a" to="/admin/productlist">
                      Products
                    </Link>
                    <Link className="a" to="/admin/orderlist">
                      Orders
                    </Link>
                  </div>
                </li>
              )}
            </ul>
          </nav>
          <div
            onClick={handleToggle}
            className={`search-icon ${isActive ? "active" : ""}`}
          ></div>
        </header>
      </section>
      <div className={`search-box ${isActive ? "active" : ""}`}>
        <input
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder=" Search Product..."
        />
        <div onClick={submitHandler} className="s-icon">
          <i className="fas fa-search"></i>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
