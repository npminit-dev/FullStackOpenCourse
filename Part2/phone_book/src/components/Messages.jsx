import React, { useState, useEffect } from "react";

const Messages = ({ msg, timer }) => {
  const [shown, setshown] = useState(false);

  useEffect(() => {
    clearTimeout(timer.current);
    if (msg.message) {
      setshown(true);
      timer.current = setTimeout(() => {
        setshown(false);
      }, 4000);
    }

    return () => clearTimeout(timer.current);
  }, [msg]);

  const spanstyle = {
    display: "block",
    backgroundColor: `${msg.type === "error" ? "red" : "darkgreen"}`,
    height: "min-content",
    width: "250px",
    padding: "2px 5px",
    margin: "10px 5px"
  };
  const pstyle = {
    color: "white",
    margin: 0,
    textAlign: "center",
    fontSize: "13px",
  };

  return (
    <>
      {shown ? (
        <span style={spanstyle}>
          <p style={pstyle}>{msg.message}</p>
        </span>
      ) : (
        <></>
      )}
    </>
  );
};

export default Messages;
