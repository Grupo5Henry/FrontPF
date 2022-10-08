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
import History from "./components/user/history/history";
import Cart from "./components/user/cart/cart";
import Error from "./components/user/error/error";
import CreateProduct from "./components/user/CreateProduct/CreateProduct";
import ModifyProduct from "./components/user/ModifyProduct/ModifyProduct";
import { useSelector } from "react-redux";
import DirectionForm from "./components/user/formDirection";
import { CongratulationsCard } from "./components/user/CongratulationsCard/CongratulationsCard";

//ADMIN ROUTES
import AdminHome from "./components/Admin/AdminHome/AdminHome";
import AdminUsers from "./components/Admin/AdminUsers/AdminUsers";
import List from "./components/Admin/List/List";
import Single from "./components/Admin/Single/Single";
import Ordenes from "./components/Admin/Ordenes/Ordenes";
import Footer1 from "./components/user/Footer/Footer";

console.log("Soy locale", localStorage.role);

function App() {
  const userState = useSelector((state) => state.user);

  return (
    <div className="App">
      {userState.role != "user" && userState.role != null ? (
        <header className="App-header">
          <Routes>
            <Route path="*" element={<AdminHome />} />
            {/* <Route exact path="/home" element={<AdminHome />} /> */}
            <Route exact path="/users" element={<List />} />
            <Route exact path="/users/:id" element={<Single />} />
            <Route exact path="/products" element={<List />} />
            <Route exact path="/products/:id" element={<Single />} />
            <Route exact path="/createProduct" element={<CreateProduct />} />
            <Route exact path="/modifyProduct" element={<ModifyProduct />} />
            <Route exact path="/orders" element={<Ordenes />} />
            {/* <Route path="*" element={<Error />} /> */}
          </Routes>
        </header>
      ) : (
        <header className="App-header">
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/favorites" element={<Favorites />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/history" element={<History />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/details" element={<Details />} />
            <Route exact path="/direction" element={<DirectionForm />} />
            <Route exact path="/home/log-in" element={<LogIn />} />
            <Route exact path="/home/sign-in" element={<SignIn />} />
            <Route exact path="/home/detail/:id" element={<Details />} />
            <Route exact path="/createProduct" element={<CreateProduct />} />
            <Route exact path="/modifyProduct" element={<ModifyProduct />} />
            <Route exact path="/congrats" element={<CongratulationsCard />} />
            {!userState.logged ? (
              <Route exact path="/home/sign-in" element={<SignIn />} />
            ) : null}
            <Route exact path="/home/details" element={<Details />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer1 />
        </header>
      )}
    </div>
  );
}

export default App;
