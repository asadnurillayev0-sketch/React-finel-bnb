
import { ApolloProvider } from "@apollo/client/react"
import Listings from "./Listing"
import { Navigate, Route, Routes } from "react-router"
import SignUp from "./SignUp"
import { ToastContainer } from "react-toastify"
import { graphqlClient } from "./graph-client"

import ListInfo from "./ListsInfo"
import FaqatKirmagan from "./FaqatKirmagan"
import FaqatKirgan from "./FaqatKirgan"
import FaqatAdmin from "./FaqatAdmin"
import LoginPage from "./LoginPage"
import AdminPage from "./AdminPage"
import FavoritesPage from "./FavoritesPage"
import BookingsPage from "./BookingsPage"
function App() {

  return (
    <>
 
      <ApolloProvider client={graphqlClient}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Listings />} />
  
     
          <Route path="/listingsInfo/:id" element={<ListInfo />} />


          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUp />} />

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/bookings" element={<BookingsPage />} />

          <Route path="/admin" element={<FaqatAdmin><AdminPage /></FaqatAdmin>} />
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


