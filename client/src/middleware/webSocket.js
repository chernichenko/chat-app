// import io from "socket.io-client"
import { CONNECT_WEBSOCKET } from 'constants/socket'

export const webSocket = () => {
  // const socket = io('http://localhost:5000')

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
