import { useContext, useEffect } from "react"
import { ItemContext } from "../context/item.context" 
import { Link } from "react-router-dom"

const ItemsPage = () => {

    const { items, getItems } = useContext(ItemContext)

    useEffect(() => {

        getItems()

    }, [])

  return (
    <div id="all-items"> 
        <h1>All Merch</h1>

        {
            items.map((item) => {
                return (
                    <Link to={`/item-details/${item._id}`} key={item._id}>
                        <div>
                            
                            <img id="itemImg" src={item.image} alt="item" />
                            <h3> {item.name} </h3>
                            <p>{item.cost} USD</p>

                        </div>
                    </Link>
                )
            })
        }
    </div>
  )
}

export default ItemsPage