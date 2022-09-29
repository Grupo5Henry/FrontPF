import './App.css';
import Home from './components/user/home/home';
import NavBar from './components/user/navBar/navBar';
import LogIn from './components/user/logIn/logIn'
import SignIn from './components/user/signIn/signIn';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/log-in' element={<LogIn />} />
          <Route exact path='/sign-in' element={<SignIn />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
