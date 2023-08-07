import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CurrentSeason from "./pages/CurrentSeasonPage";
import TeamsPage from "./pages/TeamsPage";
import DriverDetailsPage from "./pages/DriverDetailsPage";
import MerchPage from "./pages/MerchPage";
import AddMerch from "./pages/AddMerchPage";
import MerchDetailsPage from "./pages/MerchDetailsPage";

function App() {

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/login' />
  }

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />
  }

  return (
    <div className="App">

      <Navbar />

      {/* ROUTES  */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<LoggedIn />}>
        </Route>

        <Route element={<NotLoggedIn />}>

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Route>

        <Route path="/current-season" element={<CurrentSeason/>}></Route>
        <Route path="/teams" element={<TeamsPage/>}></Route>
        <Route path="/driver-details/:driverId" element={<DriverDetailsPage/>}></Route>
        <Route path="/merch" element={<MerchPage/>}></Route>
        <Route path="/merch/add-merch" element={<AddMerch/>}></Route>
        <Route path="/merch-details/:merchId" element={<MerchDetailsPage/>}></Route>


      </Routes>

    </div>
  );
}
export default App;