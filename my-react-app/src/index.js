import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import store from "./redux";
import App from "./App";
import { AuthProvider } from "./AuthProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <ChakraProvider>
    <BrowserRouter>
        <React.StrictMode>
          <AuthProvider>       <App /></AuthProvider>
 
      </React.StrictMode>
    </BrowserRouter>
  </ChakraProvider>
</Provider>
);
