import './App.css';
import Home from './components/user/home/home';
import NavBar from './components/user/navBar/navBar';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
