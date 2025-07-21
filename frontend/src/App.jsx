import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <Toaster />
      <div className="relative h-full w-full">
        <div
          className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient
        (125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
