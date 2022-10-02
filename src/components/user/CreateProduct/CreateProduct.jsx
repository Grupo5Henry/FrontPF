import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import axios from "axios";
import { getCategories, clearCategories } from "../../../redux/action";

export default function CreateProduct () {

    //ESTADOS DEL PRODUCTO
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [categories, setCategories] = useState("");
    const [condition, setCondition] = useState("");
    //ESTADO DE LA IMAGEN
    const [imageSelected, setImageSelected] = useState("");

    //OTRAS CONSTANTES
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const category = useSelector((state) => state.categories);

    //TRAER LAS CATEGORIAS Y LUEGO VACIAR EL ESTADO
    useEffect(() => {
        dispatch(getCategories());
        dispatch(clearCategories());
    }, [dispatch]);

    

    //AL DAR AL BOTON DE CREAR PRODUCTO
    async function handleOnSubmit(e) {
        e.preventDefault();

        //VALIDACIONES

        //NOMBRE
        if (name.length < 3) {
            return swal({
              title: "El nombre debe tener al menos tres caracteres",
              icon: "error",
              button: "Ok",
            });
          }
        
        //MARCA
        if (brand.length === 0) {
        return swal({
            title: "El campo de marca no puede estar vacío",
            icon: "error",
            button: "Ok",
        });
        }

        //MODELO
        if (model.length === 0) {
        return swal({
            title: "El campo de modelo no puede estar vacío",
            icon: "error",
            button: "Ok",
        });
        }

        //DESCRIPCION
        if (description.length === 0) {
            return swal({
              title: "El campo de descripción no puede estar vacío",
              icon: "error",
              button: "Ok",
            });
        }

        //PRECIO
        if (!price) {
            return swal({
              title: "Debe agregar el precio del producto",
              icon: "error",
              button: "Ok",
            });
        }

        if (isNaN(price) === true) {
            return swal({
              title: "El precio debe ser un número",
              icon: "error",
              button: "Ok",
            });
        }

        if (price < 0) {
            return swal({
              title: "El precio no puede ser un número negativo",
              icon: "error",
              button: "Ok",
            });
        }

        if (price === 0) {
            return swal({
              title: "El precio no puede ser un cero",
              icon: "error",
              button: "Ok",
            });
        }

        //CONDICION
        if (condition.length === 0) {
            return swal({
              title: "Debe señalar si el producto es nuevo o usado",
              icon: "error",
              button: "Ok",
            });
        }

        if (condition === "Seleccionar") {
            return swal({
              title: "Debe señalar si el producto es nuevo o usado",
              icon: "error",
              button: "Ok",
            });
        }

        //CATEGORIA
        if (categories.length === 0) {
            return swal({
              title: "Debe agregar una categoría",
              icon: "error",
              button: "Ok",
            });
        }

        if (categories === "select") {
            return swal({
              title: "Debe señalar una categoría válida",
              icon: "error",
              button: "Ok",
            });
        }
        //IMAGEN
        if(imageSelected.length === 0) {
            return swal({
                title: "Debe cargar una imagen",
                icon: "error",
                button: "Ok",
              });
        } else {

            //SI PASAN LAS VALIDACIONES

            const formData = new FormData()
            formData.append("file", imageSelected)
            formData.append("upload_preset", "goctl1il")
    
            await axios.post("https://api.cloudinary.com/v1_1/dzr5xulsx/image/upload", formData)
            .then((response) => 
                
                console.log(response.data.secure_url, name, brand, model, description, condition, categories) 
                )
                .then(() => {
                    swal({
                      title: "¡Producto creado correctamente!",
                      text: "¿Desea crear otro producto?",
                      icon: "success",
                      buttons: ["No", "Sí"]
                    }).then((resp) => {
                        if(resp) {
                            window.location.reload();
                        } else {
                            navigate("/");
                        }
                    })
                  }) 
                .catch((error) => {
                    console.error(error);
                })
            } 
    };


    return(
        <>
            <form noValidate onSubmit={handleOnSubmit}>
                <h2>Creación de Producto</h2>
                <div>
                    <p>Nombre del producto: </p>
                    <input type="text" 
                    name="name"
                    placeholder="Nombre"
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <p>Marca: </p>
                    <input type="text" 
                    name="brand"
                    placeholder="Por ejemplo LG"
                    onChange={(e) => setBrand(e.target.value)}
                    />
                </div>
                <div>
                    <p>Modelo: </p>
                    <input type="text" 
                    name="model"
                    placeholder="Modelo"
                    onChange={(e) => setModel(e.target.value)}
                    />
                </div>
                <div>
                    <p>Descripción: </p>
                    <input 
                    type="text" 
                    name="description"
                    placeholder="Decripción"
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <p>Imagen: </p>
                    <input 
                    type="file" 
                    onChange={(e)=> {setImageSelected(e.target.files[0])}}/>
                </div>
                <div>
                    <p>Precio: </p>
                    <input 
                    type="number" 
                    name="price"
                    placeholder="Precio"
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <p>Condición: </p>
                    <select name="condition" onChange={(e) => setCondition(e.target.value)} >
                        <option value="Seleccionar">Seleccionar</option>
                        <option value="Nuevo">Nuevo</option>
                        <option value="Usado">Usado</option>
                    </select>
                </div>
                <div>
                    <p>Categoría: </p>
                    <select name="category" onChange={(e) => setCategories(e.target.value)}>
                    <option value="select" >Seleccionar</option>
                    {category && category.map((c) => {
                        return(
                            <option key={c.name} value={c.name} >{c.name}</option>
                        )
                    })}
                    </select>
                </div>
                <button type="submit">
                    Crear Producto
                </button>
            </form>
        </>
    )
};