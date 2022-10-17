import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import "../FixProduct/fixProduct.scss";
import SideBar from "../SideBar/SideBar.jsx";
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import {
  clearCategories,
  getCategories,
  detailProduct,
  deleteDetailProduct,
  getBrandAndModels,
} from "../../../redux/action/index.js";
import { BACK_URL } from "../../../constantes";

import ModalCreateCategory from "../Modals/ModalCreateCategory.jsx";
import Modal from "react-modal";

export default function FixProduct() {
  //MODAL

  //CONECTAMOS LA MODAL CON EL ELEMENTO A MOSTRAR

  Modal.setAppElement("#root");

  //DETALLES DE LA MODAL A PROBAR

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalOpen, setOpen] = React.useState(false);

  ///////////////////////////////////////////////////////MODAL CERRADA ///////////////////////////////////

  //ESTADOS DEL PRODUCTO

  const [name, setName] = useState("");
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [input, setInput] = useState({
    categories: [],
  });
  const [stock, setStock] = useState("");

  const [condition, setCondition] = useState("");
  //ESTADO DE LA IMAGEN
  const [imageSelected, setImageSelected] = useState("");
  const [image2, setImage2] = useState("");

  //OTRAS CONSTANTES
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories);
  const productDetail = useSelector((state) => state.detail);
  const brandsOwned = useSelector((state) => state.brand);

  const brandsOrdered = brandsOwned.sort((a, b) => a.brand > b.brand);

  //TRAER LAS CATEGORIAS Y LUEGO VACIAR EL ESTADO
  useEffect(() => {
    dispatch(detailProduct(id)); //NUEVO
    dispatch(deleteDetailProduct()); //NUEVO
    dispatch(getBrandAndModels());
    dispatch(getCategories());
    dispatch(clearCategories());
  }, [dispatch]);

  //CONTROLADOR DEL CHECKBOX

  const handleCheckbox = (e) => {
    /* if (e.target.checked && !input.categories.includes(e.target.value)) {
        setInput({
          ...input,
          categories: [...input.categories, e.target.value],
        });
      } else if (!e.target.checked) {
        setInput({
          ...input,
          categories: input.categories.filter((d) => d !== e.target.value),
        });
      }
    }; */

    setInput({
      ...input,
      categories: [...input.categories, e.target.value],
    });
  };

  //AL DAR AL BOTON DE CREAR PRODUCTO
  async function handleOnSubmit(e) {
    e.preventDefault();

    //VALIDACIONES

    //NOMBRE
    if (name.length < 3) {
      return swal({
        title: "El nombre debe tener al menos tres caracteres",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    }

    //MARCA
    if (brand.length === 0) {
      return swal({
        title: "El campo de marca no puede estar vacío",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    }

    //MODELO
    if (model.length === 0) {
      return swal({
        title: "El campo de modelo no puede estar vacío",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    }

    //DESCRIPCION
    if (description.length === 0) {
      return swal({
        title: "El campo de descripción no puede estar vacío",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    }

    //PRECIO
    if (!price) {
      return swal({
        title: "Debe agregar un número como precio",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    } else if (isNaN(price) === true) {
      return swal({
        title: "El precio debe ser un número",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    } else if (price <= 0) {
      return swal({
        title: "El precio debe ser mayor a cero",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    } else if (price === 0) {
      return swal({
        title: "El precio no puede ser un cero",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    }

    //STOCK
    if (!stock) {
      return swal({
        title: "Debe agregar un número como stock",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    } else if (isNaN(stock) === true) {
      return swal({
        title: "El stock debe ser un número",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    } else if (stock < 0) {
      return swal({
        title: "El stock no puede ser negativo",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    }

    //CONDICION
    if (condition.length === 0) {
      return swal({
        title: "Debe señalar si el producto es nuevo o usado",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    }

    if (condition === "Seleccionar") {
      return swal({
        title: "Debe señalar si el producto es nuevo o usado",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    }

    //CATEGORIA
    if (input.categories.length === 0) {
      return swal({
        title: "Debe agregar una categoría",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    }

    //IMAGEN
    if (imageSelected.length === 0) {
      return swal({
        title: "Debe cargar una imagen",
        icon: "error",
        buttons: false,
        timer: 700,
      });
    } else {
      //SI PASAN LAS VALIDACIONES

      let imgObl;
      let imgOpt = [];

      if (image2) {
        try {
          for (let i = 0; i < image2.length; i++) {
            const formData2 = new FormData();
            formData2.append("file", image2[i]);
            formData2.append("upload_preset", "goctl1il");

            await axios
              .post(
                "https://api.cloudinary.com/v1_1/dzr5xulsx/image/upload",
                formData2
              )
              .then((response2) => {
                imgOpt.push(response2.data.secure_url);
              });
          }
        } catch (error) {
          console.error(error);
        }
      }

      const formData = new FormData();
      formData.append("file", imageSelected);
      formData.append("upload_preset", "goctl1il");

      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dzr5xulsx/image/upload",
          formData
        )
        .then(
          async (response) =>
            await axios.put(BACK_URL + "/product/modify", {
              id: productDetail.id,
              name,
              model,
              brand,
              description,
              thumbnail: response.data.secure_url,
              price,
              stock,
              condition,
              categories: input.categories,
              photos: imgOpt,
            })
        )

        .then(() => {
          swal({
            title: "¡Producto modificado correctamente!",
            icon: "success",
            buttons: false,
            timer: 500,
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
    <div className="fixProduct">
      <SideBar />
      <div className="fixProductContainer">
        <AdminNavBar />
        <div className="top">
          <h1>MODIFICAR PRODUCTO</h1>
        </div>
        <div className="bottom">
          <form autoComplete="off" noValidate onSubmit={handleOnSubmit}>
            <div className="inputsContainer">
              <label>Nombre del producto: </label>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="inputsContainer">
              <label>Descripción: </label>
              <input
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="inputsContainer">
              <label>Modelo: </label>
              <input
                type="text"
                name="model"
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className="inputsContainer">
              <label>Precio: </label>
              <input
                type="number"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="inputsContainer">
              <label>Stock: </label>
              <input
                type="number"
                name="stock"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="inputsContainerImg">
              <label className="labelImg">Imagen (Obligatoria): </label>
              <input
                className="inputImg"
                type="file"
                onChange={(e) => {
                  setImageSelected(e.target.files[0]);
                }}
              />
            </div>

            <div className="inputsContainerImg">
              <label className="labelImg">Imagen 2 (Opcional): </label>
              <input
                className="inputImg"
                multiple="multiple"
                type="file"
                onChange={(e) => {
                  setImage2(e.target.files);
                }}
              />
            </div>

            <div className="inputsContainer">
              <label>Marca: </label>
              <select name="brand" onChange={(e) => setBrand(e.target.value)}>
                <option value="select">Seleccionar</option>
                {brandsOrdered &&
                  brandsOrdered.map((c) => {
                    return (
                      <option key={c.brand} value={c.brand}>
                        {c.brand}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="inputsContainer">
              <label>Condición: </label>
              <select
                name="condition"
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="Seleccionar">Seleccionar</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </select>
            </div>

            <div className="inputCategories">
              <label className="labelCategories">Categorías: </label>
              <div
                className="subLabel"
                style={{
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "11.5%",
                  padding: "8px",
                }}
              >
                <select
                  className="SelectSubLabel"
                  style={{ width: "90%", marginLeft: "10px", color: "black" }}
                  onChange={(e) => handleCheckbox(e)}
                >
                  <option hidden >Seleccione categorias</option>
                  {category.map((c, i) => {
                    if (!input.categories.includes(c.name)) {
                      return <option key={i}>{c.name}</option>;
                    }
                  })}
                </select>
                <div
                  style={{
                    fontSize: "18px",
                    display: "flex",
                    gap: "10px",
                    maxWidth: "100%",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {input.categories.map((c) => {
                    return (
                      <span
                        onClick={() =>
                          setInput((prev) => {
                            var filtered = input.categories.filter(
                              (e) => e !== c
                            );
                            return {
                              ...prev,
                              categories: filtered,
                            };
                          })
                        }
                      >
                        {c}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <button className="buttonModify" type="submit">
              Modificar
            </button>
          </form>
          <div className="buttonsContainer">
            <Link to={`/products`}>
              <button className="buttonCancel">Cancelar</button>
            </Link>

            <button
              className="modalButton"
              onClick={() => setOpen(true)}
              type="button"
            >
              Crear Categoria
            </button>
            <Modal
              isOpen={modalOpen}
              onRequestClose={() => setOpen(false)}
              overlayClassName={{
                base: "overlay-base",
                afterOpen: "overlay-after",
                beforeClose: "overlay-before",
              }}
              className={{
                base: "content-base",
                afterOpen: "content-box",
                beforeClose: "content-before",
              }}
              closeTimeoutMS={500}
            >
              <ModalCreateCategory setIsOpen={setIsOpen} setOpen={setOpen} />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
