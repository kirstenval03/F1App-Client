import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { isStaffUser } from "../utils/authUtils"; // Import the isStaffUser function

const AddMerch = () => {
  const { user } = useContext(AuthContext);
  const [merch, setMerch] = useState({
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

    post("/merch/new-merch", merch)
      .then((response) => {
        console.log("New Merch", response.data);
        navigate("/merch");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTextChange = (e) => {
    setMerch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNumberChange = (e) => {
    setMerch((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  return (
    <div id="add-sock" >
        <h1>Add a new item to the store</h1>

        <form onSubmit={handleSubmit}>

            <label>Name</label>
            <input type="text" name="name" value={merch.name} onChange={handleTextChange} /> 

            <label>Image</label>
            <input type="text" name="image" value={merch.image} onChange={handleTextChange} /> 

            <label>Size</label>
            <input type="text" name="size" value={merch.size} onChange={handleTextChange} /> 

            <label>Description</label>
            <input type="text" name="description" value={merch.description} onChange={handleTextChange} /> 


            <label>Cost</label>
            <input type="number" name="cost" value={merch.cost} onChange={handleNumberChange} /> 

            <button type="submit">List Item</button>

        </form>
    </div>
  )
}

export default AddMerch

