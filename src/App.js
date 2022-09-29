import './App.css';
import Home from './components/user/home/home';
import NavBar from './components/user/navBar/navBar';
import LogIn from './components/user/logIn/logIn'
import SignIn from './components/user/signIn/signIn';
import { Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Details from './components/user/details/details';
=======
import Landing from './components/user/Landing/Landing';
>>>>>>> develop

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Routes>
<<<<<<< HEAD
=======
          <Route exact path='/' element={<Landing />} />
>>>>>>> develop
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/log-in' element={<LogIn />} />
          <Route exact path='/sign-in' element={<SignIn />} />
          <Route exact path='/details' element={<Details />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
