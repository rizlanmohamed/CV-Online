import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import Add_Profile from "./pages/Add_Profile";
// import "antd/dist/antd.css";
import "antd/dist/reset.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import PrivateRoutes from "./utils/PrivateRoutes";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="*" element="No page found" /> */}
      </Routes>

      <Main>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-profile" element={<Add_Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
    </div>
  );
}

export default App;
