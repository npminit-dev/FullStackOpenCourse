import "./App.css";
import { createStore } from "redux";
import { reducer } from "./Reducer";
import ReactDOM from "react-dom/client";
import React from "react";
import { render } from "react-dom";

const store = createStore(reducer);

function App() {
  return (
    <div className="App">
      <div>
        <div>
          <button
            onClick={() =>
              store.dispatch({ type: "INCREMENT", payload: "good" })
            }
            title="good increment"
            type="button"
          >
            GOOD
          </button>
          {store.getState().good}
        </div>
        <div>
          <button
            onClick={() => store.dispatch({ type: "INCREMENT", payload: "ok" })}
            title="ok increment"
            type="button"
          >
            OK
          </button>
          {store.getState().ok}
        </div>
        <div>
          <button
            onClick={() =>
              store.dispatch({ type: "INCREMENT", payload: "bad" })
            }
            title="bad increment"
            type="button"
          >
            BAD
          </button>
          {store.getState().bad}
        </div>
        <div>
          <button
            onClick={() => store.dispatch({ type: "SETDEFAULT" })}
            title="reset stats button"
            type="button"
          >
            RESET STATS
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const renderApp = () =>
  render(<App></App>, document.getElementById("root") as HTMLElement);

store.subscribe(renderApp);
