import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { RecoilRoot, useRecoilValue } from "recoil";
import { authState } from "./state/atom";
import { SharedBrainView } from "./components/SharedBrainView";
import "./index.css";
import { ThemeProvider } from "./providers/ThemeProvider";

function AppWrapper() {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
}

function App() {
  const auth = useRecoilValue(authState);

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              auth.isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/brain/:shareLink" element={<SharedBrainView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppWrapper;
