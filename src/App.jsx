import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home";
import Myinformation from "./components/profile/Myinformation";
import Paninformation from "./components/profile/Paninformation";
import ApointmentAddressForm from "./components/profile/ApointmentAddressForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Home />} />
        <Route path="/profile" element={<Myinformation />} />
        <Route path="/profile/pan-information" element={<Paninformation />} />
        <Route path="/profile/add-apointment-address" element={<ApointmentAddressForm />} />
      </Routes>
    </Router>
  );
}

export default App;
