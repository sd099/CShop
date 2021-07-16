import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/message.component";
import Loader from "../../components/loader/loader.component";
import { register } from "../../redux/user/user.actions";
import img from "../login-page/img.jpg";

const RegisterPage = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <section>
      <div className="imgBx">
        <img src={img} alt=""></img>
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Sign Up</h2>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <div className="inputBx">
              <span>Name</span>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
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
              <span>Confirm Password</span>
              <input
                type="password"
                name=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div className="inputBx">
              <input type="submit" value="sign up" name=""></input>
            </div>
            <div className="inputBx">
              <p>
                Have an Account?{" "}
                <Link
                  className="a"
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                >
                  login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
