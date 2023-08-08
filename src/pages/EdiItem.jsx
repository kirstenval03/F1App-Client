import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ItemContext } from "../context/item.context" 

import { get, post } from "../services/authService"


const EditItem = () => {

    const [item, setItem] = useState(null)

    const { items, setItems } = useContext(ItemContext)

    const { itemId } = useParams()

    const navigate = useNavigate()


    const handleTextChange = (e) => {
        setItem((prev) => ({...prev, [e.target.name]: e.target.value}))
      }

    const handleNumberChange = (e) => {
        setItem((prev) => ({...prev, [e.target.name]: Number(e.target.value)}))
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        post(`/items/item-update/${itemId}`, item)
            .then((response) => {

                let newItems = [...items]
                let itemIndex = items.findIndex(item => item._id === response.data._id)
                newItems[itemIndex] = response.data
                
                setItems(newItems)

                navigate(`/item-details/${response.data._id}`)
            })
            .catch((err) => {
                console.log(err)
            })


    }

    useEffect(() => {

        if(!items.length) {

            get(`/items/item-detail/${itemId}`)
                .then((response) => {
                    console.log("Found item", response.data)
                    setItem(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })

        } else {

            let thisItem = items.find((item) => item._id === itemId)
    
            setItem(thisItem)
        }

    }, [])

  return (
    <div>
       <h1>Edit Item</h1>

       {item ? 
       
       <form onSubmit={handleSubmit}>

            <label>Image</label>
            <input type="text" name="image" value={item.image} onChange={handleTextChange} /> 

            <label>Size</label>
            <input type="text" name="size" value={item.size} onChange={handleTextChange} /> 

            <label>Description</label>
            <input type="text" name="description" value={item.description} onChange={handleTextChange} /> 

            <label>Cost</label>
            <input type="number" name="cost" value={item.cost} onChange={handleNumberChange} /> 

            <button type="submit">Update Item</button>

       </form>

       : <p>Loading...</p>
       
       }

    </div>
  )
}

export default EditItem