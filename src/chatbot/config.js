
import { CenterFocusStrong } from '@mui/icons-material';
import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from '../components/user/Bot/DogPicture';
import WidgetFavorites from '../components/user/Bot/widgets/WidgetFavorites';

const botName = 'Asistente Virtual';

const config = {
  initialMessages: [createChatBotMessage(`Hola, soy el ${botName}. En qué puedo ayudarte?`)],
  customComponents: {
    // Replaces the default header
   header: () => <div style={{ textAlign: 'center', fontFamily: 'sans-serif' , color: 'white', backgroundColor: '#0B74CB', padding: "5px", borderRadius: "3px" }}>Asistente Virtual</div>
   
  },
  widgets:[{
    widgetName: 'Favorites',
    widgetFunc: (props) => <WidgetFavorites {...props} />
  }]
  
 /*  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  }, */
};

export default config;