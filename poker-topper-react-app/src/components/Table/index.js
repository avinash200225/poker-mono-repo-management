import React, { useState, useEffect } from "react";
import { Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";

import {
  formatRupee,
  formatRupeeWithoutSign,
} from "../../utils/functions/formatRupee";
import { SidePotsArea } from "../../pages/TablePage/style";
import Card from "../Card";
import {
  GameMessage,
  SidePotAmountText,
  SidePotsSeatsText,
  FlopCard1,
  FlopCard2,
  FlopCard3,
  RiverCard,
  TurnCard,
  GameIdText,
  GameTypeText,
  RakeText,
  TableLimitsText,
  MainPotMeterImage,
  MainPotMeter,
  WagerMeter,
  WinCelebrationArea,
  WinCardsArea,
  WinHand,
  WinAmount,
  PotMeter,
  GameCardsContainer,
  WinPlayer,
} from "./style";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { tableSelector } from "../../store/selectors";
import Money from "../../primitives/Money";
import { BorderElement } from "../Seat/style";
import soundActions from "../../store/actions/sound";

function Table({
  roundId = 0,
  sidePots = [],
  action = "",
  stage,
  potAmount,
  tableWager,
  gameCards,
  electDealer,
  cancelGame,
  newGame,
  selected = false,
  configData,
}) {
  const table = useSelector(tableSelector);
  const [celebPlayers, setCelebPlayers] = useState([]);
  const dispatch = useDispatch();

  var gameStatus = "";

  if (stage == "1") gameStatus = "Ready For Game";
  if (stage == "2") gameStatus = "Dealer Election in Progress";
  if (stage == "3") gameStatus = "Ready For Next Game";
  if (stage == "4") gameStatus = "Player Cards Draw";
  if (stage == "5") gameStatus = "Pre Flop Round Betting";
  if (stage == "6") gameStatus = "";
  if (stage == "7") gameStatus = "Flop Cards Draw";
  if (stage == "8") gameStatus = "Flop Round Betting";
  if (stage == "9") gameStatus = "";
  if (stage == "10") gameStatus = "Turn Card Draw";
  if (stage == "11") gameStatus = "Turn Round Betting";
  if (stage == "12") gameStatus = "";
  if (stage == "13") gameStatus = "River Card Draw";
  if (stage == "14") gameStatus = "River Round Betting";
  if (stage == "15") gameStatus = "Evaluation";
  if (stage == "16") gameStatus = "";
  if (stage == "17") gameStatus = "";
  if (stage == "18") gameStatus = "";
  if (stage == "19") gameStatus = "Game Stage 19 -????";

  const { REACT_APP_API_ORIGIN } = window;

  const { winners = [] } = table;

  useEffect(() => {
    var timeout;
    if (celebPlayers.length > 1) {
      timeout = setTimeout(() => {
        const freshPlayers = celebPlayers.toReversed();
        setCelebPlayers([...freshPlayers]);
      }, 3000);
    } else {
      if (timeout) clearTimeout(timeout);
    }
  }, [celebPlayers]);

  useEffect(() => {
    if (winners.length > 0) {
      dispatch(soundActions.play.win());
      setCelebPlayers([...winners]);
    } else {
      setCelebPlayers([]);
    }
  }, [winners]);

  const {
    hand = "",
    id = -1,
    cards: winningCards = [],
    winAmount = 0,
  } = celebPlayers.length > 0 ? celebPlayers[0] : {};
  const { pokerVariant, betLimit, rakePercent, blind } = configData;

  return (
    <React.Fragment>
      <GameMessage>{`${gameStatus}`}</GameMessage>
      <WinCelebrationArea>
        {id != -1 ? (
          <VideoPlayer
            url={`${REACT_APP_API_ORIGIN}/assets/videos/celebrationPlayers/celebrationPlayer.webm`}
          />
        ) : null}
      </WinCelebrationArea>
      {id != -1 && (
        <>
          <WinPlayer>
            <Text
              bgGradient={[
                "linear(to-r, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
              ]}
              bgClip="text"
            >{`Player ${+id + 1}`}</Text>
          </WinPlayer>
          <WinHand>{hand ? hand.toUpperCase() : ""}</WinHand>
          <WinAmount>
            {winAmount > 0 ? `Won ${formatRupee(winAmount)}!` : ""}
          </WinAmount>
        </>
      )}

      <GameCardsContainer>
        {gameCards[0] ? (
          <>
            {winningCards.length > 0 && winningCards.includes(gameCards[0]) ? (
              <Card
                name={gameCards[0]}
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${0 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            ) : (
              <Card
                name={gameCards[0]}
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${0 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            )}
            {winningCards.length > 0 && winningCards.includes(gameCards[0]) && (
              <BorderElement
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${450}px`}
                top={"470px"}
              />
            )}
          </>
        ) : (
          <FlopCard1 />
        )}
        {gameCards[1] ? (
          <>
            {winningCards.length > 0 && winningCards.includes(gameCards[1]) ? (
              <Card
                name={gameCards[1]}
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${1 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            ) : (
              <Card
                name={gameCards[1]}
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${1 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            )}
            {winningCards.length > 0 && winningCards.includes(gameCards[1]) && (
              <BorderElement
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${1 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            )}
          </>
        ) : (
          <FlopCard2 />
        )}
        {gameCards[2] ? (
          <>
            {winningCards.length > 0 && winningCards.includes(gameCards[2]) ? (
              <Card
                name={gameCards[2]}
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${2 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            ) : (
              <Card
                name={gameCards[2]}
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${2 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            )}
            {winningCards.length > 0 && winningCards.includes(gameCards[2]) && (
              <BorderElement
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${2 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            )}
          </>
        ) : (
          <FlopCard3 />
        )}
        {gameCards[3] ? (
          <>
            {winningCards.length > 0 && winningCards.includes(gameCards[3]) ? (
              <Card
                name={gameCards[3]}
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${40 + 3 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            ) : (
              <Card
                name={gameCards[3]}
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${40 + 3 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            )}
            {winningCards.length > 0 && winningCards.includes(gameCards[3]) && (
              <BorderElement
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${40 + 3 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            )}
          </>
        ) : (
          <TurnCard />
        )}
        {gameCards[4] ? (
          <>
            {winningCards.length > 0 && winningCards.includes(gameCards[4]) ? (
              <Card
                name={gameCards[4]}
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${40 + 4 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            ) : (
              <Card
                name={gameCards[4]}
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${40 + 4 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            )}
            {winningCards.length > 0 && winningCards.includes(gameCards[4]) && (
              <BorderElement
                width={`${0.8 * 130}px`}
                height={`${0.8 * 190}px`}
                left={`${40 + 4 * 0.8 * 130 + 450}px`}
                top={"470px"}
              />
            )}
          </>
        ) : (
          <RiverCard />
        )}
      </GameCardsContainer>
    </React.Fragment>
  );
}

export default Table;
