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
import classNames from "classnames";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";

import { applySpec } from "ramda";
import { playersSelector } from "../../../store/selectors";

import playersActions from "../../../store/actions/players";

class BankingAccountTab extends Component {
  constructor() {
    super();
    this.state = {
      selectedPlayer: null,
      player: null,
      amount: 0,
      currencyType: "₹",
      displayCreditDialog: false,
      displayDebitDialog: false,
    };
  }

  onSubmitDeposit = () => {
    this.props.addMoney({
      MessageType: "DEPOSIT_REQ",
      clientIp: this.state.player.client_ip,
      uid: this.state.player.uid,
      amount: this.state.amount,
    });

    const detailStr =
      "User:" + this.state.player.nickname + " Amount:" + this.state.amount;

    this.toast.show({
      severity: "info",
      summary: "Deposit Request Sent",
      detail: detailStr,
      life: 3000,
    });

    this.setState({
      player: null,
      amount: 0,
      displayCreditDialog: false,
    });
  };

  onSubmitWithdraw = () => {
    this.props.removeMoney({
      MessageType: "WITHDRAW_REQ",
      clientIp: this.state.player.client_ip,
      uid: this.state.player.uid,
      amount: this.state.amount,
    });

    const detailStr =
      "User:" + this.state.player.nickname + " Amount:" + this.state.amount;
    this.toast.show({
      severity: "info",
      summary: "Withdraw Request Sent",
      detail: detailStr,
      life: 3000,
    });

    this.setState({
      player: null,
      amount: 0,
      displayDebitDialog: false,
    });
  };

  onPlayerSelect = (e) => {
    this.setState({
      player: Object.assign({}, e.data),
    });
  };

  renderCreditFooter = () => {
    return (
      <div>
        <Button
          label="Add Money"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.onSubmitDeposit}
        />
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() =>
            this.setState({ player: null, displayCreditDialog: false })
          }
          className="p-button-secondary"
        />
      </div>
    );
  };

  renderDebitFooter = () => {
    return (
      <div>
        <Button
          label="Withdraw Money"
          icon="pi pi-check"
          className="p-button-warning"
          onClick={this.onSubmitWithdraw}
        />
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() =>
            this.setState({ player: null, displayDebitDialog: false })
          }
          className="p-button-secondary"
        />
      </div>
    );
  };

  balanceBodyTemplate = (rowData) => {
    let { balance } = rowData;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <span>
          <InputNumber
            value={balance}
            mode="currency"
            currency="INR"
            locale="en-IN"
            readOnly
            size={12}
            maxFractionDigits={2}
          />
        </span>
        <Button
          type="button"
          disabled={rowData == null}
          icon="pi pi-plus"
          className="p-button-success"
          onClick={(e) => {
            this.setState({ player: rowData, displayCreditDialog: true });
          }}
          style={{ marginLeft: ".5em", padding: "10px" }}
        >
          Deposit
        </Button>
        <Dialog
          header="Add Money"
          modal={false}
          visible={this.state.displayCreditDialog}
          style={{ width: "50%" }}
          onHide={() => this.setState({ displayCreditDialog: false })}
          footer={this.renderCreditFooter()}
        >
          {this.state.player && (
            <div className="p-grid  user-balance-center">
              <div className="col-12  md:col-12 lg:col-12 user-data">
                <div className="user-subtitle"> Player Name</div>
                <div className="user-title"> {this.state.player.nickname}</div>
                <div className="user-subtitle"> Wallet Amount</div>
                <div className="user-title">
                  {this.state.currencyType}
                  {this.state.player.balance}
                </div>

                <InputNumber
                  className="user-amount"
                  value={this.state.amount}
                  onChange={(e) => this.setState({ amount: e.value })}
                  mode="decimal"
                  prefix={this.state.currencyType}
                  showButtons
                  buttonLayout="horizontal"
                  decrementButtonClassName="p-button-secondary"
                  incrementButtonClassName="p-button-secondary"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                  min={0}
                  step={1}
                />

                <div className="user-buttons">
                  <Button
                    icon="pi pi-trash"
                    label="Clear"
                    className="p-button-danger"
                    onClick={() => this.setState({ amount: 0 })}
                  />
                </div>

                <div className="user-buttons">
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "10"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 10 })
                    }
                  />
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "50"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 50 })
                    }
                  />
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "100"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 100 })
                    }
                  />
                </div>

                <div className="user-buttons">
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "500"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 500 })
                    }
                  />
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "1000"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 1000 })
                    }
                  />
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "5000"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 5000 })
                    }
                  />
                </div>
                <div className="user-buttons">
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "10000"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 10000 })
                    }
                  />
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "50000"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 50000 })
                    }
                  />
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "100000"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 100000 })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </Dialog>

        <Button
          type="button"
          disabled={rowData == null}
          icon="pi pi-minus"
          className="p-button-danger"
          onClick={(e) => {
            this.setState({ player: rowData, displayDebitDialog: true });
          }}
          style={{ marginLeft: ".5em", padding: "10px" }}
        >
          Withdraw
        </Button>
        <Dialog
          header="Withdraw Money"
          modal={false}
          visible={this.state.displayDebitDialog}
          style={{ width: "50%", padding: "0" }}
          onHide={() => this.setState({ displayDebitDialog: false })}
          footer={this.renderDebitFooter()}
        >
          {this.state.player && (
            <div className="p-grid  user-balance-center">
              <div className="col-12  md:col-12 lg:col-12 user-data">
                <div className="user-subtitle"> Player Name</div>
                <div className="user-title"> {this.state.player.nickname}</div>
                <div className="user-subtitle"> Wallet Amount</div>
                <div className="user-title">
                  {this.state.currencyType}
                  {this.state.player.balance}
                </div>

                <InputNumber
                  className="user-amount"
                  value={this.state.amount}
                  onChange={(e) => this.setState({ amount: e.value })}
                  mode="decimal"
                  prefix={this.state.currencyType}
                  showButtons
                  buttonLayout="horizontal"
                  decrementButtonClassName="p-button-secondary"
                  incrementButtonClassName="p-button-secondary"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                  min={0}
                  step={1}
                />

                <div className="user-buttons">
                  <Button
                    icon="pi pi-trash"
                    label="Clear"
                    className="p-button-danger"
                    onClick={() => this.setState({ amount: 0 })}
                  />
                </div>

                <div className="user-buttons">
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "10"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 10 })
                    }
                  />
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "50"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 50 })
                    }
                  />
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "100"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 100 })
                    }
                  />
                </div>

                <div className="user-buttons">
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "500"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 500 })
                    }
                  />
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "1000"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 1000 })
                    }
                  />
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "5000"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 5000 })
                    }
                  />
                </div>
                <div className="user-buttons">
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "10000"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 10000 })
                    }
                  />
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "50000"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 50000 })
                    }
                  />
                  <Button
                    icon="pi pi-plus"
                    label={this.state.currencyType + "100000"}
                    className="p-button-secondary"
                    onClick={() =>
                      this.setState({ amount: this.state.amount + 100000 })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </Dialog>
      </div>
    );
  };

  playerNameBodyTemplate = (rowData) => {
    var fallback = window.location.origin + "/assets/images/" + "user" + ".png";

    return (
      <React.Fragment>
        <img
          alt={rowData.nickname}
          src={fallback}
          width="32"
          style={{ verticalAlign: "middle" }}
        />
        <span style={{ verticalAlign: "middle", marginLeft: ".5em" }}>
          {rowData.nickname}
        </span>
      </React.Fragment>
    );
  };

  statusBodyTemplate = (rowData) => {
    return (
      <span className={classNames("player", "status-" + rowData.status)}>
        {rowData.status}
      </span>
    );
  };

  usageBodyTemplate = (rowData) => {
    return (
      <span className={classNames("player", "usage-" + rowData.usage)}>
        {rowData.usage}
      </span>
    );
  };

  render() {
    return (
      <div style={{ fontWeight: "900", fontSize: "24px" }}>
        <Toast ref={(el) => (this.toast = el)} />
        <DataTable
          ref={(el) => (this.players_dt = el)}
          value={this.props.players}
          onRowSelect={this.onPlayerSelect}
          selectionMode="single"
          selection={this.state.selectedPlayer}
          onSelectionChange={(e) => this.setState({ selectedPlayer: e.value })}
          dataKey="client_ip"
          paginator={true}
          rows={10}
          emptyMessage="No Players Found..."
          responsiveLayout="false"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          paginatorTemplate="CurrentPageReport  FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          style={{ fontSize: "20px" }}
          rowsPerPageOptions={[5, 10, 15]}
        >
          <Column
            field="nickname"
            header="Player Name"
            style={{ width: "15%" }}
            // body={this.playerNameBodyTemplate}
            sortable={true}
            filter={true}
          />
          {/* <Column
                field="client_ip"
                header="IP Address"
                style={{ width: "15%" }}
                sortable={true}
                filter={true}
              /> */}
          <Column
            field="usage"
            header="Usage"
            style={{ width: "10%" }}
            body={this.usageBodyTemplate}
            sortable
            filter
          />
          <Column
            field="status"
            header="Status"
            style={{ width: "15%" }}
            body={this.statusBodyTemplate}
            sortable
            filter
          />
          <Column
            field="balance"
            header="Balance Amount"
            style={{ width: "20%" }}
            body={this.balanceBodyTemplate}
            sortable
            filter
            filterMatchMode="gte"
          />
        </DataTable>
      </div>
    );
  }
}

const mapStateToProps = applySpec({
  players: playersSelector,
});
const mapDispatchToProps = {
  addMoney: playersActions.balance.add,
  removeMoney: playersActions.balance.remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(BankingAccountTab);
