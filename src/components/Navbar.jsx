import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { isStaffUser } from "../utils/authUtils";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  return (

    <nav style={{ display: "flex", alignItems: "center" }}>
      <img id="NBlogo" src="https://res.cloudinary.com/dhqplbne3/image/upload/v1691693497/Formula1-App/F1LogoHP.gif"></img>
      <div id="NBbuttons">
      
      <Link to="/">
        <button>Home</button>
      </Link>

      {getToken() ? (
        <>
          {isLoggedIn && (
            <>
              <button onClick={logOutUser}>Logout</button>
              <span>{user && user.name}</span>

              {isStaffUser(user) && (
                <Link to="/item/new-item">
                  <button>Add Item</button>
                </Link>
              )}
            </>
          )}

          <Link to="/cart">
            <button>Your Cart</button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Log In</button>
          </Link>
        </>
      )}

      <Link to="/items">
        <button style={{ marginLeft: "auto" }}>Merch</button>
      </Link>
      </div>

    </nav>
  );
}

export default Navbar;
