import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cart.context";
import { post } from "../services/authService";
import ItemPreview from "../components/ItemPreview";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const removeItem = (id) => {
    console.log("Removing", id);

    post(`/cart/remove-item/${id}`, cart)
      .then((response) => {
        console.log("Removed", response.data);
        setCart(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Your Cart</h1>

      {cart ? (
        <div>
          {cart.items.length === 0 ? (
            <div>
              <h3>Your cart is empty</h3>
              <p>
                See all the merchandise and <Link to="/items">add something</Link>.
              </p>
            </div>
          ) : (
            <div>
              {cart.items.map((item) => (
                <div key={item._id}>
                  <ItemPreview item={item} />
                  <button onClick={() => removeItem(item._id)}>Remove</button>
                </div>
              ))}
              <h5>Subtotal: ${cart.subtotal}</h5>
              <h5>Shipping: $ 10</h5>
              <h4>Total: ${cart.total.toFixed(2)}</h4>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Cart;