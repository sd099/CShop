import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/message.component";
import { addToCart, removeFromCart } from "../../redux/cart/cart.actions";
import "./cart-page.styles.css";

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="small-container cart-page">
      <div className="title">
        <h2>Shopping Cart</h2>
      </div>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty
          <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <div>
          <table>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
            {cartItems.map((item) => (
              <tr>
                <td>
                  <div className="cart-info">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <Link className="p" to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                      <br />
                      <small>Price: ${item.price}</small>
                      <br />
                      <Link
                        className="a"
                        to="#"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Remove
                      </Link>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  />
                </td>
                <td>${(item.price * item.qty).toFixed(2)}</td>
              </tr>
            ))}
          </table>
          <div className="total-price">
            <table>
              <tr>
                <td>Total</td>
                <td>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </td>
              </tr>
            </table>
          </div>
          <div className="inputBx">
            <input
              type="submit"
              value="Proceed to buy"
              name=""
              onClick={checkoutHandler}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
