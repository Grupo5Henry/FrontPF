import React from 'react';
import SearchBar from '../searchBar/searchBar';
import './navBar.css'


const NavBar = () => {
    return ( 
        <div>
        <nav className='nav_body'>
            <h2>Barra de Navegacion</h2>
        </nav>
            <SearchBar/>
        </div>
     );
}
 
export default NavBar;