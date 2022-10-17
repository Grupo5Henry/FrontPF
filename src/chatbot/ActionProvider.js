
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hola!');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };


  const handleFavorites = () => {
    const botMessage = createChatBotMessage(
      "Puedes ver tus favoritos seleccionando el icono del corazón en la barra superior. Te dejo este botón para que puedas verlos:",
      {
        widget: 'Favorites',
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