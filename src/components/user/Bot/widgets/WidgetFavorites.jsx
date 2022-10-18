// new file called DogPicture.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import estilo from '../Bot.module.css'

const WidgetFavorites = () => {
    const navigate=useNavigate();
    const handleClick = () =>{
      navigate('/favorites')
    }

  return (
    <div className={estilo.buttonContainer}>
      <button className={estilo.button} onClick={handleClick}>ir a Favoritos</button>
    </div>
  );
};

export default WidgetFavorites;