import React from "react";
import { Link } from "react-router-dom";
import "./footer.styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <Link className="a" to="#">
                  about us
                </Link>
              </li>
              <li>
                <Link className="a" to="#">
                  our services
                </Link>
              </li>
              <li>
                <Link className="a" to="#">
                  privacy policy
                </Link>
              </li>
              <li>
                <Link className="a" to="#">
                  affiliate program
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>get help</h4>
            <ul>
              <li>
                <Link className="a" to="#">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="a" to="#">
                  shipping
                </Link>
              </li>
              <li>
                <Link className="a" to="#">
                  returns
                </Link>
              </li>
              <li>
                <Link className="a" to="#">
                  order status
                </Link>
              </li>
              <li>
                <Link className="a" to="#">
                  payment options
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>online shop</h4>
            <ul>
              <li>
                <Link className="a" to="#">
                  men
                </Link>
              </li>
              <li>
                <Link className="a" to="#">
                  women
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-l">
              <ul>
                <li>
                  <Link className="a" to="#">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                </li>
                <li>
                  <Link className="a" to="#">
                    <i className="fab fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link className="a" to="#">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link className="a" to="#">
                    <i class="fab fa-linkedin"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
