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

class ActivityHistoryTab extends Component {
  constructor() {
    super();
  }

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
      <div className="p-grid">
        <div className="col-12 md:col-12 lg:col-12">
          <div className="card-w-title players-basic-datatable">
            <DataTable
              className="p-players-basic-datatable"
              value={this.props.operations}
              dataKey="client_ip"
              paginator={true}
              rows={10}
              emptyMessage="No Transactions Found..."
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              paginatorTemplate="CurrentPageReport  FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              rowsPerPageOptions={[5, 10, 15]}
            >
              <Column
                field="MessageType"
                header="Operation"
                style={{ width: "20%" }}
                sortable={true}
                filter={true}
              />
              <Column
                field="nickname"
                header="Player Name"
                style={{ width: "20%" }}
                body={this.playerNameBodyTemplate}
                sortable={true}
                filter={true}
              />
              <Column
                field="client_ip"
                header="IP Address"
                style={{ width: "15%" }}
                sortable={true}
                filter={true}
              />
              <Column
                field="status"
                header="Status"
                style={{ width: "10%" }}
                body={this.statusBodyTemplate}
                sortable
                filter
              />
              <Column
                field="usage"
                header="Usage"
                style={{ width: "10%" }}
                body={this.usageBodyTemplate}
                sortable
                filter
              />
              <Column
                field="timestamp"
                header="TimeStamp"
                style={{ width: "25%" }}
                sortable
                filter
              />
            </DataTable>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityHistoryTab;
