import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import App from "../App";
import Blogs from "./blogs/Blogs";
import User from "./users/User";
import Users from "./users/Users";
import Blog from "./blogs/Blog";

const Root = () => {

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
          element: <Blogs></Blogs>
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