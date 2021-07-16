import React from "react";
import "./gift-card.styles.css";

const GiftCard = () => {
  return (
    <section className="sub">
      <div className="container py-5 text-white">
        <div className="row">
          <div className="col-lg-3">
            <div className="row">
              <div className="col-lg-2">
                <span>
                  <i className="fas fa-sync"></i>
                </span>
              </div>
              <div className="col-lg-10">
                <h5>Return & Exchange</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="row">
              <div className="col-lg-2">
                <span>
                  <i className="fas fa-gift"></i>
                </span>
              </div>
              <div className="col-lg-10">
                <h5>Receive Gift Cards</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="row">
              <div className="col-lg-2">
                <span>
                  <i className="fas fa-user-shield"></i>
                </span>
              </div>
              <div className="col-lg-10">
                <h5>Online Support</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="row">
              <input type="text" placeholder="Your Email..." />
              <button className="btn1">SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftCard;
