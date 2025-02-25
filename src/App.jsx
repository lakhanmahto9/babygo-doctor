import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home";
import Myinformation from "./components/profile/Myinformation";
import ApointmentAddressForm from "./components/profile/ApointmentAddressForm";
import ApointmentHome from "./components/apointment/ApointmentHome";
import IsAuthenticated from "./components/middleware/IsAuthenticated";
import Pagenotfound from "./components/apointment/Pagenotfound";
import Login from "./components/credentials/Login";
import Signup from "./components/credentials/Signup";
import Degree from "./components/profile/Degree";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <IsAuthenticated>
              <Dashboard />
            </IsAuthenticated>
          }
        />
        {/* <Route path="/login" element={<Home />} /> */}
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route
          path="/profile"
          element={
            <IsAuthenticated>
              <Myinformation />
            </IsAuthenticated>
          }
        />
        <Route
          path="/profile/degree-and-certification"
          element={
            <IsAuthenticated>
              <Degree />
            </IsAuthenticated>
          }
        />
        <Route
          path="/profile/add-apointment-address"
          element={
            <IsAuthenticated>
              <ApointmentAddressForm />
            </IsAuthenticated>
          }
        />
        <Route
          path="/appointment"
          element={
            <IsAuthenticated>
              <ApointmentHome />
            </IsAuthenticated>
          }
        />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </Router>
  );
}

export default App;
