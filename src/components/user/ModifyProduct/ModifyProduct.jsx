import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { BACK_URL } from "../../../constantes";
import { clearCategories, getCategories } from "../../../redux/action";
import "../ModifyProduct/ModifyProduct.css";

export default function ModifyProduct() {
  //ESTADOS DEL PRODUCTO
  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [categories, setCategories] = useState([]);

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
        title: "Debe agregar un número como precio",
        icon: "error",
        button: "Ok",
      });
    } else if (isNaN(price) === true) {
      return swal({
        title: "El precio debe ser un número",
        icon: "error",
        button: "Ok",
      });
    } else if (price <= 0) {
      return swal({
        title: "El precio debe ser mayor a cero",
        icon: "error",
        button: "Ok",
      });
    } else if (price === 0) {
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
    if (imageSelected.length === 0) {
      return swal({
        title: "Debe cargar una imagen",
        icon: "error",
        button: "Ok",
      });
    } else {
      //SI PASAN LAS VALIDACIONES

      const formData = new FormData();
      formData.append("file", imageSelected);
      formData.append("upload_preset", "goctl1il");

      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dzr5xulsx/image/upload",
          formData
        )
        .then((response) =>
          axios.put(BACK_URL + "/product/modify", {
            id,
            name,
            model,
            brand,
            description,
            thumbnail: response.data.secure_url,
            price,
            condition,
            categories,
          })
        )

        .then(() => {
          swal({
            title: "¡Producto modificado correctamente!",
            text: "¿Desea modificar otro producto?",
            icon: "success",
            buttons: ["No", "Sí"],
          }).then((resp) => {
            if (resp) {
              window.location.reload();
            } else {
              navigate("/");
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <>
      <h1 className="title">Modificar Producto</h1>
      <form
        className="formulario"
        autoComplete="off"
        noValidate
        onSubmit={handleOnSubmit}
      >
        <div className="contenedor">
          <p className="p">Id del producto a modificar: </p>
          <input
            type="text"
            name="id"
            className="inputs"
            placeholder="Id del producto a modificar:"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="contenedor">
          <p className="p">Nombre del producto: </p>
          <input
            type="text"
            name="name"
            className="inputs"
            placeholder="Se presentará como el título"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="contenedor">
          <p className="p">Marca: </p>
          <input
            type="text"
            name="brand"
            className="inputs"
            placeholder="Por ejemplo LG, Samsung, Lenovo"
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="contenedor">
          <p className="p">Modelo: </p>
          <input
            type="text"
            name="model"
            className="inputs"
            placeholder="Modelo"
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="contenedor">
          <p className="p">Descripción: </p>
          <input
            type="text"
            name="description"
            className="inputs"
            placeholder="Decripción de los componentes del producto"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="contenedor">
          <p className="p">Imagen: </p>
          <input
            type="file"
            className="inputImage"
            /* className="block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" */
            onChange={(e) => {
              setImageSelected(e.target.files[0]);
            }}
          />
        </div>
        <div className="contenedor">
          <p className="p">Precio: </p>
          <input
            type="number"
            name="price"
            className="inputPrecio"
            placeholder="Precio"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="contenedor">
          <p className="p">Condición: </p>
          <select
            name="condition"
            className="inputSelect"
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="Seleccionar">Seleccionar</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
          </select>
        </div>
        <div className="contenedor">
          <p className="p">Categoría: </p>
          <select
            name="category"
            className="inputSelect"
            onChange={(e) => setCategories(e.target.value)}
          >
            <option value="select">Seleccionar</option>
            {category &&
              category.map((c) => {
                return (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                );
              })}
          </select>
        </div>
        <button className="button" type="submit">
          Crear Producto
        </button>
      </form>
    </>
  );
}
