
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { get } from "../services/authService";

const MerchContext = createContext()

const MerchProvider = ({ children }) => {

    const [merch, setMerch] = useState([])

    const getMerch = () => {

        get('/merch')
            .then((response) => {
                console.log("Merch", response.data)
                setMerch(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <MerchContext.Provider value={{ merch, getMerch, setMerch}}>
            {children}
        </MerchContext.Provider>
    )
}

export { MerchContext, MerchProvider }