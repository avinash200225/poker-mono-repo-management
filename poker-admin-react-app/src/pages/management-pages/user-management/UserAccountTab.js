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
import classNames from "classnames";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

/* 

*/

class UserAccountTab extends Component {
  constructor() {
    super();
    this.state = {
      selectedPlayer: null,
      player: null,
      playersUsage: null,
      amount: 0,
      currencyType: "₹",
      displayDialog: false,
    };
  }

  /*
   e.value seems to hold the selected row object, so copy it to this.player 
  */
  onPlayerSelectionChange = (e) => {
    console.log(`onPlayerSelectionChange`, e.value);
    this.newPlayer = false;

    this.setState({
      displayDialog: true,
      player: { ...e.value },
    });
  };

  onSubmitNewPlayer = () => {};

  updateProperty = (property, value) => {
    let player = this.state.player;
    player[property] = value;
    this.setState({ player: player });
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

  dialogFooter = () => (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Submit"
        icon="pi pi-check"
        onClick={this.onSubmitNewPlayer}
      />
    </div>
  );

  render() {
    return (
      <div className="p-grid">
        <Toast ref={(el) => (this.toast = el)} />
        <div className="col-12 md:col-12 lg:col-12">
          <div className="card-w-title players-basic-datatable">
            <DataTable
              ref={(el) => (this.players_dt = el)}
              value={this.props.players}
              className="p-players-basic-datatable"
              selectionMode="single"
              selection={this.state.selectedPlayer}
              onSelectionChange={this.onPlayerSelectionChange}
              dataKey="uid"
              paginator={true}
              rows={8}
              emptyMessage="No Players Found..."
              // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              // paginatorTemplate="CurrentPageReport  FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              // rowsPerPageOptions={[8, 10, 15]}
            >
              <Column field="uid" header="Player Id" style={{ width: "20%" }} />
              <Column
                field="nickname"
                header="Nick Name"
                style={{ width: "20%" }}
              />

              <Column
                field="balance"
                header="Balance"
                style={{ width: "10%" }}
                sortable={true}
              />

              <Column
                field="client_ip"
                header="Connecting Via"
                style={{ width: "15%" }}
                sortable={true}
                filter={true}
              />
              <Column
                field="status"
                header="Status"
                style={{ width: "10%" }}
                body={this.statusBodyTemplate}
              />
              <Column
                field="usage"
                header="Usage"
                style={{ width: "10%" }}
                body={this.usageBodyTemplate}
              />
            </DataTable>
            <Dialog
              visible={this.state.displayDialog}
              style={{ width: "330px" }}
              modal={false}
              footer={this.dialogFooter}
              header={"Fill In Player Details"}
              onHide={() => {
                this.newPlayer = false;
                this.setState({ displayDialog: false });
              }}
            >
              {this.state.player && (
                <div className="p-grid p-fluid">
                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="nickname">Name</label>
                  </div>
                  <div className="p-col-8" style={{ padding: ".5em" }}>
                    <InputText
                      id="name"
                      value={this.state.player.nickname}
                      keyfilter={/^[a-zA-Z ]*$/}
                      placeholder="Name"
                      tooltip="Enter Name"
                      onChange={(e) => {
                        this.updateProperty("nickname", e.target.value);
                      }}
                    />
                  </div>
                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="usage">Usage</label>
                  </div>
                  <div className="p-col-8" style={{ padding: ".5em" }}>
                    <Dropdown
                      id="usage"
                      value={this.state.player.usage}
                      options={["locked", "unlocked"]}
                      scrollHeight="60px"
                      placeholder="Select Usage"
                      onChange={(e) => {
                        this.updateProperty("usage", e.value);
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

export default UserAccountTab;
