import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'


const root = document.getElementById("root");
const app = document.getElementById("app");

document.body.classList.add("desktop-body");
app.classList.add("desktop-app");


import App from "./App";
import { stateSubject, state$, socket$ } from "./streams";
import createStore from "./store";
import './style.js'

function getScaleRatio() {
  const { innerWidth, innerHeight } = window;
  const r = Math.min(innerWidth / 1920, innerHeight / 1200);
  window.scaleRatio = r;
  return r;
}

function scaleUI() {
  app.style.transform = "scale(".concat(getScaleRatio(), ")");
}

class AdminApp {
  

  init = () => {
    const {store} = createStore();
    this.store = store;
    this.mountApp();
    this.setupResponsive();

  };


  mountApp = () => {
    if (document.getElementById("root")) {
      ReactDOM.render(
        <ChakraProvider>
          <Provider store={this.store}>
            <HashRouter>
              <App wSocket={this.adminWSocket}></App>
            </HashRouter>
            ,
          </Provider>
        </ChakraProvider>,
        document.getElementById("root")
      );
    }
    1;
  };

  setupResponsive = () => {
    var timeout;
    window.addEventListener(
      "resize",
      function () {
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(scaleUI);
      },
      false
    );

    scaleUI();
  }
}

export default AdminApp;
