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
import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { useSelector } from "react-redux";
import {
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";

import { formatRupee } from "../../../../utils/functions/formatRupee";
import { cashierTransactionsSelector } from "../../../../store/selectors";

function CashRecordsTable() {
  const cashRecords = useSelector(cashierTransactionsSelector);
  const totalCashIn = cashRecords
    .filter((item) => item.MessageType == "DEPOSIT_SUCCESS")
    .reduce((result, item) => result + item.amount, 0);
  const totalCashOut = cashRecords
    .filter((item) => item.MessageType == "WITHDRAW_SUCCESS")
    .reduce((result, item) => result + item.amount, 0);
  const dt = useRef(null);

  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    initFilters();
  }, []);

  const cols = [
    { field: "playerIp", header: "Player Ip" },
    { field: "MessageType", header: "Trans Type" },
    { field: "transType", header: "Trans By" },
    { field: "amount", header: "Transaction Amount" },
    { field: "oldBalance", header: "PrevCredit" },
    { field: "newBalance", header: "ThenCredit" },
    { field: "timestamp", header: "DateTime" },
  ];

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue("");
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(exportColumns, cashRecords);
        doc.save(
          `Cash Transaction Records_${new Date()
            .toLocaleString()
            .replace(",", "")
            .replace(" ", "_")}.pdf`
        );
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(cashRecords);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(
        excelBuffer,
        `Player Bet Records_${new Date()
          .toLocaleString()
          .replace(",", "")
          .replace(" ", "_")}`
      );
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const header = (
    <HStack direction={"row-reverse"}>
      <span className="p-input-icon-left">
        <InputText
          style={{ fontSize: "20px" }}
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </span>
      <Spacer />
      <ButtonGroup variant={"outline"} spacing="6">
        <Button
          leftIcon={<DownloadIcon />}
          size={"sm"}
          colorScheme="blue"
          onClick={() => exportCSV(false)}
        >
          CSV
        </Button>
        <Button
          leftIcon={<DownloadIcon />}
          size={"sm"}
          colorScheme="green"
          onClick={exportExcel}
        >
          XLS
        </Button>
        <Button
          leftIcon={<DownloadIcon />}
          size={"sm"}
          colorScheme="red"
          onClick={exportPdf}
        >
          PDF
        </Button>
      </ButtonGroup>
    </HStack>
  );

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer={"Total:"}
          colSpan={1}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={formatRupee(totalCashIn)} />
        <Column footer={formatRupee(totalCashOut)} />
        <Column footer={""} colSpan={5} footerStyle={{ textAlign: "right" }} />
      </Row>
      <Row>
        <Column
          footer={"Closing Balance"}
          colSpan={1}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={formatRupee(totalCashIn - totalCashOut)} colSpan={2} />
        <Column footer={""} colSpan={5} footerStyle={{ textAlign: "right" }} />
      </Row>
    </ColumnGroup>
  );

  const oldBalanceBodyTemplate = (rowData) => {
    return (
      <>
        <span>{formatRupee(rowData.oldBalance)}</span>
      </>
    );
  };
  const newBalanceBodyTemplate = (rowData) => {
    return (
      <>
        <span>{formatRupee(rowData.newBalance)}</span>
      </>
    );
  };
  const depositAmountBodyTemplate = (rowData) => {
    return (
      <>
        <span>
          {rowData.MessageType.includes("DEPOSIT")
            ? formatRupee(rowData.amount)
            : ""}
        </span>
      </>
    );
  };
  const transTypeBodyTemplate = (rowData) => {
    return (
      <>
        <span>{rowData.MessageType.substr(0, 7)}</span>
      </>
    );
  };
  const withdrawAmountBodyTemplate = (rowData) => {
    return (
      <>
        <span>
          {rowData.MessageType.includes("WITHDRAW")
            ? formatRupee(rowData.amount)
            : ""}
        </span>
      </>
    );
  };

  const timestampBodyTemplate = (rowData) => {
    return (
      <>
        <span>{rowData.timestamp.slice(0, -8)}</span>
      </>
    );
  };

  return (
    <>
      <DataTable
        ref={dt}
        dataKey="playerIp"
        header={header}
        value={cashRecords}
        filters={filters}
        globalFilterFields={[
          "playerIp",
          "MessageType",
          "transType",
          "timestamp",
        ]}
        paginator
        rows={12}
        showGridlines
        responsiveLayout="false"
        emptyMessage="No records found."
        style={{ fontSize: "20px" }}
        footerColumnGroup={footerGroup}
      >
        <Column header="Player" field="playerIp" />
        <Column
          header="Deposited"
          field="amount"
          body={depositAmountBodyTemplate}
        />
        <Column
          header="Withdrawn"
          field="amount"
          body={withdrawAmountBodyTemplate}
        />
        <Column
          header="PrevCredit"
          field="oldBalance"
          body={oldBalanceBodyTemplate}
        />
        <Column
          header="ThenCredit"
          field="newBalance"
          body={newBalanceBodyTemplate}
        />
        <Column
          header="TransType"
          field="MessageType"
          body={transTypeBodyTemplate}
        />
        <Column header="TransBy" field="transType" />
        <Column
          header="DateTime"
          field="timestamp"
          body={timestampBodyTemplate}
        />
      </DataTable>
    </>
  );
}

export default CashRecordsTable;
