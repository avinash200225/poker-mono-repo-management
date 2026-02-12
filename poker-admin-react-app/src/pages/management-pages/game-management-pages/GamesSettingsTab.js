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

import axios from "axios";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { ProgressBar } from "primereact/progressbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";

import classNames from "classnames";
import moment from "moment";

class GamesSettingsTab extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      selectedGame: null,
      // gamesUsage: null,
      // gamesAccount: null,
      // amount: 0,
      // currencyType: "₹",
      displayDialog: false,
      // displayCreditDialog: false,
      // displayDebitDialog: false,
      // countriesOpts:[],
      // accountsOpts:["Silver","Gold", "Platinum"],
      // usageOpts:["Locked","Unlocked"],
    };
  }

  useWS = (callback) => {
    if (this.props.wSocket != null && this.props.wSocket.readyState === 1) {
      callback();
    } else {
      setTimeout(() => {
        this.useWS(callback);
      }, 1000);
    }
  };

  //Help for Account Filtering
  // onAccountChange = (event) => {
  //     this.games_dt.filter(event.value, 'account', 'in');
  //     // this.games_finance_dt.filter(event.value, 'account', 'in');
  //     this.setState({gamesAccount: event.value});
  // }

  // //Help for Usage Filtering
  // onUsageChange = (event) => {
  //     this.games_dt.filter(event.value, 'usage', 'in');
  //     this.setState({gamesUsage: event.value});
  // }

  findselectedGameIndex = () => {
    return this.state.games.indexOf(this.state.selectedGame);
  };

  onSubmitNewGame = () => {
    let games = [...this.state.games];

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds() +
      "." +
      today.getMilliseconds();
    var dateTime = date + " " + time;

    let game = this.state.game;
    game["updated"] = dateTime;

    games[this.findselectedGameIndex()] = game;

    //REWORK:Instead of using wSocket directly, use this.props.dispatch
    this.useWS(() => {
      this.props.wSocket.send(
        JSON.stringify({ event: "ADMIN_GAMES_CONFIGURE_REQ", payload: game })
      );
    });

    this.props.dispatch({ type: "ADMIN_GAMES_CONFIGURE_REQ", payload: game });

    this.setState({
      games: games,
      selectedGame: null,
      game: null,
      displayDialog: false,
    });
  };

  updateProperty = (property, value) => {
    let game = this.state.game;
    game[property] = value;
    this.setState({ game: game });
  };

  onGameSelect = (e) => {
    if (typeof e.data.dateTime === "undefined") {
      /* It is undefined */
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds() +
        "." +
        today.getMilliseconds();
      var dateTime = date + " " + time;

      this.setState({
        game: Object.assign({}, e.data, { updated: dateTime }),
      });
    } else {
      this.setState({
        game: Object.assign({}, e.data),
      });
    }
  };

  gameEditBodyTemplate = () => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-warning"
          tooltip="Edit Game Details"
          onClick={() => this.setState({ displayDialog: true })}
          style={{ marginLeft: ".5em" }}
        />
      </div>
    );
  };

  render() {
    let dialogFooter = (
      <div className="ui-dialog-buttonpane p-clearfix">
        <Button
          label="Submit"
          icon="pi pi-check"
          onClick={this.onSubmitNewGame}
        />
      </div>
    );

    // let gamesAccount = [
    //     {label: 'Silver', value: 'Silver'},
    //     {label: 'Gold', value: 'Gold'},
    //     {label: 'Platinum', value: 'Platinum'}
    // ];

    // let gamesUsage = [
    //     {label: 'Locked', value: 'Locked'},
    //     {label: 'Unlocked', value: 'Unlocked'}
    // ];

    // let accountFilter = <MultiSelect style={{width: '100%'}} placeholder="Select a Type" value={this.state.gamesAccount} options={gamesAccount} onChange={this.onAccountChange}/>
    // let usageFilter = <MultiSelect style={{width: '100%'}} placeholder="Select Usage" value={this.state.gamesUsage} options={gamesUsage} onChange={this.onUsageChange}/>

    return (
      <div className="p-grid">
        <div className="col-12 md:col-12 lg:col-12">
          <div className="card card-w-title players-basic-datatable">
            <DataTable
              ref={(el) => (this.games_dt = el)}
              value={this.props.games}
              className="p-players-basic-datatable"
              onRowSelect={this.onGameSelect}
              selectionMode="single"
              selection={this.state.selectedGame}
              onSelectionChange={(e) =>
                this.setState({ selectedGame: e.value })
              }
              rowHover
              dataKey="name"
              paginator={true}
              rows={6}
              emptyMessage="No Games Found..."
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              paginatorTemplate="CurrentPageReport  FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              stateStorage="local"
              stateKey="tablestatedemo-local"
              rowsPerPageOptions={[6, 10, 15]}
            >
              <Column field="name" header="Name" style={{ width: "20%" }} />
              <Column field="dealer" header="Dealer" style={{ width: "13%" }} />
              <Column
                field="minBet"
                header="Min Bet"
                style={{ width: "11%" }}
              />
              <Column
                field="maxBet"
                header="Max Bet"
                style={{ width: "11%" }}
              />
              <Column
                field="operationalState"
                header="Op State"
                style={{ width: "15%" }}
              />
              <Column
                field="workingState"
                header="Working State"
                style={{ width: "15%" }}
              />
              <Column
                field="updated"
                header="Last Update"
                style={{ width: "15%" }}
              />
              <Column
                body={this.gameEditBodyTemplate}
                headerStyle={{ width: "5em", textAlign: "center" }}
                bodyStyle={{ textAlign: "center", overflow: "visible" }}
              />
            </DataTable>
            <Dialog
              visible={this.state.displayDialog}
              style={{ width: "330px" }}
              header="Configure Game"
              modal={true}
              footer={dialogFooter}
              onHide={() => this.setState({ displayDialog: false })}
              blockScroll={false}
            >
              {this.state.game && (
                <div className="p-grid p-fluid">
                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label>Game</label>
                  </div>
                  <div className="p-col-8" style={{ padding: ".5em" }}>
                    <label>{this.state.game.name}</label>
                  </div>
                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="dealer">Dealer</label>
                  </div>
                  <div className="p-col-8" style={{ padding: ".5em" }}>
                    <InputText
                      id="dealer"
                      value={this.state.game.dealer}
                      keyfilter={/^[a-zA-Z ]*$/}
                      placeholder="Dealer"
                      tooltip="Enter Dealer Name"
                      onChange={(e) => {
                        this.updateProperty("dealer", e.target.value);
                      }}
                    />
                  </div>
                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="minBet">Min Bet</label>
                  </div>
                  <div className="p-col-8" style={{ padding: ".5em" }}>
                    <InputNumber
                      id="minBet"
                      value={this.state.game.minBet}
                      onChange={(e) => {
                        this.updateProperty("minBet", e.target.value);
                      }}
                    />
                  </div>
                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="maxBet">Max Bet</label>
                  </div>
                  <div className="p-col-8" style={{ padding: ".5em" }}>
                    <InputNumber
                      id="maxBet"
                      value={this.state.game.maxBet}
                      onChange={(e) => {
                        this.updateProperty("maxBet", e.target.value);
                      }}
                    />
                  </div>
                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="operationalState">State</label>
                  </div>
                  <div className="p-col-8" style={{ padding: ".5em" }}>
                    <Dropdown
                      id="operationalState"
                      value={this.state.game.operationalState}
                      options={["Locked", "UnLocked"]}
                      scrollHeight="90px"
                      style={{ width: "12em" }}
                      onChange={(e) => {
                        this.updateProperty("operationalState", e.target.value);
                      }}
                    ></Dropdown>
                  </div>
                </div>
              )}
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { games: state.games };
};

export default connect(mapStateToProps)(GamesSettingsTab);
