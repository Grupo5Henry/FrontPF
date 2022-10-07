// import './App.css';
import Home from './components/user/home/home';
import NavBar from './components/user/navBar/navBar';
import { Routes, Route } from 'react-router-dom';
import Details from './components/user/details/details';
import Landing from './components/user/Landing/Landing';
import About from './components/user/about/about';
import Profile from './components/user/profile/profile';
import Favorites from './components/user/favorites/favorites';
import Cart from './components/user/cart/cart';
import Error from './components/user/error/error';
import CreateProduct from './components/user/CreateProduct/CreateProduct';
import ModifyProduct from './components/user/ModifyProduct/ModifyProduct';




function App() {


  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/favorites' element={<Favorites/>} />
          <Route path='/profile/*' element={<Profile/>} />
          <Route exact path='/cart' element={<Cart/>} />
          <Route exact path='/details' element={<Details />} />
          {/* <Route exact path='/home/log-in' element={<LogIn />} />
          <Route exact path='/home/sign-in' element={<SignIn />} /> */}
          <Route exact path='/home/detail/:id' element={<Details />} />
          <Route exact path="/createProduct" element={<CreateProduct/>} />
          <Route exact path="/modifyProduct" element={<ModifyProduct/>} />
          {/* { !userState? (<Route exact path='/home/sign-in' element={<SignIn />} />): null} */}
          <Route exact path='/home/details' element={<Details />} />
          <Route path='*' element={<Error/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
