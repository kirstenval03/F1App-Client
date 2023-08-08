import { useContext } from "react"
import { CartContext } from "../context/cart.context"

import { post } from "../services/authService"

import ItemPreview from "../components/ItemPreview"

const Cart = () => {

  const { cart, setCart } = useContext(CartContext)

  const removeItem = (id) => {
    
    console.log("Removing", id)

    post(`/cart/remove-item/${id}`, cart)
      .then((response) => {
        console.log("Removed", response.data)
        setCart(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  
  }

  const getPercentage = (num) => {

    return `${(num * 100) % 100}%`
    
  }


  return (
    <div>

      <h1>Your Cart</h1>
    
      { cart ?
      
      
      <>
        {
          cart.message ? 
          
              <h3>{cart.message}</h3>

            : 

            <div>

              {cart.items.map((item) => {
                return (
                  <div key={item._id}>
                    <ItemPreview item={item} />
                    <button onClick={()=>removeItem(item._id)} >Remove</button>
                  </div>
                )
              })}

              <h5>Subtotal: ${cart.subtotal}</h5>
              <h5>Tax: {getPercentage(cart.tax)}</h5>
              <h4>Total: ${cart.total.toFixed(2)}</h4>

            </div>
          
        }

      </>

      : <p>Loading...</p>
      }
    
    </div>

  )
}

export default Cart

