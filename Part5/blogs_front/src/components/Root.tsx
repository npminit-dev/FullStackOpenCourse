import { useContext } from "react";
import { appContext } from "./contexts/AppContextProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Blogs from "./Blogs";
import User from "./users/User";
import Users from "./users/Users";
import Blog from "./Blog";

const Root = () => {

  const { msg, setmsg, blogs, dispatch, user } = useContext(appContext)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App></App>,
      children: [
        {
          path: '/users',
          element: <Users></Users>,
        },
        {
          path: '/user',
          element: <User></User>
        },
        {
          path: '/blogs',
          element: <Blogs blogs={blogs} setmsg={setmsg} token={user.token} user={user}></Blogs>
        },
        {
          path: '/blog/:id',
          element: <Blog></Blog>
        }
      ]
    }
  ])

  return ( <RouterProvider router={router}></RouterProvider> );
}
 
export default Root;