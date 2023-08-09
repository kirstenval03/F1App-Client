import React, { useContext } from "react";
import { post } from "../services/authService";
import { CartContext } from "../context/cart.context";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const cartId = cart._id;

  const groupedItems = cart.items
    ? cart.items.reduce((groupedItems, item) => {
        if (!groupedItems[item._id]) {
          groupedItems[item._id] = {
            ...item,
            quantity: 1,
          };
        } else {
          groupedItems[item._id].quantity++;
        }
        return groupedItems;
      }, {})
    : {};

  const proceedToPayment = () => {
    post(`/stripe/create-checkout-session/${cart._id}`, groupedItems)
      .then((response) => {
        console.log("STRIPE URL:", response.data);
        const url = response.data.url;
        setCart(null);
        window.location.href = url;
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const deleteFromCart = (_id) => {
    post(`/cart/remove-item/${_id}`, cartId)
      .then((response) => {
        console.log("Updated cart:", response.data);
        if (!response.data.items.length) {
          setCart(null);
        }
        setCart(response.data);
        navigate("/cart");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const decreaseItem = (_id) => {
    post(`/cart/decrease-item/${_id}`, cartId)
      .then((response) => {
        console.log("Updated cart:", response.data);
        if (!response.data.items.length) {
          setCart(null);
        }
        setCart(response.data);
        navigate("/cart");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div>
      {cart.items && cart.items.length ? (
        <div>
          {Object.values(groupedItems).map((groupedItem) => {
            const { _id, name, cost, image, quantity } = groupedItem;
            return (
              <div key={_id}>
                <Link to={`/item-details/${_id}`}>
                  <h3>{name}</h3>
                </Link>
                <img id="itemImg" src={image} alt="item" />
                <h3>$ {cost} usd</h3>
                <p>Quantity: {quantity}</p>
                <button onClick={() => decreaseItem(_id)}>-1 item</button>
                <button onClick={() => deleteFromCart(_id)}>Remove item</button>
              </div>
            );
          })}

          <p>Your purchase summary:</p>
          <p>Subtotal: $ {cart.subtotal} </p>
          <p>Shipping: $10</p>
          <p>Total: $ {cart.total} </p>
          <button onClick={proceedToPayment}>Proceed to checkout</button>
        </div>
      ) : (
        <div>
          <h3>Your cart is empty</h3>
          <p>
            See all the merch and <Link to="/items">add something</Link>.
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
