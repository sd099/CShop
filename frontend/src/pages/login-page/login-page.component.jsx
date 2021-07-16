import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/message.component";
import Loader from "../../components/loader/loader.component";
import { login } from "../../redux/user/user.actions";
import "./login-page.styles.css";
import img from "./img.jpg";

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <section className="split-form">
      <div className="imgBx">
        <img src={img} alt=""></img>
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Login</h2>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <div className="inputBx">
              <span>Email</span>
              <input
                type="email"
                name=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="inputBx">
              <span>Password</span>
              <input
                type="password"
                name=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="inputBx">
              <input type="submit" value="sign in" name=""></input>
            </div>
            <div className="inputBx">
              <p>
                Dont have an account?{" "}
                <Link
                  className="a"
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
          <h3>Login with social media</h3>
          <ul className="sci">
            <li>
              <i className="fab fa-facebook-f fa-3x"></i>
            </li>
            <li>
              <i className="fab fa-twitter fa-3x"></i>
            </li>
            <li>
              <i className="fab fa-instagram fa-3x"></i>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
