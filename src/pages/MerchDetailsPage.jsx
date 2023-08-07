import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MerchContext } from "../context/merch.context";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";

import { post } from "../services/authService";

const MerchDetails = () => {
    const [merch, setMerch] = useState(null);

    const { merchs, getMerchs, setMerchs } = useContext(MerchContext);
    const { user } = useContext(AuthContext);
    const { cart, setCart } = useContext(CartContext);

    const { merchId } = useParams();
    const navigate = useNavigate();

    const isOwner = () => {
        return user._id === merch.owner._id;
    }

    const deleteMerch = () => {
        post(`/merch/delete-merch/${merchId}`, merch)
            .then((response) => {
                let newMerchs = merchs.filter(merch => merch._id !== response.data._id);
                setMerchs(newMerchs);
                navigate('/all-merch');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const addToCart = () => {
        const body = {
            merchId,
            merchCost: merch.cost,
            cartId: cart._id || merch._id  // If cart._id doesn't exist, use merch._id as cartId
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
        if (!merchs.length) {
            getMerchs();
        }

        let thisMerch = merchs.find((merch) => merch._id === merchId);
        setMerch(thisMerch);
    }, [merchId, merchs]);

    return (
        <div>
            <h1>Item Details</h1>

            {merch ? (
                <div>
                    {isOwner() ? (
                        <>
                            <Link to={`/edit-merch/${merch._id}`}>
                                <button>Edit Item</button>
                            </Link>
                            <button onClick={deleteMerch}>Remove Listing</button>
                        </>
                    ) : (
                        <button onClick={addToCart}>Add to Cart</button>
                    )}
                    <h3>{merch.name}</h3>
                    <img id="merch-detail" src={merch.image} alt="merch" />
                    <p>{merch.size}</p>
                    <p>{merch.description}</p>
                    <h5>${merch.cost}</h5>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MerchDetails;
