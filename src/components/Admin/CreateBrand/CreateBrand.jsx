import React, {useState} from 'react';
import "../CreateBrand/createBrand.scss";
import SideBar from "../SideBar/SideBar.jsx";
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import swal from "sweetalert";
import { BACK_URL } from '../../../constantes';
import axios from "axios";


export default function CreateBrand () {

    //ESTADOS
 /*    const [brand, setBrand] = useState(""); */
    const [category, setCategory] = useState("");



    //CONTROLADOR DE MARCAS

/*     const handleSubmitBrand = async (e) => {
        e.preventDefault();
        if(!brand) {
            return swal({
                title: "La marca debe tener un nombre",
                icon: "error",
                timer: 800
            })
        } else { */
/*             await axios.post(`${BACK_URL}/category`, {
                category
            })
            .then((resp) => {
                swal({
                    title: "¡Categoría creada con éxito!",
                    icon: "success",
                    timer: 1000,
                })
            })
            .then(()=> {
                setCategory("")
            })
            .catch((err) => {
                console.error(err.message)
            }) */
/*             setBrand("")
            swal({
                title:"Servicio no funcional por el momento",
                icon: "error",
                timer: 1000
            })
        }
    }; */

    //CONTROLADOR DE CATEGORIAS

    const handleSubmitCategory = async (e) => {
        e.preventDefault();
        if(!category){
            return swal({
                title: "La categoría debe tener un nombre",
                icon: "error",
                timer: 600
            })
        } else {
            await axios.post(`${BACK_URL}/category`, {
                name: category
            })
            .then((resp) => {
                setCategory("")
                swal({
                    title: "¡Categoría creada con éxito!",
                    icon: "success",
                    timer: 1000,
                })
            })
            .catch((err) => {
                console.error(err.message)
            })
        }
    };


    return (
        <div className="createBrand">
            <SideBar/>
            <div className="createBrandContainer">
                <AdminNavBar/>
{/*                 <div className="top">
                    <h1>AGREGAR NUEVA MARCA</h1>
                </div>
                <div className="mid">
                    <form onSubmit={handleSubmitBrand}>
                        <div className="inputsContainer">
                            <label >NOMBRE NUEVA MARCA:</label>
                            <input type="text"
                            value={brand}
                            onChange={e => setBrand(e.target.value)}
                            />
                        </div>
                        <button className='buttonCreate' type='submit'>Crear Marca</button>
                    </form>
                </div> */}
                <div className="bottom">
                    <form onSubmit={handleSubmitCategory}>
                        <div className="inputsContainer">
                            <label>NOMBRE NUEVA CATEGORÍA:</label>
                            <input type="text" 
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            />
                        </div>
                        <button className='buttonCreate' type='submit'>Crear Categoría</button>
                    </form>
                </div>
            </div>
        </div>
    )
};