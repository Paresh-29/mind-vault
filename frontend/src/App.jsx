import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { RecoilRoot, useRecoilValue } from "recoil";
import { authState } from "./state/atom";
import { SharedBrainView } from "./components/SharedBrainView";
import "./index.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { TypewriterEffectSmoothDemo } from "./pages/HomePage";
function AppWrapper() {
    return (<RecoilRoot>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </RecoilRoot>);
}
function App() {
    const auth = useRecoilValue(authState);
    return (<div className="app-container">
            <Router>
                <Routes>
                    <Route path="/" element={auth.isAuthenticated ? (<Dashboard />) : (<TypewriterEffectSmoothDemo />)}/>
                    <Route path="/dashboard" element={auth.isAuthenticated ? (<Dashboard />) : (<TypewriterEffectSmoothDemo />)}/>
                    <Route path="/signin" element={auth.isAuthenticated ? <Dashboard /> : <Signin />}/>
                    <Route path="/signup" element={auth.isAuthenticated ? <Dashboard /> : <Signup />}/>
                    <Route path="/brain/:shareLink" element={<SharedBrainView />}/>
                </Routes>
            </Router>
        </div>);
}
export default AppWrapper;
