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
import React, { Component } from "react";
import { connect } from "react-redux";
import { applySpec } from "ramda";
import { PrimeIcons } from "primereact/api";
import { TabView, TabPanel } from "primereact/tabview";

import {
  betTransactionsSelector,
  cashierTransactionsSelector,
  noWinTransactionsSelector,
  winTransactionsSelector,
} from "../../store/selectors";
import { Container } from "./style";
import CashRecordsTable from "./components/CashRecordsTable";
import BetRecordsTable from "./components/BetRecordsTable";
import WinRecordsTable from "./components/WinRecordsTable";

class Transactions extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    return (
      <Container
        style={{
          paddingLeft: "14px",
          fontWeight: "900",
          color: "purple",
          fontSize: "24px",
        }}
      >
        <TabView
          style={{ fontSize: "20px" }}
          activeIndex={this.state.activeIndex}
          onTabChange={(e) => this.setState({ activeIndex: e.index })}
        >
          <TabPanel leftIcon={PrimeIcons.LIST} header="Banking">
            <CashRecordsTable />
          </TabPanel>
          <TabPanel leftIcon={PrimeIcons.LIST} header="Bets">
            <BetRecordsTable />
          </TabPanel>
          <TabPanel leftIcon={PrimeIcons.LIST} header="Wins">
            <WinRecordsTable />
          </TabPanel>
        </TabView>
      </Container>
    );
  }
}

const mapStateToProps = applySpec({
  cashierTransactions: cashierTransactionsSelector,
  betTransactions: betTransactionsSelector,
  winTransactions: winTransactionsSelector,
  noWinTransactions: noWinTransactionsSelector,
});

export default connect(mapStateToProps)(Transactions);
