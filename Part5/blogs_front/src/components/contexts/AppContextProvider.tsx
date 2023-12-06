import { PropsWithChildren, useState, createContext, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogsAsync } from "../../reduxstate/store";
import { AppContextType, BlogProps, Message, StoreProps, User } from "../../types/types";

const defValues: AppContextType = {
  msg: {msg: '', type: 'info'},
  setmsg: () => null,
  tabindex: 0,
  settabindex: () => null,
  blogs: [],
  dispatch: () => null,
  user: {name: '', username: '', token: ''},
}

export const appContext = createContext<AppContextType>(defValues)

const AppContextProvider = ({children}: PropsWithChildren) => {

  const [msg, setmsg] = useState<Message | null>(null);
  const [tabindex, settabindex] = useState<number|string|undefined>(0);
  const dispatch = useDispatch<any>();
  const blogs = useSelector<StoreProps, BlogProps[]>((state) => state.blogs);
  const user = useSelector<StoreProps, User & { token: string }>(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getAllBlogsAsync());
  }, []);

  return (
    <appContext.Provider
      value={{
        msg,
        setmsg,
        tabindex,
        settabindex,
        dispatch,
        blogs,
        user
      }}
    >
      { children }
    </appContext.Provider>
  )
}
 
export default AppContextProvider;