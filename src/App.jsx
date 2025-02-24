import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home";
import Myinformation from "./components/profile/Myinformation";
import Paninformation from "./components/profile/Paninformation";
import ApointmentAddressForm from "./components/profile/ApointmentAddressForm";
import ApointmentHome from "./components/apointment/ApointmentHome";
import IsAuthenticated from "./components/middleware/IsAuthenticated";
import Pagenotfound from "./components/apointment/Pagenotfound";

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
        <Route path="/login" element={<Home />} />
        <Route
          path="/profile"
          element={
            <IsAuthenticated>
              <Myinformation />
            </IsAuthenticated>
          }
        />
        <Route
          path="/profile/pan-information"
          element={
            <IsAuthenticated>
              <Paninformation />
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
          path="/apointment"
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
