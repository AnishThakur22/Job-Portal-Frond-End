// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//       const [loading, setLoading] = useState(false);
//       const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     // alert(`Logging in as ${email}`);
//     setLoading(true)
//     try {
//       const response = await fetch('http://localhost:5000/api/users/login', {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password
//         })
//       })
//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || 'Registration failed');
//       }

//       console.log("data :", data);

//       if(data.success){
//         setEmail("")
//         setPassword("")
//         navigate("/dashboard")
//       }

//     } catch (error) {
//       console.log("error :", error)
//     }finally {
//       setLoading(false)
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="col-md-4 col-lg-4">
//         <div className="card shadow-lg border-0 rounded-3">
//           <div className="card-body p-4">
//             <h3 className="text-center mb-3 fw-bold text-primary">Welcome Back!</h3>
//             <p className="text-center text-muted mb-4">
//               Login to your <strong>Elevate Workforce</strong> account
//             </p>

//             <form onSubmit={handleLogin}>
//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Email Address</label>
//                 <input
//                   type="email"
//                   className="form-control form-control-lg"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Password</label>
//                 <input
//                   type="password"
//                   className="form-control form-control-lg"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <div className="form-check">
//                   <input type="checkbox" className="form-check-input" id="rememberMe" />
//                   <label className="form-check-label" htmlFor="rememberMe">
//                     Remember me
//                   </label>
//                 </div>
//                 <a href="#" className="text-decoration-none text-primary small">
//                   Forgot password?
//                 </a>
//               </div>

//               <button className="btn btn-primary w-100 py-2 fw-semibold shadow-sm">
//                 Login
//               </button>
//             </form>

//             <hr className="my-4" />

//             <div className="text-center">
//               <p className="mb-0">
//                 Don’t have an account?{" "}
//                 <a href="/register" className="text-decoration-none text-primary fw-semibold">
//                   Register Now
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await login(email, password);

    if (!res.success) {
      alert(res.message);
    }else{
      navigate('/dashboard')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Login
        </h2>
        <p className="text-gray-600 text-center mt-1">
          Access your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg 
                       font-semibold text-lg hover:bg-blue-700 
                       transition-all"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
