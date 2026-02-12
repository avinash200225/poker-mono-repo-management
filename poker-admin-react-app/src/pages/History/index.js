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
import React, { useState, useEffect } from "react";
import {
  Config,
  Container,
  GameCards,
  GameResultArea,
  Heading,
  HoleCards,
  LostBet,
  Result,
  ResultEmpty,
  SeatDetailsArea,
  SeatHeaderArea,
  SelectedCards,
  TotalBet,
  WinnerBallsArea,
  WinnerBallsAreaBg,
  WonBet,
} from "./style";
import {
  Box,
  Button,
  HStack,
  Stack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import { historySelector } from "../../store/selectors";
import PopoverSeatBets from "./popovers/SeatBets";

function HistoryPage() {
  const [index, setIndex] = useState(-1);
  const history = useSelector(historySelector);

  //Side Effect: Whenever history changes update index as well
  useEffect(() => {
    if (history.length > 0) {
      setIndex(0);
    } else {
      setIndex(-1);
    }
  }, [history]);

  var winnerBalls = null;
  var gameCards = null;
  var configData = null;
  var seats = null;

  if (index == -1) {
    winnerBalls = [];
    gameCards = [];
    configData = { blind: "", variant: "", betType: "" };
    seats = [];
  } else {
    const {
      gameName,
      gameResult: gameResultStr,
      playerBetsList: playerBetsListStr,
      playersTotalBet,
      roundId,
      tableId,
      timestamp,
      transType,
      winningHand,
    } = history[index];
    const gameResult = JSON.parse(gameResultStr);
    const playerBetsList = JSON.parse(playerBetsListStr);

    winnerBalls = history.map(
      (game) => JSON.parse(game.gameResult).winners[0].id + 1
    );
    gameCards = gameResult.gameCards;
    configData = {
      blind: `${gameResult.configData.blind / 2}/${
        gameResult.configData.blind
      }`,
      variant: gameResult.configData.pokerVariant,
      betLimit: gameResult.configData.betLimit,
    };
    seats = gameResult.seats.map((seat) => {
      return {
        betList: seat.betList,
        cards: seat.cards,
        gameStatus: seat.gameStatus,
        isDealer: seat.isDealer,
        isPlaying: seat.isPlaying,
        uid: seat.uid,
        winAmount: seat.winAmount,
        hand: seat.hand,
        score: seat.score,
      };
    });
  }

  return (
    <Container>
      <WinnerBallsAreaBg>
        {Array.from(new Array(60).keys()).map((x, index) => (
          <Box bg={"purple.50"} key={index}>
            <Box className={ResultEmpty}>.</Box>
          </Box>
        ))}
      </WinnerBallsAreaBg>
      <WinnerBallsArea>
        {winnerBalls.map((winner, index) => (
          <Box bg={"purple.50"} key={index}>
            <Box className={Result} onClick={() => setIndex(index)}>
              {winner}
            </Box>
          </Box>
        ))}
      </WinnerBallsArea>
      <GameResultArea>
        <Stack
          direction={"row"}
          spacing={"0"}
          divider={<StackDivider borderColor={"gray.900"} />}
        >
          <Box w={"40%"} h={"119px"} bg={"purple.50"} margin={"5px"}>
            <HStack align={"stretch"}>
              <Stack w={"50%"} align={"stretch"}>
                <Box className={Config} w={"100%"} h={"30px"}>
                  BLIND:
                </Box>
                <Box className={Config} w={"100%"} h={"30px"}>
                  VARIANT:
                </Box>
                <Box className={Config} w={"100%"} h={"30px"}>
                  BET LIMIT:
                </Box>
              </Stack>
              <Stack w={"50%"} align={"stretch"}>
                <Box className={Config} w={"100%"} h={"30px"}>
                  {configData.blind}
                </Box>
                <Box className={Config} w={"100%"} h={"30px"}>
                  {configData.variant}
                </Box>
                <Box className={Config} w={"100%"} h={"30px"}>
                  {configData.betLimit}
                </Box>
              </Stack>
            </HStack>
          </Box>
          <Box className={GameCards} w={"60%"} h={"119px"} bg={"purple.50"}>
            {gameCards.map((name) => (
              <Card
                key={name}
                position="static"
                name={name}
                height="100px"
              ></Card>
            ))}
          </Box>
        </Stack>
      </GameResultArea>
      <SeatHeaderArea>
        <Stack
          direction={"row"}
          spacing={"0"}
          divider={<StackDivider borderColor="gray.900" />}
        >
          <Box className={Heading} w="9%" h={"40px"} bg={"purple.200"}>
            SEAT
          </Box>
          <Box className={Heading} w="25%" h={"40px"} bg={"purple.200"}>
            HOLE CARDS
          </Box>
          <Box className={Heading} w="15%" h={"40px"} bg={"purple.200"}>
            TOTAL BET
          </Box>
          <Box className={Heading} w="30%" h={"40px"} bg={"purple.200"}>
            BEST HAND
          </Box>
          <Box className={Heading} w="21%" h={"40px"} bg={"purple.200"}>
            RESULT
          </Box>
        </Stack>
      </SeatHeaderArea>
      <SeatDetailsArea>
        <VStack align={"stretch"}>
          {seats.map((seat, index) => (
            <Box key={index} h="102px" bg="purple.200">
              <Stack
                direction={"row"}
                spacing={"0"}
                divider={<StackDivider borderColor="gray.900" />}
              >
                <Box w="9%" h={"102px"} bg={"purple.100"}>
                  <Box className={Result}>{seat.uid}</Box>
                </Box>
                <Box
                  className={HoleCards}
                  w="25%"
                  h={"102px"}
                  bg={"purple.100"}
                >
                  {seat.cards.map((name, index) => (
                    <Card
                      key={index}
                      position="static"
                      name={name}
                      height="90px"
                      width="60px"
                    ></Card>
                  ))}
                </Box>
                <Box className={TotalBet} w="15%" h={"102px"} bg={"purple.100"}>
                  <PopoverSeatBets
                    uid={seat.uid}
                    betList={seat.betList}
                  ></PopoverSeatBets>
                </Box>
                <Box
                  className={SelectedCards}
                  w="30%"
                  h={"102px"}
                  bg={"purple.100"}
                >
                  {seat.hand.map((name) => (
                    <Card
                      key={name}
                      position="static"
                      name={name}
                      height="90px"
                      width="60px"
                    ></Card>
                  ))}
                </Box>
                <Box w="21%" h={"102px"} bg={"purple.100"}>
                  <VStack align={"stretch"}>
                    <Box
                      className={
                        seat.gameStatus.includes("Win") ? WonBet : LostBet
                      }
                    >
                      {seat.gameStatus}
                    </Box>
                    <Box
                      className={
                        seat.gameStatus.includes("Win") ? WonBet : LostBet
                      }
                    >
                      {seat.winAmount}
                    </Box>
                    {/* <Box className={seat.gameStatus.includes('Win') ? WonBet : LostBet}>{seat.score}</Box> */}
                  </VStack>
                </Box>
              </Stack>
            </Box>
          ))}
        </VStack>
      </SeatDetailsArea>
    </Container>
  );
}

export default HistoryPage;
