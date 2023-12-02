import "./App.css";
import React, { useEffect, useState } from "react";
import type { BlogProps, Message, StoreProps, User } from "./types/types";
import Session from "./components/session/Session";
import Blogs from "./components/Blogs";
import UserInfo from "./components/session/UserInfo";
import PostBlog from "./components/PostBlog";
import Messages from "./components/Messages";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, getAllBlogsAsync } from "./reduxstate/store";
import BlogsToggleContextProvider from "./components/contexts/BlogsContextProvider";

function App(): React.ReactNode {
  const [msg, setmsg] = useState<Message | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector<StoreProps, BlogProps[]>((state) => state.blogs);
  const user = useSelector<StoreProps, User & { token: string }>(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getAllBlogsAsync());
  }, []);

  return (
    <div>
      <h2>BLOGS</h2>
      {msg !== null && <Messages msg={msg}></Messages>}
      <BlogsToggleContextProvider>
        {!user.token || !user.name ? (
          <Session {...{ user, token: user.token, setmsg }} />
        ) : (
          <span>
            <UserInfo {...user}></UserInfo>
            <PostBlog
              user={{ name: user.name, username: user.username }}
              setmsg={setmsg}
              token={user.token}
            ></PostBlog>
          </span>
        )}
        <Blogs
          blogs={blogs}
          setmsg={setmsg}
          token={user.token}
          user={{ name: user.name, username: user.username }}
        ></Blogs>
      </BlogsToggleContextProvider>
    </div>
  );
}

export default App;
