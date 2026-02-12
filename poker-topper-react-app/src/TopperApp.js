import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme, withDefaultColorScheme, withDefaultSize } from "@chakra-ui/react"

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
  const r = Math.min(innerWidth / 1920, innerHeight / 1080);
  window.scaleRatio = r;
  return r;
}

function scaleUI() {
  app.style.transform = "scale(".concat(getScaleRatio(), ")");
}


// 2. Call `extendTheme` and pass your custom values
const customTheme = extendTheme({
  fonts: {
    body: "Roboto",
    heading: "serif",
    mono: "monospace"
  }

})

class TopperApp {


  init = () => {
    const { store } = createStore();

    Object.defineProperty(state$, "dispatch", {
      writable: false,
      enumerable: false,
      value: store.dispatch.bind(store)
    });

    store.subscribe(function () {
      stateSubject.next(store.getState());
    });


    this.store = store;
    this.mountApp();
    this.setupResponsive();

  };


  // Mount <App /> on DOM root
  mountApp = () => {
    ReactDOM.createRoot(root).render(
      <ChakraProvider theme={customTheme}>
        <ReduxProvider store={this.store}>
          <HashRouter>
            <App />
          </HashRouter>
        </ReduxProvider>
      </ChakraProvider>
    );
  };

  setupResponsive = () => {
    var timeout;
    window.addEventListener("resize", function () {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }

      timeout = window.requestAnimationFrame(scaleUI);
    }, false);

    scaleUI();
  }
}

export default TopperApp;
