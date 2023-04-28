import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import Add_Profile from "./pages/Add_Profile";
// import "antd/dist/antd.css";
import "antd/dist/reset.css";

import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>

      <Main>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/rtl" element={<Rtl />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-profile" element={<Add_Profile />} />
          <Route from="*" to="/dashboard" />
        </Routes>
      </Main>
    </div>
  );
}

export default App;
