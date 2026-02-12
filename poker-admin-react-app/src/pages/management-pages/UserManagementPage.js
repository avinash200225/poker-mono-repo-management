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
import React, { Component, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { applySpec, trim } from "ramda";

import UserAccountTab from "./user-management/UserAccountTab";
import ActivityHistoryTab from "./user-management/ActivityHistoryTab";

import { operationsSelector, playersSelector } from "../../store/selectors";
import playersActions from "../../store/actions/players";
import { Container } from "./style";

import { useToast } from "@chakra-ui/react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { classNames } from "primereact/utils";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Spacer,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import ipRegex from "ip-regex"; //TODO use it along with Yup to have a better validation on IP address
import * as Yup from "yup";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useFormik } from "formik";

const statusBodyTemplate = (rowData) => {
  return (
    <span className={classNames("player", "status-" + rowData.status)}>
      {rowData.status}
    </span>
  );
};

const usageBodyTemplate = (rowData) => {
  return (
    <span className={classNames("player", "usage-" + rowData.usage)}>
      {rowData.usage}
    </span>
  );
};

const formatCurrency = (value = "") => {
  return value.toLocaleString("en-IN", { style: "currency", currency: "INR" });
};

const balanceBodyTemplate = (rowData) => {
  return formatCurrency(rowData.balance);
};

export const ipv4 = Yup.object().shape({
  ip: Yup.string().matches(
    /(^(\d{1,3}\.){3}(\d{1,3})$)/, //a regex solution for ipV4 address
    {
      message: "Invalid IP address",
      excludeEmptyString: true,
    }
  ),
});

function UserManagementPage({
  players,
  operations,
  addUser,
  updateUser,
  lockUser,
  unLockUser,
}) {
  //TODO: use @faker-js/faker Library to add dummy data

  //React State System
  const [user, setUser] = useState(null);
  const [changeIpDialog, setChangeIpDialog] = useState(false);
  const [changeNameDialog, setChangeNameDialog] = useState(false);
  const [filters, setFilters] = useState(null);

  //References
  const toast = useToast();
  const tableRef = useRef(null);
  const historyRef = useRef(null);

  //Forms
  //1. ChangeName Form
  const changeNameForm = useFormik({
    initialValues: {
      nickName: "",
    },
    validationSchema: Yup.object().shape({
      nickName: Yup.string().required().min(2, "Min 2 char is must!"),
    }),
    onSubmit: (values) => {
      const { uid, ...rest } = user;
      updateUser({
        MessageType: "USER_NAME_UPDATE",
        uid: uid,
        nickname: values.nickName,
      });

      toast({
        title: "User Change Name Form Submitted.",
        description: JSON.stringify(values, null, 2),
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      setChangeNameDialog(false);
    },
  });

  //2. ChangeIP Form
  const changeIpForm = useFormik({
    initialValues: {
      ip: "",
    },
    validationSchema: ipv4,
    onSubmit: (values) => {
      const { uid, ...rest } = user;
      updateUser({
        MessageType: "USER_IP_UPDATE",
        uid: uid,
        ip: values.ip,
      });

      toast({
        title: "User Change IP Form Submitted.",
        description: JSON.stringify(values, null, 2),
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      setChangeIpDialog(false);
    },
  });

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
  };

  const onRowSelect = (e) => {
    setUser(e.data);
  };

  const onSelectionChange = (e) => {
    setUser(e.value);
  };

  const onRowUnselect = (e) => {
    setUser(null);
  };

  useEffect(() => {
    initFilters();
  }, []);

  if (user != null) {
    return (
      <Container>
        <div
          style={{ background: "#fff", height: "inherit", padding: ".5rem" }}
        >
          <Modal
            isOpen={changeNameDialog}
            onClose={() => setChangeNameDialog(false)}
          >
            <ModalOverlay />
            <ModalContent as="form" onSubmit={changeNameForm.handleSubmit}>
              <ModalHeader>Change Name</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Nick name</FormLabel>
                  <Input
                    value={changeNameForm.values.nickName}
                    onChange={(event) =>
                      changeNameForm.setFieldValue(
                        "nickName",
                        event.target.value
                      )
                    }
                    isRequired
                    autoComplete="off"
                    variant="filled"
                    color="teal"
                    placeholder="Nick name"
                    _placeholder={{ opacity: 0.4, color: "inherit" }}
                  />
                  {changeNameForm.errors.nickName &&
                  changeNameForm.touched.nickName ? (
                    <div style={{ color: "red" }}>
                      {changeNameForm.errors.nickName}
                    </div>
                  ) : null}
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="ghost"
                  mr={3}
                  onClick={() => setChangeNameDialog(false)}
                >
                  Close
                </Button>
                <Button type="submit" colorScheme="blue" variant="ghost">
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal
            isOpen={changeIpDialog}
            onClose={() => setChangeIpDialog(false)}
          >
            <ModalOverlay />
            <ModalContent as="form" onSubmit={changeIpForm.handleSubmit}>
              <ModalHeader>Change IP</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>IP Address</FormLabel>
                  <Input
                    value={changeIpForm.values.ip}
                    onChange={(event) =>
                      changeIpForm.setFieldValue("ip", event.target.value)
                    }
                    isRequired
                    autoComplete="off"
                    variant="filled"
                    color="teal"
                    placeholder="IP Address"
                    _placeholder={{ opacity: 0.4, color: "inherit" }}
                  />
                  {changeIpForm.errors.ip && changeIpForm.touched.ip ? (
                    <div style={{ color: "red" }}>{changeIpForm.errors.ip}</div>
                  ) : null}
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="ghost"
                  mr={3}
                  onClick={() => setChangeIpDialog(false)}
                >
                  Close
                </Button>
                <Button type="submit" colorScheme="blue" variant="ghost">
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Flex
            minWidth="max-content"
            alignItems="center"
            gap="2"
            color="teal.400"
          >
            <Box p="2">
              <Heading fontSize={"3xl"}>{"Users Account Book"}</Heading>
              <Spacer />
              <Heading fontSize={"sm"}>
                {"Table network users history."}
              </Heading>
            </Box>
            <Spacer />
            <ButtonGroup gap="2">
              <Button disabled colorScheme="teal">
                {"+IMPORT"}
              </Button>
              <Button disabled colorScheme="teal">
                {"+ADD"}
              </Button>
            </ButtonGroup>
          </Flex>

          <div className="grid" style={{ height: "inherit", marginTop: "5px" }}>
            <div
              className="col-fixed"
              style={{ width: "20%", border: "1px solid #E2E8F0" }}
            >
              {/* <div className="card-w-title players-basic-datatable"> */}
              <DataTable
                ref={tableRef}
                value={players}
                className="p-players-basic-datatable"
                selectionMode="single"
                selection={user}
                onSelectionChange={onSelectionChange}
                // onRowSelect={onRowSelect}
                // onRowUnselect={onRowUnselect}
                showGridlines
                dataKey="uid"
                emptyMessage="No Entries Found..."
                responsiveLayout="false"
              >
                <Column
                  selectionMode="single"
                  headerStyle={{ width: "10%" }}
                ></Column>
                <Column field="uid" header="User Id" style={{ width: "20%" }} />
                <Column
                  field="balance"
                  header="Account Balance"
                  style={{ width: "20%" }}
                  sortable
                  body={balanceBodyTemplate}
                />
              </DataTable>
              {/* </div> */}
            </div>
            <div
              className="col-fixed"
              style={{ width: "80%", border: "1px solid #E2E8F0" }}
            >
              <VStack gap={"1%"} height={"100%"} width={"100%"}>
                <VStack
                  height={"20%"}
                  width={"100%"}
                  divider={<StackDivider borderColor="gray.200" />}
                  spacing={1}
                  align="stretch"
                  shadow={"lg"}
                  border={"1px solid var(--teal-100)"}
                  color="teal.600"
                >
                  <Flex
                    p={"2"}
                    h="40%"
                    minWidth="max-content"
                    alignItems="center"
                    gap="2"
                  >
                    <Box>
                      <Heading color="teal.800" fontSize={"3xl"}>
                        NAME: {user.nickname}
                      </Heading>
                    </Box>
                    <Spacer />
                    <ButtonGroup gap="2">
                      <Button
                        onClick={() => {
                          setChangeNameDialog(true);
                        }}
                        colorScheme="teal"
                      >
                        {"CHANGE NAME"}
                      </Button>
                      <Button
                        onClick={() => {
                          setChangeIpDialog(true);
                        }}
                        colorScheme="teal"
                      >
                        {"CHANGE IP"}
                      </Button>
                    </ButtonGroup>
                  </Flex>
                  <Flex p={"1"} h="20%">
                    <Box p="2">
                      <Heading fontSize="xl">
                        IP ADDRESS: {user.client_ip}
                      </Heading>
                    </Box>
                    <Spacer />
                    <Box p="2">
                      <Heading fontSize="xl">USER ID: {user.uid}</Heading>
                    </Box>
                  </Flex>
                  <Flex p={"1"} h="20%">
                    <Box p="2">
                      <Heading fontSize="xl">
                        STATUS: {user.status && user.status.toUpperCase()}
                      </Heading>
                    </Box>
                    <Spacer />
                    <Box p="2">
                      <Heading fontSize="xl">
                        USAGE: {user.usage && user.usage.toUpperCase()}
                      </Heading>
                    </Box>
                  </Flex>
                  <Flex p={"1"} h="20%">
                    <Box p="2">
                      <Heading fontSize="xl">
                        BALANCE AMOUNT: {formatCurrency(user.balance)}
                      </Heading>
                    </Box>
                    <Spacer />
                  </Flex>
                </VStack>

                <VStack
                  height={"66%"}
                  width={"100%"}
                  shadow={"lg"}
                  border={"1px solid var(--teal-100)"}
                >
                  <Flex
                    p={"2"}
                    h="5%"
                    width={"inherit"}
                    minWidth="max-content"
                    alignItems="center"
                    gap="2"
                  >
                    <Box p="2">
                      <Heading fontSize="xl">CHANGE HISTORY</Heading>
                    </Box>
                    <Spacer />
                    <Box p={"2"}></Box>
                  </Flex>
                  <Flex
                    h="3%"
                    width={"inherit"}
                    minWidth="max-content"
                    alignItems="center"
                    gap="2"
                  >
                    <Box p={"2"}></Box>
                    <Spacer />
                    <Box p="2">
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<SearchIcon color="gray.300" />}
                        ></InputLeftElement>
                        <Input variant="outline" placeholder="Search" />
                      </InputGroup>
                    </Box>
                  </Flex>
                  <Box
                    h="100%"
                    w="100%"
                    p={4}
                    color="black"
                    className="card-w-title players-basic-datatable"
                  >
                    <DataTable
                      value={user.history || []}
                      dataKey="index"
                      ref={historyRef}
                      showGridlines
                      paginator={true}
                      rows={10}
                      emptyMessage="No Records Found..."
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                      paginatorTemplate="CurrentPageReport  FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      rowsPerPageOptions={[5, 10, 15]}
                      className="p-players-basic-datatable"
                      responsiveLayout="false"
                    >
                      <Column
                        field="index"
                        header="INDEX"
                        style={{ width: "5%" }}
                      />
                      <Column
                        field="type"
                        header="TYPE"
                        style={{ width: "15%" }}
                      />
                      <Column
                        field="nickname"
                        header="NAME"
                        style={{ width: "10%" }}
                      />
                      <Column
                        field="balance"
                        header="BALANCE"
                        style={{ width: "10%" }}
                      />
                      <Column
                        field="client_ip"
                        header="IP ADDRESS"
                        style={{ width: "10%" }}
                      />
                      <Column
                        field="status"
                        header="STATUS"
                        body={statusBodyTemplate}
                        style={{ width: "10%" }}
                      />
                      <Column
                        field="timestamp"
                        header="TIMELINE"
                        style={{ width: "20%" }}
                      />
                    </DataTable>
                  </Box>
                </VStack>
              </VStack>
            </div>
          </div>
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        <div className="card" style={{ height: "inherit" }}>
          <div className="card-header">
            <h4>User List</h4>
          </div>
          <p>Table network users list.</p>

          <div className="grid" style={{ height: "inherit" }}>
            <div className="col-12">
              <div className="card-w-title players-basic-datatable">
                <DataTable
                  value={players}
                  ref={tableRef}
                  showGridlines
                  className="p-players-basic-datatable"
                  dataKey="uid"
                  filters={filters}
                  selectionMode="single"
                  selection={user}
                  onSelectionChange={onSelectionChange}
                  // onRowSelect={onRowSelect}
                  // onRowUnselect={onRowUnselect}
                  responsiveLayout="false"
                >
                  <Column
                    selectionMode="single"
                    headerStyle={{ width: "10%" }}
                  ></Column>
                  <Column
                    field="uid"
                    header="User Id"
                    style={{ width: "10%" }}
                  />
                  <Column
                    field="nickname"
                    header="Nick Name"
                    style={{ width: "10%" }}
                  />
                  <Column
                    field="balance"
                    header="Account Balance"
                    style={{ width: "10%" }}
                    sortable
                    body={balanceBodyTemplate}
                  />
                  <Column
                    field="client_ip"
                    header="Connecting Via"
                    style={{ width: "10%" }}
                    sortable
                  />
                  <Column
                    field="status"
                    header="Connection Status"
                    style={{ width: "10%" }}
                    body={statusBodyTemplate}
                  />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = applySpec({
  players: playersSelector,
  operations: operationsSelector,
});

const mapDispatchToProps = {
  addUser: playersActions.player.add,
  updateUser: playersActions.player.update,
  lockUser: playersActions.player.lock,
  unLockUser: playersActions.player.unLock,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage);
