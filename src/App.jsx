
import { ApolloProvider } from "@apollo/client/react"
import Listings from "./Listing"
import { Navigate, Route, Routes } from "react-router"
import SignUp from "./SignUp"
import { ToastContainer } from "react-toastify"
import { graphqlClient } from "./graph-client"
import ListInfo from "./ListsInfo"
import LoginPage from "./LoginPage"

import FavoritesPage from "./FavoritesPage"
import BookingsPage from "./BookingsPage"
import Home from "./Homepage"

import AdminPage from "./AdminPage"
import AdminLogin from "./AdminPageLogin"


function App() {

  return (
    <>

      <ApolloProvider client={graphqlClient}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listingsInfo/:id" element={<ListInfo />} />


          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUp />} />

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/bookings" element={<BookingsPage />} />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </ApolloProvider>


    </>
  )
}

export default App





// function FaqatKirgan({ children }) {
//   const token = useAuthStore((s) => s.accessToken);
//   return token ? children : <Navigate to="/login" replace />;
// }

// function FaqatKirmagan({ children }) {
//   const token = useAuthStore((s) => s.accessToken);
//   return token ? <Navigate to="/" replace /> : children;
// }

// function FaqatAdmin({ children }) {
//   const { accessToken, user } = useAuthStore();
//   if (!accessToken) return <Navigate to="/login" replace />;
//   if (user?.role !== "ADMIN") return <Navigate to="/" replace />;
//   return children;
// }


