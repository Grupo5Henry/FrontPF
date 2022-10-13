import React, {useState} from 'react';
import "../Modals/modalCreateCategory.scss";
import { useDispatch } from 'react-redux';
import swal from "sweetalert";
import { BACK_URL } from '../../../constantes';
import axios from "axios";
import { getCategories } from "../../../redux/action/index.js";


export default function ModalCreateCategory () {

    //ESTADOS

    const [category, setCategory] = useState("");

    //CONSTANTES
    const dispatch = useDispatch();

    //CONTROLADOR DE CATEGORIAS

    const handleSubmitCategory = async (e) => {
        e.preventDefault();
        if(!category){
            return swal({
                title: "La categoría debe tener un nombre",
                icon: "error",
                buttons: false,
                timer: 600
            })
        } else {
            await axios.post(`${BACK_URL}/category`, {
                name: category
            })
            .then((resp) => {
                dispatch(getCategories())
                setCategory("")
                swal({
                    title: "¡Categoría creada con éxito!",
                    icon: "success",
                    buttons: false,
                    timer: 1000,
                })
            })
            .catch((err) => {
                console.error(err.message)
            })
        }
    };


    return (
        <div className="modalCategory">
            <div className="modalCategoryContainer">

                <div className="bottom">
                    <form onSubmit={handleSubmitCategory}>
                        <div className="inputsContainer">
                            <div className="labelContainer">
                            <label>NOMBRE NUEVA CATEGORÍA:</label>
                            </div>
                            <div className="imputContainer">
                            <input type="text" 
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            />
                            </div>
                        </div>
                        <button type='submit'>Crear Categoría</button>
                    </form>
                </div>
            </div>
        </div>
    )
};