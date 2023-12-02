import {
  PropsWithChildren,
  createContext,
  useReducer,
} from "react";
import { Action, State, contextType } from "../../types/types";

const defValues: contextType = {
  toggleStatus: [],
  dispatchToggleStatus: () => null,
};

export const blogsContext = createContext<contextType>(defValues);

export const BlogsToggleContextProvider = ({ children }: PropsWithChildren) => {
  const [toggleStatus, dispatchToggleStatus] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "initialize":
          return action.payload.map((blog) => {
            return { id: blog.id, status: false };
          });
        case "add":
          console.log("Dispatching: " + action.payload);
          return state.concat({ id: action.payload, status: false });
        case "remove":
          return state.filter((blogstatus) => blogstatus.id !== action.payload);
        case "toggle":
          return state.map((blogstatus) => {
            if (blogstatus.id === action.payload) {
              return { id: blogstatus.id, status: !blogstatus.status };
            } else return blogstatus;
          });
      }
    },
    []
  );

  return (
    <blogsContext.Provider
      value={{
        toggleStatus,
        dispatchToggleStatus,
      }}
    >
      {children}
    </blogsContext.Provider>
  );
};

export default BlogsToggleContextProvider;
