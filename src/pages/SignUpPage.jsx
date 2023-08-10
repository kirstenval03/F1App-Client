// src/pages/SignupPage.jsx

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

import { post } from "../services/authService";



function SignUpPage() {

  const [user, setUser] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
  })

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    post('/auth/signup', user)
      .then((response) => {
        console.log('JWT token', response.data.authToken);
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/');
      })
      .catch((error) => {
        console.log("Error", error)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };


  return (
    <div className="SignupPage">

      <div className="SPcontainer1">
        <h1 id="SPh1">Hello speed lover!</h1>

        <form onSubmit={handleSignupSubmit} id="SPcontainer2">

          <div id="SPlabel1">

            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15" fill="none">
              <path d="M12.25 12.8V11.6C12.25 10.9635 11.9972 10.353 11.5471 9.90293C11.097 9.45284 10.4865 9.19998 9.85002 9.19998H5.05002C4.4135 9.19998 3.80306 9.45284 3.35297 9.90293C2.90288 10.353 2.65002 10.9635 2.65002 11.6V12.8" stroke="#00507C" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7.45005 6.8C8.77553 6.8 9.85005 5.72548 9.85005 4.4C9.85005 3.07452 8.77553 2 7.45005 2C6.12457 2 5.05005 3.07452 5.05005 4.4C5.05005 5.72548 6.12457 6.8 7.45005 6.8Z" stroke="#00507C" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <label id="SPlabel">Full Name:</label>

            <input 
              id="SPform"
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleTextChange}
            />

          </div>
          <br />

          <div id="SPlabel1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15" fill="none">
              <g clip-path="url(#clip0_1_26)">
                <path d="M2.5999 2.8H12.1999C12.8599 2.8 13.3999 3.34 13.3999 4V11.2C13.3999 11.86 12.8599 12.4 12.1999 12.4H2.5999C1.9399 12.4 1.3999 11.86 1.3999 11.2V4C1.3999 3.34 1.9399 2.8 2.5999 2.8Z" stroke="#00507C" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.3999 4.00002L7.3999 8.20002L1.3999 4.00002" stroke="#00507C" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_1_26">
                  <rect width="14.4" height="14.4" fill="white" transform="translate(0.199951 0.400009)" />
                </clipPath>
              </defs>
            </svg>
            <label id="SPlabel">Email:</label>
            <input 
              id="SPform"
              type="email"
              name="email"
              value={user.email}
              onChange={handleTextChange}
            />
          </div>
          <br />

          <div id="SPlabel1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15" fill="none">
              <path d="M12.2 13V11.8C12.2 11.1635 11.9471 10.553 11.497 10.103C11.0469 9.65287 10.4365 9.40001 9.79998 9.40001H4.99998C4.36346 9.40001 3.75301 9.65287 3.30292 10.103C2.85283 10.553 2.59998 11.1635 2.59998 11.8V13" stroke="#00507C" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7.4 7.00001C8.72548 7.00001 9.8 5.9255 9.8 4.60001C9.8 3.27453 8.72548 2.20001 7.4 2.20001C6.07452 2.20001 5 3.27453 5 4.60001C5 5.9255 6.07452 7.00001 7.4 7.00001Z" stroke="#00507C" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <label id="SPlabel">Username:</label>

            <div>
              <input 
                id="SPform"
                type="text"
                name="username"
                value={user.username}
                onChange={handleTextChange}
              />
            </div>
          </div>
          <br />

          <div id="SPlabel1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15" fill="none">
              <g clip-path="url(#clip0_1_19)">
                <path d="M11.6 7.00001H3.2C2.53726 7.00001 2 7.53727 2 8.20001V12.4C2 13.0628 2.53726 13.6 3.2 13.6H11.6C12.2627 13.6 12.8 13.0628 12.8 12.4V8.20001C12.8 7.53727 12.2627 7.00001 11.6 7.00001Z" stroke="#00507C" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4.3999 7.00001V4.60001C4.3999 3.80436 4.71597 3.0413 5.27858 2.47869C5.84119 1.91608 6.60425 1.60001 7.3999 1.60001C8.19555 1.60001 8.95861 1.91608 9.52122 2.47869C10.0838 3.0413 10.3999 3.80436 10.3999 4.60001V7.00001" stroke="#00507C" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_1_19">
                  <rect width="14.4" height="14.4" fill="white" transform="translate(0.199951 0.400014)" />
                </clipPath>
              </defs>
            </svg>
            <label id="SPlabel">Password:</label>
            <input 
              id="SPform"
              type="password"
              name="password"
              value={user.password}
              onChange={handleTextChange}
            />
          </div>
          <br />
          <div id="SPbuttoncontainer">
            <button type="submit" id="SPbutton">Sign Up</button>
          </div>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div id="SPmessage">
          <p>Already have account?</p>
          <Link to="/login"> Login</Link>
        </div>


      </div>
      <img id="SPgif" src="https://res.cloudinary.com/dhqplbne3/image/upload/v1691677029/Formula1-App/F1_SignUp.gif"></img>

    </div>
  )
}

export default SignUpPage;