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
import React from "react";
import Card from "../Card";

import {
  Balance,
  BalanceAmount,
  BalanceMirror,
  BigBet,
  BigBetMirror,
  Card1,
  Card2,
  CardBack,
  CurrentBet,
  CurrentBetAmount,
  CurrentBetContainer,
  CurrentBetContainerMirror,
  Dealer,
  DealerMirror,
  HandContainer,
  HandContainerMirror,
  PlayerHeader,
  PlayerNameStr,
  SmallBet,
  SmallBetMirror,
  Status,
  StatusMirror,
  StatusStr,
  Turn,
  TurnMirror,
} from "./style";
import { useSelector } from "react-redux";
import { tableSelector } from "../../store/selectors";

function Seat({ seatObj }) {
  const table = useSelector(tableSelector);
  const { pokerVariant = "Texas", betLimit = "No Limit" } =
    table.configData || {};

  const {
    name = "Sample",
    isTurn = false,
    gameStatus = "ready",
    isDealer = false,
    cards = ["xx", "xx"],
    bets = [0, 0, 0, 0],
    actions = [false, false, false, false, false],
    balance = 0,
    isSmallBet = false,
    isBigBet = false,
  } = seatObj;

  const isRight = seatObj.id >= 4;

  return (
    <React.Fragment>
      {/* {uid2Header.get(uid)} */}
      <PlayerHeader>
        <PlayerNameStr>{name}</PlayerNameStr>
      </PlayerHeader>
      {isDealer ? isRight ? <DealerMirror /> : <Dealer /> : null}
      {isSmallBet ? isRight ? <SmallBetMirror /> : <SmallBet /> : null}
      {isBigBet ? isRight ? <BigBetMirror /> : <BigBet /> : null}
      {isTurn ? isRight ? <TurnMirror /> : <Turn /> : null}
      {isRight ? (
        <BalanceMirror>
          <BalanceAmount>₹{balance}</BalanceAmount>
        </BalanceMirror>
      ) : (
        <Balance>
          <BalanceAmount>₹{balance}</BalanceAmount>
        </Balance>
      )}
      {isRight ? (
        <CurrentBetContainerMirror>
          <CurrentBetAmount>₹{bets[0] || 0}</CurrentBetAmount>
        </CurrentBetContainerMirror>
      ) : (
        <CurrentBetContainer>
          {" "}
          <CurrentBetAmount>₹{bets[0] || 0}</CurrentBetAmount>
        </CurrentBetContainer>
      )}
      {isRight ? (
        <StatusMirror>
          {" "}
          <StatusStr gameStatus={gameStatus.toUpperCase()}>
            {gameStatus.toUpperCase()}
          </StatusStr>{" "}
        </StatusMirror>
      ) : (
        <Status>
          {" "}
          <StatusStr gameStatus={gameStatus.toUpperCase()}>
            {gameStatus.toUpperCase()}
          </StatusStr>{" "}
        </Status>
      )}
      {pokerVariant == "Texas" ? (
        isRight ? (
          <HandContainerMirror>
            {cards ? (
              cards.length > 0 ? (
                cards[0] == "xx" ? (
                  <Card1></Card1>
                ) : (
                  <Card
                    name={cards[0]}
                    width={`${0.5 * 130}px`}
                    height={`${0.5 * 190}px`}
                    top={"0px"}
                    left={"4px"}
                  />
                )
              ) : null
            ) : null}
            {cards ? (
              cards.length > 1 ? (
                cards[1] == "xx" ? (
                  <Card2></Card2>
                ) : (
                  <Card
                    name={cards[1]}
                    width={`${0.5 * 130}px`}
                    height={`${0.5 * 190}px`}
                    top={"0px"}
                    left={"88px"}
                  />
                )
              ) : null
            ) : null}
          </HandContainerMirror>
        ) : (
          <HandContainer>
            {cards ? (
              cards.length > 0 ? (
                cards[0] == "xx" ? (
                  <Card1></Card1>
                ) : (
                  <Card
                    name={cards[0]}
                    width={`${0.5 * 130}px`}
                    height={`${0.5 * 190}px`}
                    top={"0px"}
                    left={"4px"}
                  />
                )
              ) : null
            ) : null}
            {cards ? (
              cards.length > 1 ? (
                cards[1] == "xx" ? (
                  <Card2></Card2>
                ) : (
                  <Card
                    name={cards[1]}
                    width={`${0.5 * 130}px`}
                    height={`${0.5 * 190}px`}
                    top={"0px"}
                    left={"88px"}
                  />
                )
              ) : null
            ) : null}
          </HandContainer>
        )
      ) : //pokerVariant == "Omaha"
      isRight ? (
        <HandContainerMirror>
          {cards ? (
            cards.length > 0 ? (
              cards[0] == "xx" ? (
                <CardBack top={"0px"} left={"-44px"}></CardBack>
              ) : (
                <Card
                  name={cards[0]}
                  width={`${0.5 * 130}px`}
                  height={`${0.5 * 190}px`}
                  top={"0px"}
                  left={"-44px"}
                />
              )
            ) : null
          ) : null}
          {cards ? (
            cards.length > 1 ? (
              cards[1] == "xx" ? (
                <CardBack top={"0px"} left={"15px"}></CardBack>
              ) : (
                <Card
                  name={cards[1]}
                  width={`${0.5 * 130}px`}
                  height={`${0.5 * 190}px`}
                  top={"0px"}
                  left={"15px"}
                />
              )
            ) : null
          ) : null}
          {cards ? (
            cards.length > 2 ? (
              cards[2] == "xx" ? (
                <CardBack top={"0px"} left={"74px"}></CardBack>
              ) : (
                <Card
                  name={cards[2]}
                  width={`${0.5 * 130}px`}
                  height={`${0.5 * 190}px`}
                  top={"0px"}
                  left={"74px"}
                />
              )
            ) : null
          ) : null}
          {cards ? (
            cards.length > 3 ? (
              cards[3] == "xx" ? (
                <CardBack top={"0px"} left={"133px"}></CardBack>
              ) : (
                <Card
                  name={cards[3]}
                  width={`${0.5 * 130}px`}
                  height={`${0.5 * 190}px`}
                  top={"0px"}
                  left={"133px"}
                />
              )
            ) : null
          ) : null}
        </HandContainerMirror>
      ) : (
        <HandContainer>
          {cards ? (
            cards.length > 0 ? (
              cards[0] == "xx" ? (
                <CardBack top={"0px"} left={"-44px"}></CardBack>
              ) : (
                <Card
                  name={cards[0]}
                  width={`${0.5 * 130}px`}
                  height={`${0.5 * 190}px`}
                  top={"0px"}
                  left={"-44px"}
                />
              )
            ) : null
          ) : null}
          {cards ? (
            cards.length > 1 ? (
              cards[1] == "xx" ? (
                <CardBack top={"0px"} left={"15px"}></CardBack>
              ) : (
                <Card
                  name={cards[1]}
                  width={`${0.5 * 130}px`}
                  height={`${0.5 * 190}px`}
                  top={"0px"}
                  left={"15px"}
                />
              )
            ) : null
          ) : null}
          {cards ? (
            cards.length > 2 ? (
              cards[2] == "xx" ? (
                <CardBack top={"0px"} left={"74px"}></CardBack>
              ) : (
                <Card
                  name={cards[2]}
                  width={`${0.5 * 130}px`}
                  height={`${0.5 * 190}px`}
                  top={"0px"}
                  left={"74px"}
                />
              )
            ) : null
          ) : null}
          {cards ? (
            cards.length > 3 ? (
              cards[3] == "xx" ? (
                <CardBack top={"0px"} left={"133px"}></CardBack>
              ) : (
                <Card
                  name={cards[3]}
                  width={`${0.5 * 130}px`}
                  height={`${0.5 * 190}px`}
                  top={"0px"}
                  left={"133px"}
                />
              )
            ) : null
          ) : null}
        </HandContainer>
      )}
    </React.Fragment>
  );
}

export default Seat;
