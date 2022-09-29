import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import SearchBar from '../searchBar/searchBar';
import './navBar.css'


const NavBar = () => {
    return (
        <div className='box'>
            <nav className='nav_body'>
                <Link to="/" className='link_nav'>
                   <h2>Techno Trade</h2>
                </Link>
                <Link to="/" className='link_nav'>
                    <Icon icon="ant-design:home-filled" width='40px' height='40px' />
                    <h4>Home</h4>
                </Link>
                <div className='prfile'>

                    <Link to="/" className='link_nav'>
                        <Icon icon="carbon:favorite-filled" width='40px' height='40px' />
                        <h4>Favorites</h4>
                    </Link>
                    <Link to="/" className='link_nav'>
                        <Icon icon="eva:shopping-cart-fill" width='40px' height='40px' />
                        <h4>My Shopping</h4>
                    </Link>
                </div>
                <div className='prfile'>
                    <Link to="/sign-in" className='link_nav'>
                        <h4>Sign In</h4>
                    </Link>
                    <h4 color='link_nav'>/</h4>
                    <Link to="/log-in" className='link_nav'>
                        <h4>Log In</h4>
                    </Link>
                </div>
            </nav>
            <SearchBar />
        </div>
    );
}

// log-in' element={<LogIn />} />
//           <Route exact path='/sign-in
export default NavBar;