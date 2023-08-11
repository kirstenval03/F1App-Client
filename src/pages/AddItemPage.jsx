import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

import { useNavigate } from "react-router-dom";
import { post } from "../services/authService";

import { isStaffUser } from "../utils/authUtils"; // Import the isStaffUser function

const AddItem = () => {
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState({
    owner: user?._id || "",
    name: "",
    image: "",
    size: "",
    description: "",
    cost: "",
  });

  const navigate = useNavigate();

  if (!isStaffUser(user)) {
    return <div>You do not have permission to access this page.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting item:", item);
  
    post("/items/new-item", item)  // This should be a POST request
      .then((response) => {
        console.log("New Item", response.data);
        navigate("/items"); // Redirect to items page after adding
      })
      .catch((err) => {
        console.log("Error adding item:", err);
      });
  };

  const handleTextChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNumberChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  return (
    <div id="new-item">
    <img id="TPh1" src="https://res.cloudinary.com/dhqplbne3/image/upload/v1691732909/Formula1-App/AITitle.png"></img>
  
    <form onSubmit={handleSubmit} className="AIform">
      <label className="AIlabel">Title:</label>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={handleTextChange}
        className="AIinput"
      />
      <label className="AIlabel">Image: </label>
      <input
        type="text"
        name="image"
        value={item.image}
        onChange={handleTextChange}
        className="AIinput"
      />
      <label className="AIlabel">Size: </label>
      <input
        type="text"
        name="size"
        value={item.size}
        onChange={handleTextChange}
        className="AIinput"
      />
      <label className="AIlabel">Description: </label>
      <input
        type="text"
        name="description"
        value={item.description}
        onChange={handleTextChange}
        className="AIinput"
      />
      <label className="AIlabel">Cost: </label>
      <input
        type="number"
        name="cost"
        value={item.cost}
        onChange={handleNumberChange}
        className="AIinput"
      />
      <button type="submit" className="AIbutton">
        List Item
      </button>
    </form>
  </div>
  
  );
};

export default AddItem;