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
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { Button, Wrap, WrapItem } from "@chakra-ui/react";

import { Button as PrimeButton } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";

import { Center } from "@chakra-ui/react";
import { formatRupee } from "../../utils/functions/formatRupee";
import { SidePotsArea } from "../../pages/TablePage/style";
import Card from "../Card";

import {
  BtnTxt,
  BtnTxtAmount,
  CancelGameBtn,
  CancelGameText,
  CashInBtn,
  CashOutBtn,
  ContinueBtn,
  DrawCardBtn,
  ElectionBtn,
  ElectionText,
  FlopCard1,
  FlopCard2,
  FlopCard3,
  GameIdText,
  GameMessage,
  GameTypeText,
  MainPotImage,
  MainPotMeter,
  MainPotMeterImage,
  NewGameBtn,
  NewGameText,
  RakeText,
  ReElectionBtn,
  RiverCard,
  SkipElectionBtn,
  SkipElectionText,
  TableHeader,
  TableLimitsText,
  TurnCard,
  WagerMeter,
  PotLimitMeter,
  GreenBtn,
  RedBtn,
  ButtonText,
  BlueBtn,
} from "./style";

function Table({
  configData,
  roundId = 0,
  sidePots = [],
  action = "",
  stage,
  potLimit,
  potAmount,
  tableWager,
  gameCards,
  electDealer,
  cancelGame,
  newGame,
  selected,
}) {
  const [amount, setAmount] = useState(0);

  const [cancelGameFlag, setCancelGameFlag] = useState(false);
  const [cashOutFlag, setCashOutFlag] = useState(false);
  const [cashInFlag, setCashInFlag] = useState(false);
  const [addMoneyFlag, setAddMoneyFlag] = useState(false);

  const dialogFuncMap = {
    cancelGame: setCancelGameFlag,
    cashOut: setCashOutFlag,
    cashIn: setCashInFlag,
    addMoney: setAddMoneyFlag,
  };

  const onOpen = (name) => {
    dialogFuncMap[`${name}`](true);
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const onCancelGameConfirmSubmit = () => {
    cancelGame({ MessageType: "CANCEL_GAME_REQ" });
    setCancelGameFlag(false);
  };

  const onCashOutConfirmSubmit = () => {
    newGame({
      MessageType: "CASH_OUT_REQ",
      uid: selected.uid,
      amount: selected.balance,
    });
    setCashOutFlag(false);
  };

  const onCashInConfirmSubmit = () => {
    newGame({ MessageType: "CASH_IN_REQ", uid: selected.uid, amount: amount });
    setCashInFlag(false);
  };

  const cancelGameCancelRef = React.useRef();
  const cashOutCancelRef = React.useRef();
  const cashInCancelRef = React.useRef();

  const history = useHistory();
  const handleCashInClick = () => history.push("/cashier");

  var message = "";
  const electionAllowed = stage == "1";
  const skipElectionAllowed = stage == "1";
  const reElectionAllowed = stage == "3";
  const continueAllowed = stage == "15" || stage == "16" || stage == "17";
  const cancelGameAllowed = stage != "1" && stage != "18";
  const drawCardsAllowed =
    stage == "4" || stage == "7" || stage == "10" || stage == "13";
  const newGameAllowed = stage == "18";
  const cashTransactionsAllowed = stage == "1" || stage == "3";

  if (stage == "1") message = "Table Ready";
  if (stage == "2") message = "Dealer Election in Progress";
  if (stage == "3") message = "Waiting For Confirmation";
  if (stage == "4") message = "Hole Cards Drawing in Progress";
  if (stage == "5") message = "Pre Flop Betting in Progress";
  if (stage == "6") message = "Waiting For Confirmation";
  if (stage == "7") message = "Flop Cards Drawing in Progress";
  if (stage == "8") message = "Flop Round Betting in Progress";
  if (stage == "9") message = "Waiting For Confirmation";
  if (stage == "10") message = "Turn Card Drawing in Progress";
  if (stage == "11") message = "Turn Round Betting in Progress";
  if (stage == "12") message = "Waiting For Confirmation";
  if (stage == "13") message = "River Card Drawing in Progress";
  if (stage == "14") message = "Final Round Betting in Progress";
  if (stage == "15") message = "Waiting For Confirmation";
  if (stage == "16") message = "Final Showdown";
  if (stage == "17") message = "Waiting For Settlement Confirmation";

  const renderCreditFooter = () => {
    return (
      <div>
        <PrimeButton
          label="Add Money"
          icon="pi pi-check"
          className="p-button-success"
          onClick={() => {
            setAddMoneyFlag(false);
            setCashInFlag(true);
          }}
        />
        <PrimeButton
          label="Cancel"
          icon="pi pi-times"
          onClick={() => setCashInFlag(false)}
          className="p-button-secondary"
        />
      </div>
    );
  };

  const { pokerVariant, betLimit, rakePercent, blind } = configData;

  return (
    <React.Fragment>
      {/* <GameMessage>{`${action}`}</GameMessage> */}
      {/* <MainPotImage /> */}
      {/* <MainPotMeterImage /> */}
      {/* <MainPotMeter>₹{potAmount}</MainPotMeter> */}
      <WagerMeter>₹{tableWager}</WagerMeter>
      {betLimit == "Pot Limit" && potLimit > 0 ? (
        <PotLimitMeter>POT LIMIT: ₹{potLimit}</PotLimitMeter>
      ) : null}

      {/* <TableLimitsText>Blind: ₹{blind}-₹{blind/2}</TableLimitsText> */}
      {/* <GameTypeText>Variant: {pokerVariant}</GameTypeText> */}
      {/* <RakeText>Bet Limit: {betLimit}</RakeText> */}
      {/* <GameIdText>Game Id: {roundId}</GameIdText> */}

      {gameCards[0] ? (
        <Card name={gameCards[0]} left={"582px"} top={"530px"} />
      ) : (
        <FlopCard1 />
      )}
      {gameCards[1] ? (
        <Card name={gameCards[1]} left={"702px"} top={"530px"} />
      ) : (
        <FlopCard2 />
      )}
      {gameCards[2] ? (
        <Card name={gameCards[2]} left={"822px"} top={"530px"} />
      ) : (
        <FlopCard3 />
      )}
      {gameCards[3] ? (
        <Card name={gameCards[3]} left={"972px"} top={"530px"} />
      ) : (
        <TurnCard />
      )}
      {gameCards[4] ? (
        <Card name={gameCards[4]} left={"1122px"} top={"530px"} />
      ) : (
        <RiverCard />
      )}

      {stage == "1" ? (
        <RedBtn
          left={"1170px"}
          top={"1040px"}
          as={NavLink}
          to="/operations/dealerless/games"
        >
          <ButtonText color="darkslategray">{"CHANGE"}</ButtonText>
          <ButtonText color="darkslategray">{"GAME TYPE"}</ButtonText>
        </RedBtn>
      ) : null}

      {stage == "1" ? (
        <BlueBtn
          left={"1430px"}
          top={"1040px"}
          onClick={() => electDealer({ MessageType: "ELECTION_REQ" })}
        >
          <ButtonText color="darkslategray">{"ELECT"}</ButtonText>
          <ButtonText color="darkslategray">{"DEALER"}</ButtonText>
        </BlueBtn>
      ) : null}

      {stage == "1" ? (
        <GreenBtn
          left={"1690px"}
          top={"1040px"}
          onClick={() => electDealer({ MessageType: "ELECTION_SKIP_REQ" })}
        >
          <ButtonText color="darkslategray">{"START"}</ButtonText>
          <ButtonText color="darkslategray">{"GAME"}</ButtonText>
        </GreenBtn>
      ) : null}

      {cancelGameAllowed ? (
        <RedBtn
          left={"60px"}
          top={"1040px"}
          onClick={() => setCancelGameFlag(true)}
        >
          <ButtonText color="darkslategray">{"RECALL"}</ButtonText>
          <ButtonText color="darkslategray">{"GAME"}</ButtonText>
        </RedBtn>
      ) : null}

      {newGameAllowed ? (
        <GreenBtn
          left={"1690px"}
          top={"1040px"}
          onClick={() => newGame({ MessageType: "NEW_GAME_REQ" })}
        >
          <ButtonText color="darkslategray">{"NEXT"}</ButtonText>
          <ButtonText color="darkslategray">{"GAME"}</ButtonText>
        </GreenBtn>
      ) : null}

      {newGameAllowed ? (
        <RedBtn
          left={"1170px"}
          top={"1040px"}
          as={NavLink}
          to="/operations/dealerless/games"
        >
          <ButtonText color="darkslategray">{"CHANGE"}</ButtonText>
          <ButtonText color="darkslategray">{"GAME TYPE"}</ButtonText>
        </RedBtn>
      ) : null}

      {cashTransactionsAllowed && selected ? (
        <GreenBtn
          left={"320px"}
          top={"1040px"}
          onClick={() => setAddMoneyFlag(true)}
        >
          <ButtonText color="darkslategray">{"CASH IN"}</ButtonText>
          <ButtonText color="darkslategray">{""}</ButtonText>
        </GreenBtn>
      ) : null}

      {cashTransactionsAllowed && selected ? (
        <RedBtn
          left={"60px"}
          top={"1040px"}
          onClick={() => setCashOutFlag(true)}
        >
          <ButtonText color="darkslategray">{"CASH OUT"}</ButtonText>
          <ButtonText color="darkslategray">₹{selected.balance}</ButtonText>
        </RedBtn>
      ) : null}

      {/* {reElectionAllowed ? <ReElectionBtn onClick={() => electDealer({MessageType: "ELECTION_REQ"})}><NewGameText>{"ReElection"}</NewGameText></ReElectionBtn> : null} */}

      {/* {continueAllowed ? 
        <NewGameBtn onClick={() => cancelGame({MessageType: "PROCEED_REQ"})}>
          <NewGameText>{"Press  To Proceed"}
          </NewGameText>
        </NewGameBtn> : null
      }
      
      {(stage == "3") ? 
        <DrawCardBtn onClick={() => electDealer({MessageType: "DRAW_CARDS"})}>
          <NewGameText>
            {"Draw         Player Cards"}
          </NewGameText>
        </DrawCardBtn> : null}

      {(stage == "7") && (!gameCards[0]) ? 
        <DrawCardBtn onClick={() => electDealer({MessageType: "DRAW_CARDS"})}>
          <NewGameText>
            {"Draw         Flop Cards" }
          </NewGameText>
        </DrawCardBtn> : null}

      {(stage == "10") && (!gameCards[3]) ? 
        <DrawCardBtn onClick={() => electDealer({MessageType: "DRAW_CARDS"})}>
          <NewGameText>
            {"Draw         Turn Card"}
          </NewGameText>
        </DrawCardBtn> : null}

      {(stage == "13") && (!gameCards[4]) ? 
        <DrawCardBtn onClick={() => electDealer({MessageType: "DRAW_CARDS"})}>
          <NewGameText>
            {"Draw         River Card"}
          </NewGameText>
        </DrawCardBtn> : null} */}

      {/* <RedBtn left={'1170px'} top={'1040px'} as={NavLink} to='/operations/dealerless/games'>
          <ButtonText color='darkslategray'>{"CHANGE"}</ButtonText>
          <ButtonText color='darkslategray'>{"GAME TYPE"}</ButtonText>
        </RedBtn> : null */}

      <AlertDialog
        isOpen={cancelGameFlag}
        leastDestructiveRef={cancelGameCancelRef}
        onClose={() => setCancelGameFlag(false)}
        motionPreset="scale"
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Game Approve
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelGameCancelRef}
                onClick={() => setCancelGameFlag(false)}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={onCancelGameConfirmSubmit}
                ml={3}
              >
                Approve
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={cashOutFlag}
        leastDestructiveRef={cashOutCancelRef}
        onClose={() => setCashOutFlag(false)}
        motionPreset="slideInBottom"
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cash Out Approve
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cashOutCancelRef}
                onClick={() => setCashOutFlag(false)}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onCashOutConfirmSubmit} ml={3}>
                Approve
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={cashInFlag}
        leastDestructiveRef={cashInCancelRef}
        onClose={() => setCashInFlag(false)}
        motionPreset="slideInBottom"
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cash In Approve for Amount ₹{amount}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cashInCancelRef}
                onClick={() => setCashInFlag(false)}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onCashInConfirmSubmit} ml={3}>
                Approve
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Dialog
        header="Add Money"
        modal={false}
        visible={addMoneyFlag}
        style={{ width: "50%" }}
        onHide={() => onHide("addMoney")}
        footer={renderCreditFooter()}
      >
        {selected && (
          <div className="p-grid  user-balance-center">
            <div className="col-12  md:col-12 lg:col-12 user-data">
              <div className="user-subtitle"> Player Name</div>
              <div className="user-title"> {selected.nickname}</div>
              <div className="user-subtitle"> Wallet Amount</div>
              <div className="user-title">
                {"₹"}
                {selected.balance}
              </div>

              <InputNumber
                className="user-amount"
                value={amount}
                onChange={(e) => setAmount(e.value)}
                mode="decimal"
                prefix={"₹"}
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
                <PrimeButton
                  icon="pi pi-trash"
                  label="Clear"
                  className="p-button-danger"
                  onClick={() => setAmount(0)}
                />
              </div>

              <div className="user-buttons">
                <PrimeButton
                  icon="pi pi-plus"
                  label={"₹" + "10"}
                  className="p-button-secondary"
                  onClick={() => setAmount((prevAmount) => prevAmount + 10)}
                />
                <PrimeButton
                  icon="pi pi-plus"
                  label={"₹" + "50"}
                  className="p-button-secondary"
                  onClick={() => setAmount((prevAmount) => prevAmount + 50)}
                />
                <PrimeButton
                  icon="pi pi-plus"
                  label={"₹" + "100"}
                  className="p-button-secondary"
                  onClick={() => setAmount((prevAmount) => prevAmount + 100)}
                />
              </div>

              <div className="user-buttons">
                <PrimeButton
                  icon="pi pi-plus"
                  label={"₹" + "500"}
                  className="p-button-secondary"
                  onClick={() => setAmount((prevAmount) => prevAmount + 500)}
                />
                <PrimeButton
                  icon="pi pi-plus"
                  label={"₹" + "1000"}
                  className="p-button-secondary"
                  onClick={() => setAmount((prevAmount) => prevAmount + 1000)}
                />
                <PrimeButton
                  icon="pi pi-plus"
                  label={"₹" + "5000"}
                  className="p-button-secondary"
                  onClick={() => setAmount((prevAmount) => prevAmount + 5000)}
                />
              </div>
              <div className="user-buttons">
                <PrimeButton
                  icon="pi pi-plus"
                  label={"₹" + "10000"}
                  className="p-button-secondary"
                  onClick={() => setAmount((prevAmount) => prevAmount + 10000)}
                />
                <PrimeButton
                  icon="pi pi-plus"
                  label={"₹" + "50000"}
                  className="p-button-secondary"
                  onClick={() => setAmount((prevAmount) => prevAmount + 50000)}
                />
                <PrimeButton
                  icon="pi pi-plus"
                  label={"₹" + "100000"}
                  className="p-button-secondary"
                  onClick={() => setAmount((prevAmount) => prevAmount + 100000)}
                />
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </React.Fragment>
  );
}

export default Table;
