import React from "react";
import Root from "./Component/Root";

// Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Root />
      </Provider>
    </div>
  );
}

export default App;
