import { Link } from "react-router-dom";

const ItemPreview = ({ item }) => {
    
  return (


        <Link to={`/item-details/${item._id}`}>
          <div>
            <h3>{item.name}</h3>
            <img id="itemImg" src={item.image} alt="item" />
            <p>Size: {item.size}</p>
            <p>Cost: {item.cost}</p>
          </div>
        </Link>


  );
};

export default ItemPreview;