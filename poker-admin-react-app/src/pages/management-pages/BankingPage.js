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

import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";

import BankingAccountTab from "./banking/BankingAccountTab";
import TransactionsHistoryTab from "./banking/TransactionsHistoryTab";
import { Container } from "./style";

class BankingPage extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    return (
      <Container style={{ fontWeight: "900", fontSize: "24px" }}>
        <TabView
          activeIndex={this.state.activeIndex}
          onTabChange={(e) => this.setState({ activeIndex: e.index })}
        >
          <TabPanel leftIcon="pi pi-fw pi-dollar" header="Cashier">
            <BankingAccountTab history={this.props.history}></BankingAccountTab>
          </TabPanel>
          <TabPanel leftIcon="pi pi-fw pi-list" header="Transaction History">
            <TransactionsHistoryTab></TransactionsHistoryTab>
          </TabPanel>
        </TabView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(BankingPage);
