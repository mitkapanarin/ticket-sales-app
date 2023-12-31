import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  ErrorPage,
  Login,
  Signup,
  BookMark,
  PurchaseHistory,
  Events,
  Profile,
  EventDetailsPage,
  MusicalConcerts,
  StandUpComedies,
  DisplaySearchResult,
  ShoppingCart,
  Checkout,
} from "./Pages";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoutes from "./Pages/utils/ProtectetRoutes";
// import EditEventModal from "./components/EditModal/EditEventModal";
import EditEventForm from "./Pages/EditEventForm";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const App = () => {
  const userRole: string = useSelector((x: RootState) => x.user.userRole);
  console.log("user role", userRole);

  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<div>Welcome</div>} />
          <Route
            path="/dashboard"
            element={userRole === "admin" ? <Home /> : <Navigate to="/" />}
          />
          <Route path="/events" element={<Events />} />
          <Route path="/musical-concerts" element={<MusicalConcerts />} />
          <Route path="/stand-up-comedies" element={<StandUpComedies />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/bookmark" element={<BookMark />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route
            path="/display-search-result"
            element={<DisplaySearchResult />}
          />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-event/:id" element={<EditEventForm />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
