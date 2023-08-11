import { useContext, useEffect } from "react"
import { ItemContext } from "../context/item.context"
import { Link } from "react-router-dom"

import ItemPreview from "../components/ItemPreview"

const ItemsPage = () => {

    const { items, getItems } = useContext(ItemContext)

    useEffect(() => {

        getItems()

    }, [])

    return (
        <div id="all-items">
            <h1 id="allItemsHeading">
                <img id="TPh1" src="https://res.cloudinary.com/dhqplbne3/image/upload/v1691730981/Formula1-App/AMtitle.png"></img>
            </h1>
            <div class="item-list">
                {items.map((item) => (
                    <Link to={`/item-details/${item._id}`} class="item-link" key={item._id}>
                        <div class="item-card">
                            <img class="item-image" src={item.image} alt="item" />
                            <h3 class="item-name">{item.name}</h3>
                            <p class="item-cost"> $ {item.cost} USD</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>



    )
}

export default ItemsPage