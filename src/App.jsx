import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CurrentSeason from "./pages/CurrentSeasonPage";
import TeamsPage from "./pages/TeamsPage";
import DriverDetailsPage from "./pages/DriverDetailsPage";
import ItemsPage from "./pages/ItemsPage";
import AddItem from "./pages/AddItemPage";
import ItemDetails from "./pages/ItemDetailsPage";




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
        <Route path="items" element={<ItemsPage/> }></Route>
        <Route path="/add-item" element={<AddItem/>}></Route>
        <Route path="/item-details/:itemId" element={<ItemDetails/>}></Route>

      </Routes>

    </div>
  );
}
export default App;