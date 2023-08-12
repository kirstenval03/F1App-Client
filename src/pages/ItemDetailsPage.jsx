import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ItemContext } from "../context/item.context";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import { post } from "../services/authService";

const ItemDetails = () => {
    const [item, setItem] = useState(null);
    const { items, getItems, setItems } = useContext(ItemContext);
    const { user } = useContext(AuthContext);
    const { cart, setCart } = useContext(CartContext);
    const { itemId } = useParams();
    const navigate = useNavigate();

    const isOwner = () => {
      return item && user && user._id === item.owner;
  };

    const deleteItem = () => {
        post(`/items/delete-item/${itemId}`, item)
            .then((response) => {
                let newItems = items.filter((item) => item._id !== response.data._id);
                setItems(newItems);
                navigate('/items');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addToCart = () => {
        if (user) {
            const body = {
                itemId,
                itemCost: item.cost,
                cartId: cart ? cart._id : null,
            };

            if (!cart) {
                post('/cart/create', body)
                    .then((response) => {
                        console.log("New cart", response.data);
                        setCart(response.data);
                        navigate('/cart');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                post('/cart/update', body)
                    .then((response) => {
                        console.log("Updated cart", response.data);
                        setCart(response.data);
                        navigate('/cart');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!items.length) {
                await getItems();
            }

            let thisItem = items.find((item) => item._id === itemId);
            setItem(thisItem);
        };

        fetchData();
    }, [itemId, items]);

    return (
<div id="item-details">
  

  {item ? (
    <div class="item-container1">
      <div class="item-buttons">
        {isOwner() ? (
          <>
            <Link to={`/edit-item/${item._id}`}>
              <button>Edit Item</button>
            </Link>
            <button onClick={deleteItem}>Remove Listing</button>
          </>
        ) : (
          <button onClick={addToCart}>
            {user ? "Add to Cart" : "Log in to Add to Cart"}
          </button>
        )}
      </div>

      <h3 class="item-name1">{item.name}</h3>
      <img id="itemImg1" src={item.image} alt="item" />
      <p class="item-details1">Size: {item.size}</p>
      <p class="item-details1">Description: {item.description}</p>
      <h5 class="item-cost1">$: {item.cost} usd</h5>
    </div>
  ) : (
    <p>Loading...</p>
  )}
</div>

    );
};

export default ItemDetails;