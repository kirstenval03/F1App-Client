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
      <Link to="/">
        <button>Home</button>
      </Link>

      {getToken() && (
        <>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>

          {isLoggedIn && isStaffUser(user) && (
            <Link to="/item/add-item">
              <button>Add Item</button>
            </Link>
          )}
        </>
      )}

      {!getToken() && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}

      <Link to="/item">
        <button style={{ marginLeft: "auto" }}>Merch</button>
      </Link>
    </nav>
  );
}

export default Navbar;
