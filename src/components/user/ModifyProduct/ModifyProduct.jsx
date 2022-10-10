import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import { clearCategories, getCategories, detailProduct, deleteDetailProduct } from "../../../redux/action";
import "../ModifyProduct/ModifyProduct.css";
import { BACK_URL } from "../../../constantes";

export default function ModifyProduct(props) { //NUEVO PROPS
  //ESTADOS DEL PRODUCTO
  const [id, setId] = useState("");

  const [name, setName] = useState("")/* (productDetail.name); */
  const [brand, setBrand] = useState("")/* (productDetail.brand); */
  const [model, setModel] = useState("")/* (productDetail.model); */
  const [description, setDescription] = useState("")/* (productDetail.description); */
  const [price, setPrice] = useState("")/* (productDetail.price); */
  const [categories, setCategories] = useState([]);

  const [condition, setCondition] = useState("");
  //ESTADO DE LA IMAGEN
  const [imageSelected, setImageSelected] = useState("");

  //OTRAS CONSTANTES
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories);
  const productDetail = useSelector((state) => state.detail);

  //TRAER LAS CATEGORIAS Y LUEGO VACIAR EL ESTADO
/*   useEffect(() => {
    dispatch(detailProduct(props.match.params.id));  //NUEVO
    dispatch(deleteDetailProduct());              //NUEVO
    dispatch(getCategories());
    dispatch(clearCategories());
  }, [dispatch]); */

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
            /* id: productDetail.id, */
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
            icon: "success",
            buttons: "Ok",
            timer: 2000
          }).then(() => {
              navigate("/products");
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
{/*         <div className="contenedor">
          <p className="p">Id del producto a modificar: </p>
          <input
            type="text"
            name="id"
            className="inputs"
            placeholder="Id del producto a modificar:"
            onChange={(e) => setId(e.target.value)}
          />
        </div> */}
        <div className="contenedor">
          <p className="p">Nombre del producto: </p>
          <input
            type="text"
            name="name"
            className="inputs"
            /* placeholder={productDetail.name} */
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="contenedor">
          <p className="p">Marca: </p>
          <input
            type="text"
            name="brand"
            className="inputs"
            /* placeholder={productDetail.brand} */
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="contenedor">
          <p className="p">Modelo: </p>
          <input
            type="text"
            name="model"
            className="inputs"
            /* placeholder="Modelo" */
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="contenedor">
          <p className="p">Descripción: </p>
          <input
            type="text"
            name="description"
            className="inputs"
            /* placeholder="Decripción de los componentes del producto" */
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="contenedor">
          <p className="p">Imagen: </p>
          <input
            type="file"
            className="inputImage"
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
            /* placeholder="Precio" */
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
        <div className="buttons">
            <button className="button" type="submit">
              Modificar
            </button>
            <Link to={`/products`}>
              <button className="buttonCancel">Cancelar</button>
            </Link>
        </div>
      </form>
    </>
  );
}
