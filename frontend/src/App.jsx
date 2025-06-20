import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./pages/Authentication/Login.page";
import Signup from "./pages/Authentication/Signup.page";
import Dashboard from "./pages/Home/Dashboard.page";
import Interview from "./pages/Interview/Interview.page";
import Landing from "./pages/Landing.page";
import UserProvider from "./context/userContext.context";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<Landing />} />

            {/* Login Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Dashboard Route */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Interview Route */}
            <Route path="/interviews/:sessionId" element={<Interview />} />
          </Routes>
        </Router>

        {/* Toast notifications */}
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;
