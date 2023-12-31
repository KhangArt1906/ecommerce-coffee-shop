import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import NewProduct from "./pages/NewProduct";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import EditProductPage from "./pages/EditProductPage";
import AdminDashboard from "./pages/AdminDashboard";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { addNotification } from "./features/userSlice";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io("ws://localhost:8080");
    socket.off("notification").on("notification", (msgObj, user_id) => {
      //login for notification
      if (user_id === user._id) {
        dispatch(addNotification(msgObj));
      }
    });

    socket.off("new-order").on("new-order", (msgObj) => {
      if (user.isAdmin == true && user.isAdmin) {
        dispatch(addNotification(msgObj));
      }
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}

          {user && (
            <>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/orders" element={<OrdersPage />}></Route>
            </>
          )}

          {user && user.isAdmin && (
            <>
              <Route path="/admin" element={<AdminDashboard />}></Route>
              <Route
                path="/product/:id/edit"
                element={<EditProductPage />}
              ></Route>
            </>
          )}
          <Route path="/product/:id" element={<ProductPage />} />

          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/new-product" element={<NewProduct />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
