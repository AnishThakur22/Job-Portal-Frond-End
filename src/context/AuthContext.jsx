// import { createContext, useReducer, useEffect } from "react";
// import Cookies from "js-cookie";

// const initialState = {
//   user: null,
//   token: Cookies.get("token") || null,
//   isAuthenticated: !!Cookies.get("token"),
//   loading: true,
// };

// function authReducer(state, action) {
//   switch (action.type) {
//     case "LOGIN_SUCCESS":
//       return {
//         ...state,
//         user: action.payload.user,
//         token: action.payload.token,
//         isAuthenticated: true,
//         loading: false,
//       };

//     case "LOAD_USER":
//       return {
//         ...state,
//         user: action.payload.user,
//         isAuthenticated: true,
//         loading: false,
//       };

//     case "LOGOUT":
//       return {
//         ...state,
//         user: null,
//         token: null,
//         isAuthenticated: false,
//         loading: false,
//       };

//     case "AUTH_DONE":
//       return { ...state, loading: false };

//     default:
//       return state;
//   }
// }

// // ======================= Context =======================
// export const AuthContext = createContext();

// // ======================= Provider =======================
// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   // Load user from token on page refresh
//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (!token) {
//       dispatch({ type: "AUTH_DONE" });
//       return;
//     }

//     async function getUser() {
//       try {
//         const res = await fetch("http://localhost:5000/api/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!res.ok) throw new Error("Failed to load user");

//         const data = await res.json();
//         dispatch({ type: "LOAD_USER", payload: { user: data.user } });
//       } catch (err) {
//         console.error(err);
//         Cookies.remove("token");
//         dispatch({ type: "AUTH_DONE" });
//       }
//     }

//     getUser();
//   }, []);

//   // Login function
//   const login = async (email, password) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Login failed");

//       Cookies.set("token", data.token, { expires: 7 }); // Save 7 days

//       dispatch({
//         type: "LOGIN_SUCCESS",
//         payload: { user: data.user, token: data.token },
//       });

//       return { success: true };
//     } catch (err) {
//       return { success: false, message: err.message };
//     }
//   };

//   // Logout
//   const logout = () => {
//     Cookies.remove("token");
//     dispatch({ type: "LOGOUT" });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useReducer, useEffect } from "react";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: Cookies.get("token") || null,
  isAuthenticated: !!Cookies.get("token"),
  loading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case "LOAD_USER":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };

    case "AUTH_ERROR":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      dispatch({ type: "AUTH_ERROR" });
      return;
    }

    async function loadUser() {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) throw new Error("Invalid token");

        dispatch({
          type: "LOAD_USER",
          payload: { user: data.user },
        });
      } catch (err) {
        Cookies.remove("token");
        dispatch({ type: "AUTH_ERROR" });
      }
    }

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      Cookies.set("token", data.token, { expires: 7 });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: data.user, token: data.token },
      });

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    Cookies.remove("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
