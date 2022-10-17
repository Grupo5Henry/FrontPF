//chatbot
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../../../chatbot/config';
import MessageParser from '../../../chatbot/MessageParser';
import ActionProvider from '../../../chatbot/ActionProvider';

import estilo from './Bot.module.css'


const Bot = (props) => {

  return (
    <div className={estilo.Chatbot}>
    <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        placeholderText='Escribe tu consulta aquí...'
      />
      <button onClick={()=>props.setOnOff()} className={estilo.cierre}>X</button>
    </div>  
  )
}

export default Bot;