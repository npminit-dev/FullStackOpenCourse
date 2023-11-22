import { PropsWithChildren, useState } from "react";
import { ToggleProps } from "../types/types";

const Toggle = ({ children, hidetext, showtext, shownDefault }: PropsWithChildren<ToggleProps>) => {
  const [visible, setvisible] = useState<boolean>(shownDefault);

  return (
    <>
      {visible ? (
        <>
          {children}
          <button type="button" onClick={() => setvisible(false)}>
            {hidetext}
          </button>
        </>
      ) : (
        <button
          className="showtextbox"
          type="button"
          onClick={() => setvisible(true)}
          title="show button"
        >
          {showtext}
        </button>
      )}
    </>
  );
};

export default Toggle;
