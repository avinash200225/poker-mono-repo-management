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

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { cashierTransactionsSelector } from "../../../store/selectors";
import { Button } from "primereact/button";

class TransactionsHistoryTab extends Component {
  constructor() {
    super();
    this.exportCSV = this.exportCSV.bind(this);
    this.exportPdf = this.exportPdf.bind(this);

    this.cols = [
      { field: "MessageType", header: "Transaction" },
      { field: "playerIp", header: "Player" },
      { field: "amount", header: "Amount" },
      { field: "oldBalance", header: "Before" },
      { field: "newBalance", header: "After" },
      { field: "timestamp", header: "Date Timestamp" },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  exportCSV() {
    this.dt.exportCSV({ selectionOnly: false });
  }

  exportPdf() {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, this.props.cashierTransactions);
        doc.save("transactions.pdf");
      });
    });
  }

  render() {
    var header = (
      <div style={{ textAlign: "left" }}>
        <Button
          type="button"
          iconPos="left"
          label="CSV"
          onClick={this.exportCSV}
        ></Button>
        <Button
          type="button"
          iconPos="left"
          label="PDF"
          onClick={this.exportPdf}
        ></Button>
      </div>
    );

    return (
      <div className="p-grid">
        <div className="col-12 md:col-12 lg:col-12">
          <div className="card card-w-title players-basic-datatable">
            <DataTable
              className="p-players-basic-datatable"
              ref={(el) => {
                this.dt = el;
              }}
              value={this.props.cashierTransactions}
              dataKey="playerIp"
              paginator={true}
              rows={10}
              emptyMessage="No Transactions Found..."
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              paginatorTemplate="CurrentPageReport  FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              rowsPerPageOptions={[5, 10, 15]}
              style={{ fontSize: "20px" }}
              header={header}
              responsiveLayout="false"
            >
              <Column
                field="MessageType"
                header="Transaction"
                style={{ width: "20%" }}
                sortable={true}
              />
              <Column
                field="playerIp"
                header="Player"
                style={{ width: "20%" }}
                sortable={true}
                filter
                filterMatchMode="contains"
              />
              <Column
                field="amount"
                header="Amount"
                style={{ width: "10%" }}
                sortable
              />
              <Column
                field="oldBalance"
                header="Before"
                style={{ width: "10%" }}
              />
              <Column
                field="newBalance"
                header="After"
                style={{ width: "10%" }}
              />
              <Column
                field="timestamp"
                header="Date Timestamp"
                style={{ width: "30%" }}
                sortable={true}
              />
            </DataTable>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = applySpec({
  cashierTransactions: cashierTransactionsSelector,
});

export default connect(mapStateToProps)(TransactionsHistoryTab);
