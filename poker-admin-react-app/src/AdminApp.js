/*
 * Copyright 2025 Wildace Private Limited - All Rights Reserved
 *
 * Licensed under Wildace Software License Agreement ("License").
 * You may not use this file except in compliance with the License.
 *
 * NOTICE
 * ALL INFORMATION CONTAINED HEREIN IS, AND REMAINS THE PROPERTY OF WILDACE PRIVATE LIMITED.
 * THE INTELLECTUAL AND TECHNICAL CONCEPTS CONTAINED HEREIN ARE PROPRIETARY TO WILDACE PRIVATE LIMITED AND ARE PROTECTED BY TRADE SECRET OR COPYRIGHT LAW.
 * DISSEMINATION OF THIS INFORMATION OR REPRODUCTION OF THIS MATERIAL IS STRICTLY FORBIDDEN UNLESS PRIOR WRITTEN PERMISSION IS OBTAINED FROM WILDACE PRIVATE LIMITED.
 * **********************************************************************************************************************************************************************
 * Change History
 * **********************************************************************************************************************************************************************
 * |     Date      |     Name     |      Change     |      Details
 * |  01/08/2025   | Wilson Sam   |     Created     |  File Creation
 * **********************************************************************************************************************************************************************
 * */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultSize,
} from "@chakra-ui/react";
import { radioTheme } from "./chakra/components/radio";
import { switchTheme } from "./chakra/components/switch";

const root = document.getElementById("root");
const app = document.getElementById("app");

document.body.classList.add("desktop-body");
app.classList.add("desktop-app");

import App from "./App";
import { stateSubject, state$, socket$ } from "./streams";
import createStore from "./store";
import "./style.js";

function getScaleRatio() {
  const { innerWidth, innerHeight } = window;
  const r = Math.min(innerWidth / 1920, innerHeight / 1200);
  window.scaleRatio = r;
  return r;
}

function scaleUI() {
  app.style.transform = "scale(".concat(getScaleRatio(), ")");
}

// 2. Call `extendTheme` and pass your custom values
const customTheme = extendTheme({
  styles: {
    global: {
      body: {},
    },
  },
  fonts: {
    body: "Rubik",
    heading: "Rubik",
    mono: "Rubik",
  },

  components: { Radio: radioTheme, Switch: switchTheme },
});

class AdminApp {
  init = () => {
    const { store } = createStore();
    Object.defineProperty(state$, "dispatch", {
      writable: false,
      enumerable: false,
      value: store.dispatch.bind(store),
    });

    store.subscribe(function () {
      stateSubject.next(store.getState());
    });

    this.store = store;
    this.mountApp();
    this.setupResponsive();
  };

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
  };
}

export default AdminApp;
