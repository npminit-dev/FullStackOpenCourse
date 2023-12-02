import { PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { ToggleProps } from "../types/types";
import { blogsContext } from "./contexts/BlogsContextProvider";

const Toggle = ({ children, hidetext, showtext, shown, parentId }: PropsWithChildren<ToggleProps>) => {

  const { dispatchToggleStatus } = useContext(blogsContext)

  return (
    <>
      {shown ? (
        <>
          {children}
          <button type="button" onClick={() => parentId && dispatchToggleStatus({ type: 'toggle', payload: parentId })}>
            {hidetext}
          </button>
        </>
      ) : (
        <button
          className="showtextbox"
          type="button"
          onClick={() => parentId && dispatchToggleStatus({ type: 'toggle', payload: parentId })}
          title="show button"
        >
          {showtext}
        </button>
      )}
    </>
  );
};

export default Toggle;
