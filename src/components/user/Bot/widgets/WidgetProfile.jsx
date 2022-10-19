// new file called DogPicture.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import estilo from '../Bot.module.css'

const WidgetProfile = () => {
    const navigate=useNavigate();

    const handleClick = () =>{
      navigate('/profile')

    }

  return (
    <div className={estilo.buttonContainer}>
      <button className={estilo.button} onClick={handleClick}>Ir a mi perfil</button>
    </div>
  );
};

export default WidgetProfile;