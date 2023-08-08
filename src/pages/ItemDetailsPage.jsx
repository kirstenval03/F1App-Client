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
        return user && item && user._id === item.owner._id;
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
                cartId: cart ? cart._id : null
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
        if (!items.length) {
            getItems();
        }

        let thisItem = items.find((item) => item._id === itemId);
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
                            <button onClick={deleteItem}>Delete Item</button>
                        </>
                    ) : (
                        <>
                            {user ? (
                                <button onClick={addToCart}>Add to Cart</button>
                            ) : (
                                <p>Please <Link to="/login">log in</Link> to add this item to your cart.</p>
                            )}
                        </>
                    )}

                    <h3>{item.name}</h3>
                    <img id="itemImg" src={item.image} alt="item" />
                    <p>{item.size}</p>
                    <p>{item.description}</p>
                    <h5>${item.cost}</h5>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ItemDetails;