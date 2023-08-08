import { Link } from "react-router-dom";

const ItemPreview = ({ item }) => {
    
  return (


        <Link to={`/item-details/${item._id}`}>
          <div>
            <img id="preview" src={item.image} alt="item" />
            <p>{item.size}</p>
            <p>{item.cost}</p>
          </div>
        </Link>


  );
};

export default ItemPreview;