import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { useRecoilValue } from "recoil";
import { authState } from "./state/atom";

function App() {

  const auth = useRecoilValue(authState);

  return (
    <Router>
      <Routes>
        <Route path="/" element={auth.isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
