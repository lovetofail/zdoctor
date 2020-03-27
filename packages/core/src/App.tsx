import React from "react";
import Routes from "./Routes";
import { store } from "./redux";
import { Provider } from "react-redux";

export function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
