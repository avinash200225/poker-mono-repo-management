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
import {
  DownloadIcon,
  InfoIcon,
  InfoOutlineIcon,
  SearchIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";

import { betTransactionsSelector } from "../../../../store/selectors";
import { formatRupee } from "../../../../utils/functions/formatRupee";

function BetRecordsTable() {
  const betRecords = useSelector(betTransactionsSelector);
  const totalBet = betRecords.reduce((result, item) => result + item.amount, 0);
  const dt = useRef(null);

  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    initFilters();
  }, []);

  const cols = [
    { field: "playerIp", header: "Player Id" },
    { field: "roundId", header: "Round" },
    { field: "tableId", header: "Table" },
    { field: "gameName", header: "Game" },
    { field: "amount", header: "Amount" },
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

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(exportColumns, betRecords);
        doc.save(
          `Player Bet Records_${new Date()
            .toLocaleString()
            .replace(",", "")
            .replace(" ", "_")}.pdf`
        );
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(betRecords);
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
          footer="Totals:"
          colSpan={2}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={formatRupee(totalBet)} />
        <Column footer="" />
        <Column footer="" />
        <Column footer="" />
      </Row>
    </ColumnGroup>
  );

  const amountBodyTemplate = (rowData) => {
    const { gameName, betDetails } = rowData;
    return (
      <>
        <span>{formatRupee(rowData.amount)}</span>
      </>
    );
  };
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
        value={betRecords}
        filters={filters}
        globalFilterFields={["playerIp", "roundId", "timestamp"]}
        paginator
        responsiveLayout="false"
        rows={8}
        showGridlines
        emptyMessage="No records found."
        style={{ fontSize: "20px" }}
        footerColumnGroup={footerGroup}
      >
        <Column header="Player Id" field="playerIp" />
        <Column header="Round Id" field="roundId" />
        <Column header="Bet Amount" field="amount" body={amountBodyTemplate} />
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
          header="DateTime"
          field="timestamp"
          body={timestampBodyTemplate}
        />
      </DataTable>
    </>
  );
}

export default BetRecordsTable;
