import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import type { BlogProps, Message, StoreProps, User } from "./types/types";
import Session from "./components/session/Session";
import Blogs from "./components/Blogs";
import UserInfo from "./components/session/UserInfo";
import PostBlog from "./components/PostBlog";
import Messages from "./components/Messages";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, getAllBlogsAsync, store } from "./reduxstate/store";
import Users from "./components/users/Users";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { appContext } from "./components/contexts/AppContextProvider";

function App(): React.ReactNode {
  const { msg, setmsg, dispatch, blogs, user } = useContext(appContext)

  return (
    <div>
      <h2>APP-BLOGS</h2>
      {msg !== null && <Messages msg={msg}></Messages>}
      {!user.token || !user.name ? (
        <Session/>
      ) : (
        <UserInfo {...user}></UserInfo>
      )}
      <Link to="/users"><div>USERS</div></Link>
      <Link to='/blogs'><div>BLOGS</div></Link>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
