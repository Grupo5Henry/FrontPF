

import React from 'react';

const MessageParser = ({ children, actions }) => {
  var defaultMessage = true;
  const parse = (message) => {
    
    if (message.toLowerCase().includes('favoritos')) {
      actions.handleFavorites();
      defaultMessage=false;
    }

    if (message.toLowerCase().includes('hola')) {
      actions.handleHello();
      defaultMessage=false;
    }

    if(
      message.toLowerCase().includes('pago') ||
      message.toLowerCase().includes('pagar')
    ) {
      actions.handlePago();
      defaultMessage=false;
    }

    if(defaultMessage){
      actions.handleDefaultMessage();
    }
 
    
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;




/* class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(message)
    const lowercase = message.toLowerCase()

    if(lowercase.includes("hola")) {
      this.actionProvider.greet();
    }

    if(lowercase.includes("pago")) {
      this.actionProvider.pago();
    }
  }
}

export default MessageParser; */