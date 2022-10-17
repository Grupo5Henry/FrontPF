import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../NewProduct/newProduct.scss";
import SideBar from "../SideBar/SideBar.jsx";
import AdminNavBar from "../AdminNavBar/AdminNavBar.jsx";
import ModalCreateCategory from "../Modals/ModalCreateCategory.jsx";

import Modal from "react-modal";
import axios from "axios";
import swal from "sweetalert";

import { BACK_URL } from "../../../constantes";
import { clearCategories, getCategories } from "../../../redux/action";

//CONECTAMOS LA MODAL CON EL ELEMENTO A MOSTRAR

Modal.setAppElement("#root");

export default function NewProduct() {
  //DETALLES DE LA MODAL A PROBAR

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalOpen, setOpen] = React.useState(false);

  ///////////////////////////////////////////////////////MODAL CERRADA ///////////////////////////////////

  //ESTADOS DEL PRODUCTO
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [input, setInput] = useState({
    categories: [],
  });
  const [stock, setStock] = useState(0);

  const [condition, setCondition] = useState("");
  //ESTADO DE LA IMAGEN
  const [imageSelected, setImageSelected] = useState("");
  const [image2, setImage2] = useState("");

  //OTRAS CONSTANTES
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories);

  //TRAER LAS CATEGORIAS Y LUEGO VACIAR EL ESTADO
  useEffect(() => {
    dispatch(getCategories());
    dispatch(clearCategories());
  }, [dispatch]);

  //CONTROLADOR DEL CHECKBOX

  const handleCheckbox = (e) => {
    // if (e.target.checked && !input.categories.includes(e.target.value)) {
    //   setInput({
    //     ...input,
    //     categories: [...input.categories, e.target.value],
    //   });
    // } else if (!e.target.checked) {
    //   setInput({
    //     ...input,
    //     categories: input.categories.filter((d) => d !== e.target.value),
    //   });
    // }
    setInput({
      ...input,
      categories: [...input.categories, e.target.value]
    })
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

      try {
        await axios
          .post(
            "https://api.cloudinary.com/v1_1/dzr5xulsx/image/upload",
            formData
          )
          .then((response) => {
            imgObl = response.data.secure_url;
          })
          .then( async () => {
            await axios
              .post(`${BACK_URL}/product/create`, {
                name,
                model,
                brand,
                description,
                thumbnail: imgObl,
                price,
                condition,
                categories: input.categories,
                stock,
                photos: imgOpt,
              })
              .then(() => {
                swal({
                  title: "¡Producto creado correctamente!",
                  text: "¿Desea crear otro producto?",
                  icon: "success",
                  buttons: ["No", "Sí"],
                }).then((resp) => {
                  if (resp) {
                    window.location.reload();
                  } else {
                    navigate("/");
                  }
                });
              });
          });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="newProduct">
      <SideBar/>
      <div className="newProductContainer" style={{maxWidth:"80%"}}>
        <AdminNavBar/>
        <div className="top">
          <h1>CREAR NUEVO PRODUCTO</h1>
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
              <label className="labelImg">Imagen (Obligatorio): </label>
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
              <input
                type="text"
                name="brand"
                placeholder="Por ejemplo LG, Samsung, Lenovo"
                onChange={(e) => setBrand(e.target.value)}
              />
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

            <div className="inputCategories" style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
              <label className="labelCategories">Categorías: </label>
              {/* <div className="borde"> */}
                <div style={{width:"50%",display:"flex",flexDirection:"column"}}>
                  <select style={{width:"100%", color:'black'}} onChange={(e) => handleCheckbox(e)}>
                    <option hidden>Seleccione categorias</option>
                    {
                      category.map((c,i) => {
                        if(!input.categories.includes(c.name)){
                          return (
                            <option key={i}>{c.name}</option>
                          )
                        } 
                      }) 
                    }
                  </select>
                  <div style={{display:"flex",gap:"10px",maxWidth:"100%",flexWrap:"wrap",justifyContent:"center"}}>
                    {
                      input.categories.map(c => {
                        return (
                          <span className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-red-600 px-5 cursor-pointer py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-red-400" onClick={() => setInput(prev => {
                            var filtered = input.categories.filter(e => e !== c)
                            return ({
                              ...prev,
                              categories: filtered
                            })
                          })}>{c}</span>
                        )
                      })
                    }
                  </div>
                </div>
                {/* {category &&
                  category.map((c) => {
                    return (
                      <label className="labelBox" key={c.name}>
                        <input
                          className="boxCategories"
                          type="checkbox"
                          value={c.name}
                          onChange={(e) => handleCheckbox(e)}
                        />{" "}
                        {c.name}{" "}
                      </label>
                    );
                  })} */}
              {/* </div> */}
            </div>

            <button  type="submit">
              Crear Producto
            </button>
          </form>
          <div className="buttonSpace"s>

            <button
                className="modalButton"
                onClick={() => setOpen(true)}
                type="button"
                >
                Crear Categoria
            </button>

            <Link to={`/`}>
              <button className="buttonCancel">Cancelar</button>
            </Link>

          </div>
            
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
  );
}
