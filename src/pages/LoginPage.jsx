// src/pages/LoginPage.jsx

import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

import { Link, useNavigate } from "react-router-dom";

import { post } from "../services/authService";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext)


  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    post('/auth/login', requestBody)
      .then((response) => {

        console.log('JWT token', response.data.authToken);
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/');                             // <== ADD      
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div className="LoginPage">

      <div className="LIcontainer1">

        <h1 id="LIh1">Login</h1>
        <br />

        <form onSubmit={handleLoginSubmit} id="LIcontainer2">

          <div id="LIlabel1">
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
            <label id="LIlabel">Email:</label>
            <input
              id="LIform"
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <br />

          <div id="LIlabel1">
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
            <label id="LIlabel">Password:</label>
            <input
              id="LIform"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <br />
          <br />
          
          <div id="LIbuttoncontainer">
            <button type="submit" id="LIbutton">Login</button>
          </div>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div id="LImessage">
          <p>Don't have an account yet?</p>
          <Link to="/signup"> Sign Up</Link>
        </div>


      </div>
      <img id="LIgif" src="https://res.cloudinary.com/dhqplbne3/image/upload/v1691692987/Formula1-App/F1LogInGIF.gif"></img>

    </div>
  )
}

export default LoginPage;