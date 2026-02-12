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
import React, { Component, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import classNames from "classnames";
import { PrimeIcons } from "primereact/api";
import screenfull from "screenfull";

import { path, applySpec } from "ramda";
import socketActions from "./store/actions/socket";
import AppTopbarFn from "./AppTopbarFn";

import TablePage from "./pages/TablePage/index";
import Transactions from "./pages/Transactions/index";
import BankingPage from "./pages/management-pages/BankingPage";
import UserManagementPage from "./pages/management-pages/UserManagementPage";
import GameSettings from "./pages/management-pages/GameSettings";
import GameSettingsLight from "./pages/management-pages/GameSettingsLight";
import HistoryPage from "./pages/History";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(socketActions.socket.request());
  }, []);

  return (
    <div>
      <AppTopbarFn />

      <Route path="/" exact render={() => <TablePage />} />
      <Route path="/transactions" exact render={() => <Transactions />} />
      <Route path="/cashier" exact render={() => <BankingPage />} />
      <Route path="/history" exact render={() => <HistoryPage />} />
      <Route
        path="/operations/player"
        exact
        render={() => <UserManagementPage />}
      />
      <Route path="/operations/games" exact render={() => <GameSettings />} />
      <Route
        path="/operations/dealerless/games"
        exact
        render={() => <GameSettingsLight />}
      />
    </div>
  );
};

export default App;
