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
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { applySpec } from "ramda";
import { ScrollPanel } from "primereact/scrollpanel";

import NumberFormat from "react-number-format";

import {
  reducedBetValueSumSeatsSelector,
  playersSelector,
  seatsSelector,
  tableSelector,
} from "../../store/selectors";

import playersActions from "../../store/actions/players";
import adminActions from "../../store/actions/admin";
import {
  Container,
  TableBg,
  Player1Area,
  Player2Area,
  Player3Area,
  Player4Area,
  Player5Area,
  Player6Area,
  Player7Area,
  Player8Area,
  AllInBtn,
  FoldBtn,
  CheckBtn,
  BetBtn,
  RaiseBtn,
  RaiseSliderArea,
  CallBtn,
  BtnTxt,
  BtnTxtAmount,
  GameName,
} from "./style";

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

import Table from "../../components/Table";
import Seat from "../../components/Seat";
import { formatRupee } from "../../utils/functions/formatRupee";

const labelStyles = { mt: "4", ml: "-4.5", fontSize: "2xl" };

function TablePage({
  table,
  tableWager,
  seats,
  electDealer,
  cancelGame,
  newGame,
}) {
  const [active, setActive] = useState("-1");

  function handleOnTap({ uid }) {
    active == uid ? setActive("-1") : setActive(uid);
  }

  const seat1 = seats[0];
  const seat2 = seats[1];
  const seat3 = seats[2];
  const seat4 = seats[3];
  const seat5 = seats[4];
  const seat6 = seats[5];
  const seat7 = seats[6];
  const seat8 = seats[7];

  const currentTurnSeat =
    active != "-1"
      ? seats.find((p) => p.uid == active)
      : seats.find((p) => p.isTurn);

  const balanceAmount = currentTurnSeat
    ? currentTurnSeat.balance
      ? currentTurnSeat.balance
      : 0
    : 0;
  const { pokerVariant = "Texas", betLimit = "No Limit" } =
    table.configData || {};

  if (seats.length == 0) return null;
  else
    return (
      <Container>
        <TableBg pokerVariant={pokerVariant} betLimit={betLimit} />
        <GameName pokerVariant={pokerVariant} betLimit={betLimit} />

        <Table
          configData={table.configData}
          roundId={table.roundId}
          sidePots={table.sidePots}
          action={table.action}
          stage={table.stage}
          potLimit={table.potLimit}
          potAmount={table.potAmount}
          tableWager={tableWager}
          gameCards={table.gameCards}
          electDealer={electDealer}
          cancelGame={cancelGame}
          newGame={newGame}
          selected={active != "-1" ? seats.find((p) => p.uid == active) : null}
        />

        {seat1 && seat1 ? (
          <Player1Area
            gameStatus={seat1.gameStatus.toUpperCase()}
            onClick={() => handleOnTap({ uid: "1" })}
          >
            <Seat seatObj={seats[0]} />
          </Player1Area>
        ) : null}
        {seat2 && seat2 ? (
          <Player2Area
            gameStatus={seat2.gameStatus.toUpperCase()}
            onClick={() => handleOnTap({ uid: "2" })}
          >
            <Seat seatObj={seats[1]} />
          </Player2Area>
        ) : null}
        {seat3 && seat3 ? (
          <Player3Area
            gameStatus={seat3.gameStatus.toUpperCase()}
            onClick={() => handleOnTap({ uid: "3" })}
          >
            <Seat seatObj={seats[2]} />
          </Player3Area>
        ) : null}
        {seat4 && seat4 ? (
          <Player4Area
            gameStatus={seat4.gameStatus.toUpperCase()}
            onClick={() => handleOnTap({ uid: "4" })}
          >
            <Seat seatObj={seats[3]} />
          </Player4Area>
        ) : null}
        {seat5 && seat5 ? (
          <Player5Area
            gameStatus={seat5.gameStatus.toUpperCase()}
            onClick={() => handleOnTap({ uid: "5" })}
          >
            <Seat seatObj={seats[4]} />
          </Player5Area>
        ) : null}
        {seat6 && seat6 ? (
          <Player6Area
            gameStatus={seat6.gameStatus.toUpperCase()}
            onClick={() => handleOnTap({ uid: "6" })}
          >
            <Seat seatObj={seats[5]} />
          </Player6Area>
        ) : null}
        {seat7 && seat7 ? (
          <Player7Area
            gameStatus={seat7.gameStatus.toUpperCase()}
            onClick={() => handleOnTap({ uid: "7" })}
          >
            <Seat seatObj={seats[6]} />
          </Player7Area>
        ) : null}
        {seat8 && seat8 ? (
          <Player8Area
            gameStatus={seat8.gameStatus.toUpperCase()}
            onClick={() => handleOnTap({ uid: "8" })}
          >
            <Seat seatObj={seats[7]} />
          </Player8Area>
        ) : null}
      </Container>
    );
}

const mapStateToProps = applySpec({
  table: tableSelector,
  seats: seatsSelector,
  players: playersSelector,
  tableWager: reducedBetValueSumSeatsSelector,
});
const mapDispatchToProps = {
  electDealer: adminActions.game.elect,
  cancelGame: adminActions.game.cancel,
  newGame: adminActions.game.new,
};
export default connect(mapStateToProps, mapDispatchToProps)(TablePage);
