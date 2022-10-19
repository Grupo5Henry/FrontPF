// new file called DogPicture.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import estilo from '../Bot.module.css'

const WidgetCart = () => {
    const navigate=useNavigate();

    const handleClick = () =>{
      navigate('/cart')

    }

  return (
    <div className={estilo.buttonContainer}>
      <button className={estilo.button} onClick={handleClick}>Ir al carrito</button>
    </div>
  );
};

export default WidgetCart;