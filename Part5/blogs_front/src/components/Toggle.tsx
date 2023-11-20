import { PropsWithChildren, useState } from "react";
import { ToggleProps } from "../types/types";

const Toggle = ({ children, hidetext, showtext }: PropsWithChildren<ToggleProps>) => {
  const [visible, setvisible] = useState<boolean>(true);

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
