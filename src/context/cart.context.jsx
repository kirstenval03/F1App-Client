import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./auth.context";

import { get } from "../services/authService";

const CartContext = createContext()

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(null)

    const { user } = useContext(AuthContext)

    useEffect(() => {

        get('/cart')
            .then((response) => {
                console.log("CART ======>", response.data)
                setCart(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [user])


    return (
        <CartContext.Provider value={{ cart, setCart }} >
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }
