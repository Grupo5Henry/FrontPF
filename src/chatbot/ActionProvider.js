
import React from 'react';
import { useSelector } from "react-redux";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const userState = useSelector((state) => state.user);
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hola!');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };


 const handleHelp = () => {
    const botMessage = createChatBotMessage(
      "Hola, si necesitas ayuda puedes preguntarme:");
    const botMessage1 = createChatBotMessage(
        "¿Cómo puedo ver el estado de una órden?");
    const botMessage2 = createChatBotMessage(
          "¿Cómo puedo ver mi carrito de compras?");
    const botMessage3 = createChatBotMessage(
    "¿Cómo veo mis favoritos?");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage, botMessage1, botMessage2, botMessage3],
    }));
  }; 


  const handleFavorites = () => {
    let botMessage;
    if(userState.userName){
     botMessage = createChatBotMessage(
      "Para ver sus favoritos debes hacer click en el icono del corazón en la barra superior. Te dejo este botón para que puedas verlos:",
      {
        widget: 'Favorites',
      }
    );
    } else {
      botMessage = createChatBotMessage(
        "Para ver sus favoritos debes haber iniciado sesión y luego hacer click en el icono del corazón en la barra superior."
      );
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };



  const handleProfile = () => {
    let botMessage;
    if(userState.userName){
     botMessage = createChatBotMessage(
      "Puedes ver tus órdenes desde tu perfil de usuario. Si quieres puedes acceder utilizando este botón:",
      {
        widget: 'Profile',
      }
    );
    } else {
      botMessage = createChatBotMessage(
        "Para ver tus órdenes debes haber iniciado sesión y luego navegar a tu perfil."
      );
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };


  const handleCart = () => {
     const botMessage = createChatBotMessage(
      "Puedes acceder al carrito de compras desde aquí:",
      {
        widget: 'Cart',
      }
    );
   
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };








  const handlePago = () => {

    var pagos = [
      "Puedes pagar tu compra utilizando Stripe",
      "Puedes pagar con tarjeta de crédito a traves del portal de pagos del sitio",
      "Puedes utilizar cualquier medio de pago habilitado por Stripe"
    ]
    var randomPago = pagos[Math.floor(Math.random() * pagos.length)];
    const botMessage = createChatBotMessage(randomPago);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleDefaultMessage = () => {
    const botMessage = createChatBotMessage('Por favor, comunícate con el centro de soporte para resolver tu consulta.');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };



  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handlePago,
            handleFavorites,
            handleDefaultMessage,
            handleProfile,
            handleHelp,
            handleCart,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;







/* class ActionProvider {
  constructor(
   createChatBotMessage,
   setStateFunc,
   createClientMessage,
   stateRef,
   createCustomMessage,
   ...rest
 ) {
   this.createChatBotMessage = createChatBotMessage;
   this.setState = setStateFunc;
   this.createClientMessage = createClientMessage;
   this.stateRef = stateRef;
   this.createCustomMessage = createCustomMessage;
 }

  greet = () => {
    const message = this.createChatBotMessage("Hola")
    this.addMessageToState(message)
  }

  pago = () => {
    const message = this.createChatBotMessage("Puedes pagar tus compras mediante Stripe")
    this.addMessageToState(message)
  }

  addMessageToState =(message) =>{
   this.setState(prevState => ({
    ...prevState,
    messages: [...prevState.messages, message],
   }));
  };

}

export default ActionProvider; */