import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "./AppContextProvider";
import { useField } from "./hooks/usefield";

export const CreateNew = () => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const { addNew, setNotification } = useContext(appContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
    setNotification({ msg: "Anecdote added!" });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content.value}
            onChange={content.onChange}
            type={content.type}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author.value}
            onChange={author.onChange}
            type={author.type}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info.value}
            onChange={info.onChange}
            type={info.type}
          />
        </div>
        <button type='submit'>create</button>
        <button onClick={() => {
          content.clearField()
          author.clearField()
          info.clearField()
        }} type='reset'>clear fields</button>
      </form>
    </div>
  );
};
