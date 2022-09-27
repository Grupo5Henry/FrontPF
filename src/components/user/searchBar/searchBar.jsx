import React from 'react';
import './searchBar.css'


const SearchBar = () => {
    return (
        <div class="inpur_body">
            <div class="input-group">
                <input type="text" class="input" id="Email" name="Email" placeholder="Search..." autocomplete="off" />
                <input class="button--submit" value="Search" type="submit" />
            </div>
        </div>
    );
}

export default SearchBar;