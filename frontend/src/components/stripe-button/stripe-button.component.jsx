import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { withRouter } from "react-router";
import { payOrder } from "../../redux/order/order.actions";

const StripeCheckoutButton = ({ match, price }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const priceForStripe = (price * 100).toFixed(0);
  const publishableKey =
    "pk_test_51J7LVnSErnnXgtf7XscnTtSjBmnxwArg0KhOpbikq6enVMXTB5Fj7sfRYthBUhg0gTJUlBZHEVaaJIfNy9AD3dRQ00IclA85nC";

  const onToken = (token) => {
    axios({
      url: "/payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token: token,
      },
    })
      .then((response) => {
        dispatch(payOrder(orderId, response));
        alert("succesful payment");
      })
      .catch((error) => {
        console.log("Payment Error: ", error);
        alert(
          "There was an issue with your payment! Please make sure you use the provided credit card."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CShop Ltd."
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default withRouter(StripeCheckoutButton);
