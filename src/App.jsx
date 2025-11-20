import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PostJob from "./components/PostJob";
import JobDetails from "./components/JobDetails";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <Router>
      <div className="grid grid-rows-[1fr_auto_1fr] h-[100vh]">
        <Navbar />
        <div className="container mt-4 h-full py-[100px]">

          <Routes>
            <Route path="/" element={<Home />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/post-job"
              element={
                <PrivateRoute>
                  <PostJob />
                </PrivateRoute>
              }
            />

            {/* Public Job Detail route */}
            <Route path="/job/:id" element={<JobDetails />} />
          </Routes>

        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;