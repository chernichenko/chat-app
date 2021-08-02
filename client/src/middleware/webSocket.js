import io from "socket.io-client"
import { CONNECT_WEBSOCKET } from 'constants/socket'

export const webSocket = () => {
  const socket = io('http://localhost:5000')
  
  // socket.on('USER:UPDATE_STATUS', data => setNewStatusState(data))
  socket.on('MESSAGE:NEW', data => console.log('New Message', data))
  // socket.on('MESSAGE:UPDATE_IS_READ', data => setNewMessageIsReadState(data))

  // const socketMessageNewHandler = data => {
  //   console.log('New Message', data)
  // }

  return ({ dispatch }) => next => action => {
    switch (action.type) {
      case CONNECT_WEBSOCKET: {

        break;
      }
      default:
        break;
    }

    return next(action);
  };
};
