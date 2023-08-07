import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import { ItemContext } from "../context/item.context";

import { post } from "../services/authService";

// ITEM DETAILS
const ItemDetails = () => {
    const [item, setItem] = useState(null);

    const { items, getItems, setItems } = useContext(ItemContext);
    const { user } = useContext(AuthContext);
    const { cart, setCart } = useContext(CartContext);

    const { itemId } = useParams();
    const navigate = useNavigate();

    const isOwner = () => {
        return user._id === item.owner._id;
    }

//DELETE ITEM
    const deleteItem = () => {
        post(`/items/delete-item/${itemId}`, item)
            .then((response) => {
                let newItems = items.filter(item => item._id !== response.data._id);
                setItems(newItems);
                navigate('/all-items');
            })
            .catch((err) => {
                console.log(err);
            });
    }


// ADD TO CART
    const addToCart = () => {
        const body = {
            itemId,
            itemCost: item.cost,
            cartId: cart._id || item._id  
        };

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

    useEffect(() => {
        if (!items.length) {
            getItems();
        }

        let thisItem = item.find((item) => item._id === itemId);
        setItem(thisItem);
    }, [itemId, items]);

    return (
        <div>
            <h1>Item Details</h1>

            {item ? (
                <div>
                    {isOwner() ? (
                        <>
                            <Link to={`/edit-item/${item._id}`}>
                                <button>Edit Item</button>
                            </Link>
                            <button onClick={deleteItem}>Remove Listing</button>
                        </>
                    ) : (
                        <button onClick={addToCart}>Add to Cart</button>
                    )}
                    <h3>{item.name}</h3>
                    <img id="item-detail" src={item.image} alt="item" />
                    <p>{item.size}</p>
                    <p>{item.description}</p>
                    <h5>${item.cost}</h5>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ItemDetails;
