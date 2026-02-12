import React from "react";
import { formatRupee } from "../../utils/functions/formatRupee";
import Card from "../Card";
import DraggableCard from "../DraggableCard";

import { 
    Balance,
    BalanceAmount,
    BalanceMirror,
    BigBet,
    BigBetMirror,
    Card1,
    Card2,
    CurrentBet,
    CurrentBetContainer,
    CurrentBetContainerMirror,
    Dealer,
    DealerMirror,
    GameId,
    GameIdStr,
    Hint,
    HintStr,
    SmallBet,
    SmallBetMirror,
    Status,
    StatusMirror,
    StatusStr,
    TotalBet,
    TotalBetStr,
    Turn,
    TurnMirror,
    CurrentBetAmount,
    LastBet,
    LastWin,
  } from "./style";

  

function Seat({
  isTurn = false,
  gameStatus = "ready",
  isDealer = false,
  cards = ["xx", "xx"],
  bets = [0, 0, 0, 0],
  actions = [false, false, false, false, false],
  balance = 0,
  isRight = false,
  isSmallBet = false,
  isBigBet = false,
  hint = "",
  gameId = -1,
  totalBet = -1,
  playerBetsSum = 0,
  playerLastBet = 0,
  playerLastWin = 0,
}) {
  return (
    <React.Fragment>
      {isDealer ? <Dealer /> : null}
      {isSmallBet ? <SmallBet /> : null}
      {isBigBet ? <BigBet /> : null}

      {<Balance><BalanceAmount>{formatRupee(balance)}</BalanceAmount></Balance>}
      {<Status> <StatusStr  gameStatus={gameStatus.toUpperCase()}>{gameStatus.toUpperCase()}</StatusStr> </Status>}

      {cards ? cards.length > 0 ? <DraggableCard name={cards[0]} top={702} left={828}/> :null : null}
      {cards ? cards.length > 1 ? <DraggableCard name={cards[1]} top={702} left={964}/> :null : null}
      {/* {hint && <Hint> <HintStr  hint={hint.toUpperCase()}>{hint}</HintStr> </Hint>} */}
      {<CurrentBet><CurrentBetAmount>{bets[0] ? formatRupee(bets[0]) : formatRupee(0)}</CurrentBetAmount></CurrentBet>}
      
      {playerBetsSum > 0 && <TotalBet><TotalBetStr>{`Total Bet: ${formatRupee(playerBetsSum)}`}</TotalBetStr></TotalBet>}

      {playerLastBet > 0 && <LastBet><TotalBetStr>{`Last Bet: ${formatRupee(playerLastBet)}`}</TotalBetStr></LastBet>}
      {playerLastWin > 0 && <LastWin><TotalBetStr>{`Last Win: ${formatRupee(playerLastWin)}`}</TotalBetStr></LastWin>}
      
    </React.Fragment>
  );
}

export default Seat;
