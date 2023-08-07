import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { isStaffUser } from "../utils/authUtils"; // Import the isStaffUser function

const AddItem = () => {
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState({
    owner: user?._id || "", // Ensure user._id is not null or undefined
    name: "",
    image: "",
    size: "",
    description: "",
    cost: 0,
  });

  const navigate = useNavigate();

  // Add a check for staff user
  if (!isStaffUser(user)) {
    return <div>You do not have permission to access this page.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/items/new-item", item)
      .then((response) => {
        console.log("New Item", response.data);
        navigate("/items");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTextChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNumberChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  return (
    <div id="add-item" >
        <h1>Add a new item to the store</h1>

        <form onSubmit={handleSubmit}>

            <label>Name</label>
            <input type="text" name="name" value={item.name} onChange={handleTextChange} /> 

            <label>Image</label>
            <input type="text" name="image" value={item.image} onChange={handleTextChange} /> 

            <label>Size</label>
            <input type="text" name="size" value={item.size} onChange={handleTextChange} /> 

            <label>Description</label>
            <input type="text" name="description" value={item.description} onChange={handleTextChange} /> 


            <label>Cost</label>
            <input type="number" name="cost" value={item.cost} onChange={handleNumberChange} /> 

            <button type="submit">List Item</button>

        </form>
    </div>
  )
}

export default AddItem

