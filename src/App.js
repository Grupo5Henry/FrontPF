// import './App.css';
import Home from "./components/user/home/home";
import NavBar from "./components/user/navBar/navBar";
import LogIn from "./components/user/logIn/logIn";
import SignIn from "./components/user/signIn/signIn";
import { Routes, Route } from "react-router-dom";
import Details from "./components/user/details/details";
import Landing from "./components/user/Landing/Landing";
import About from "./components/user/about/about";
import Profile from "./components/user/profile/profile";
import Favorites from "./components/user/favorites/favorites";
// import History from "./components/user/history/history";
import Cart from "./components/user/cart/cart";
import Error from "./components/user/error/error";

import { useSelector } from "react-redux";
import DirectionForm from "./components/user/formDirection";
import { CongratulationsCard } from "./components/user/CongratulationsCard/CongratulationsCard";

//ADMIN ROUTES
import AdminHome from "./components/Admin/AdminHome/AdminHome";
import List from "./components/Admin/List/List";
import Single from "./components/Admin/Single/Single";
import Ordenes from "./components/Admin/Ordenes/Ordenes";
import ListProducts from "./components/Admin/ListProducts/ListProducts.jsx";
import CreateBrand from "./components/Admin/CreateBrand/CreateBrand.jsx";
import NewProduct from "./components/Admin/NewProduct/NewProduct.jsx";
import FixProduct from "./components/Admin/FixProduct/FixProduct.jsx";
import AdminProductDetail from "./components/Admin/AdminProductDetail/AdminProductDetail";

import Footer1 from "./components/user/Footer/Footer";

//MODO OSCURO
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./components/Admin/context/darkModeContext.js";

//PAGINA DE REFRESH
import PageRefresh from "./components/services/PageRefresh";

function App() {
  const {darkMode} = useContext(DarkModeContext);

  const userState = useSelector((state) => state.user);
  if (userState.role == "admin") {
    return (
      <div className={darkMode ? "app dark" : "app"}>
        <header className="App-header">
          <Routes>
            <Route path="*" element={<AdminHome />} />
            <Route exact path="/home" element={<AdminHome />} />
            <Route exact path="/users" element={<List />} />
            <Route exact path="/users/:id" element={<Single />} />
            <Route exact path="/products" element={<ListProducts />} />
            <Route exact path="/products/:id" element={<Single />} />
            <Route exact path="/createProduct" element={<NewProduct />} />
            <Route exact path="/modifyProduct/:id" element={<FixProduct />} />
            <Route exact path="/orders" element={<Ordenes />} />
            <Route
              exact
              path="/products/detail/:id"
              element={<AdminProductDetail />}
            />
            <Route
              exact
              path="/createBrand-Category"
              element={<CreateBrand />}
            />
            {/* <Route path="*" element={<Error />} /> */}
          </Routes>
        </header>
      </div>
    );
  }
  if (userState.role == "user" || userState.role == "desconocido") {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/favorites" element={<Favorites />} />
            <Route exact path="/profile" element={<Profile />} />
            {/* <Route exact path="/history" element={<History />} /> */}
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/details" element={<Details />} />
            <Route exact path="/direction" element={<DirectionForm />} />
            {/* <Route exact path="/home/log-in" element={<LogIn />} /> */}
            {/* <Route exact path="/home/sign-in" element={<SignIn />} /> */}
            <Route exact path="/home/detail/:id" element={<Details />} />
            <Route exact path="/congrats" element={<CongratulationsCard />} />
            {/* {!userState.logged ? (
              <Route exact path="/home/sign-in" element={<SignIn />} />
            ) : null} */}
            <Route exact path="/home/details" element={<Details />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer1 />
        </header>
      </div>
    );
  } else {
    return (
      <Routes>
        <Route path="*" element={<PageRefresh />} />
      </Routes>
    );
  }
}
export default App;
