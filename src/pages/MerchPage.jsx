import { useContext, useEffect } from "react"
import { MerchContext } from "../context/merch.context" 
import { Link } from "react-router-dom"

const AllMerch = () => {

    const { merch, getMerch } = useContext(MerchContext)

    useEffect(() => {

        getMerch()

    }, [])

  return (
    <div id="all-merch"> 
        <h1>All merch</h1>

        {
            merch.map((merch) => {
                return (
                    <Link to={`/merch-details/${merch._id}`} key={merch._id}>
                        <div>
                            
                            <img id="itemImg" src={merch.image} alt="item" />
                            <h3> {merch.name} </h3>
                            <p>{merch.cost} USD</p>

                        </div>
                    </Link>
                )
            })
        }
    </div>
  )
}

export default AllMerch