import { createContext, useState } from 'react';

export const notificationContext = createContext()

const NotificationContextProvider = ({ children }) => {

  const [message, setmessage] = useState({ msg: 'ready...' });

  return ( 
    <notificationContext.Provider
      value={{ message, setmessage }}
    >
    { children }
    </notificationContext.Provider>
  );
}


 
export default NotificationContextProvider;