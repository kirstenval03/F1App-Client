
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { get } from "../services/authService";

const ItemContext = createContext()

const ItemProvider = ({ children }) => {

    const [items, setItems] = useState([])

    const getItems = () => {

        get('/items')
            .then((response) => {
                console.log("Items", response.data)
                setItems(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <ItemContext.Provider value={{ items, getItems, setItems}}>
            {children}
        </ItemContext.Provider>
    )
}

export { ItemContext, ItemProvider }
