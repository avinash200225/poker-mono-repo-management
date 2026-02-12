import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { applySpec } from "ramda";
import { ScrollPanel } from 'primereact/scrollpanel';

import NumberFormat from "react-number-format";

import {
  cashierTransactionsSelector,
  playersSelector,
  playerIdSelector,
  seatsSelector,
  tableSelector,
} from "../../../store/selectors";

import playersActions from "../../../store/actions/players";
import adminActions from "../../../store/actions/admin";
import { 
  Container,
  TableBg,
  AllInBtn,
  BetBtn,
  BetSliderArea,
  BtnTxt,
  BtnTxtAmount,
  CallBtn,
  CheckBtn,
  FoldBtn,
  NewGameBtn,
  NewGameText,
  RaiseBtn,
  RaiseSliderArea,
  PlayerHeader,
  ShowBtn,
  ShowBtnText,
} from "./style";

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

import Table from "../../../components/Table";
import Seat from "../../../components/Seat";
import { formatRupee } from "../../../utils/functions/formatRupee";


const labelStyles = {mt: "4",ml: "-4.5", fontSize:'2xl',};

function OverViewTabFn({
  userId,
  table,
  seats,
  electDealer,
  cancelGame,
  newGame,
  foldHand,
  checkHand,
  raiseHand,
  betHand,
  callHand
})  {
  
  const [active, setActive] = useState(false);
  const [currentTurnSeat, setCurrentTurnSeat] = useState(null);
  const [currentBetAmount, setCurrentBetAmount] = useState(0)
  const [handBetAmount, setHandBetAmount] = useState(100)
  const [handRaiseAmount, setHandRaiseAmount] = useState(100)

  useEffect(() => {
    const updatedSeats = seats.map((seat) => {
      if((seat.uid == userId) && (!active) && (seat.cards.length > 0) && (table.stage != "2" )) {
        /* We need to hide cards and hint */
        if(seat.cards.length == 1) return {...seat, cards: ["xx"] , hint: "" }
        else return {...seat, cards: ["xx", "xx"], hint: "" }
      } else return {...seat}
    })

    const currentTurnSeat = updatedSeats.find(seat => seat.uid == userId);

    setCurrentTurnSeat(currentTurnSeat);
    setCurrentBetAmount(currentTurnSeat ? currentTurnSeat.bets[0] ? currentTurnSeat.bets[0]: 0 :  0)
    setHandBetAmount(table.betAmount - ( currentTurnSeat ? currentTurnSeat.bets[0] ? currentTurnSeat.bets[0]: 0 :  0))
    setHandRaiseAmount(table.raiseAmount -  ( currentTurnSeat ? currentTurnSeat.bets[0] ? currentTurnSeat.bets[0]: 0 :  0) )
  }, [table, seats, userId, active]);

  function handleOnTap ()  { setActive(!active)}
  
    const callAmount = currentTurnSeat ? currentTurnSeat.bets[0] ? table.betAmount - currentTurnSeat.bets[0]: table.betAmount :  0  
    const balanceAmount = currentTurnSeat ? currentTurnSeat.balance ? currentTurnSeat.balance: 0 :  0


    console.log(`Current=${currentBetAmount}, Bet=${handBetAmount}, Raise=${handRaiseAmount}, ${balanceAmount}`);

    if (seats.length == 0) return null
    else return (
      <ScrollPanel style={{padding: '0 0 0 0', width: '100%', height: '1200px'}}>
        <Container>
          <TableBg />

          {currentTurnSeat ? <PlayerHeader>{currentTurnSeat.name}</PlayerHeader> : null }

          <Table 
              blind= {table.blind}
              gameType = {table.gameType}
              rake = {table.rake}
              stage = {table.stage}
              potAmount= {table.potAmount}
              gameCards = {table.gameCards}
              electDealer={electDealer} 
              cancelGame={cancelGame} 
              newGame={newGame} 
          />

          {currentTurnSeat ? 
          <Seat 
              isDealer={currentTurnSeat.isDealer} 
              isSmallBet={currentTurnSeat.isSmallBet} 
              isBigBet={currentTurnSeat.isBigBet} 
              isTurn={currentTurnSeat.isTurn}
              gameStatus={currentTurnSeat.gameStatus}
              bets={currentTurnSeat.bets}
              cards={currentTurnSeat.cards}
              actions={currentTurnSeat.actions}
              balance={currentTurnSeat.balance}
              hint={currentTurnSeat.hint}
              gameId={table.roundId}
              totalBet={currentTurnSeat.totalBet}
              />
           : null}           

          {currentTurnSeat && currentTurnSeat.actions && currentTurnSeat.actions[0] && handBetAmount >= balanceAmount ? 
            <AllInBtn onClick={() => callHand({MessageType: "ALL_IN"})}><BtnTxt>{"ALL_IN"}</BtnTxt><BtnTxtAmount>₹{balanceAmount}</BtnTxtAmount></AllInBtn> : null}


          {currentTurnSeat && currentTurnSeat.actions && currentTurnSeat.actions[0] ? 
            <FoldBtn onClick={() => foldHand({MessageType: "FOLD_HAND"})}><BtnTxt>{"FOLD"}</BtnTxt></FoldBtn> : null}
          {currentTurnSeat && currentTurnSeat.actions && currentTurnSeat.actions[1] ? 
            <CheckBtn onClick={() => checkHand({MessageType: "CHECK_HAND"})}><BtnTxt>{"CHECK"}</BtnTxt></CheckBtn> : null}
          {currentTurnSeat && currentTurnSeat.actions && currentTurnSeat.actions[2] ? 
            <RaiseBtn onClick={() => raiseHand({MessageType: "RAISE_HAND", amount: currentBetAmount + handRaiseAmount})}><BtnTxt>{"RAISE"}</BtnTxt><BtnTxtAmount>₹{handRaiseAmount}</BtnTxtAmount></RaiseBtn> : null}
          {currentTurnSeat && currentTurnSeat.actions && currentTurnSeat.actions[2] ? 
            <RaiseSliderArea>
              <Slider
                  value={handRaiseAmount}
                  min={handBetAmount}
                  step={100}
                  max={balanceAmount}
                  aria-label="slider-raise"
                  onChange={(e) => {
                    setHandRaiseAmount(e)
                  }}
                >
                  <SliderMark value={handRaiseAmount} {...labelStyles}>
                    {formatRupee(handRaiseAmount)}
                  </SliderMark>
                  <SliderMark
                    value={handRaiseAmount}
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-14"
                    ml="-10"
                    w="28"
                    fontSize='2xl'
                  >
                    {formatRupee(handRaiseAmount)}
                  </SliderMark>
                  <SliderMark 
                    value={balanceAmount/2} 
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-14"
                    ml="-10"
                    w="28"
                    fontSize='2xl'             
                  >
                    {formatRupee(balanceAmount/2)}
                  </SliderMark>
                  <SliderMark 
                    value={balanceAmount} 
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-14"
                    ml="-10"
                    w="28"
                    fontSize='2xl'             
                  >
                    {formatRupee(balanceAmount)}
                  </SliderMark>
                  
                  <SliderTrack >
                    <SliderFilledTrack   />
                  </SliderTrack>
                  <SliderThumb boxSize={8}  />
                </Slider>
            </RaiseSliderArea> : null}
          {currentTurnSeat && currentTurnSeat.actions && currentTurnSeat.actions[3] ? 
            <BetBtn onClick={() => betHand({MessageType: "BET_HAND", amount: currentBetAmount + handBetAmount })}><BtnTxt>{"BET"}</BtnTxt><BtnTxtAmount>₹{handBetAmount}</BtnTxtAmount></BetBtn> : null}
          {currentTurnSeat && currentTurnSeat.actions && currentTurnSeat.actions[3] ? 
            <BetSliderArea>
              <Slider
                  value={handBetAmount}
                  min={handRaiseAmount}
                  step={100}
                  max={balanceAmount}
                  aria-label="slider-bet"
                  onChange={(e) => {
                    setHandBetAmount(e)
                  }}
                >

                  <SliderMark
                    value={handBetAmount}
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-14"
                    ml="-10"
                    w="28"
                    fontSize='2xl'
                  >
                    {formatRupee(handBetAmount)}
                  </SliderMark>

                  <SliderMark 
                    value={balanceAmount} 
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-14"
                    ml="-10"
                    w="28"
                    fontSize='2xl'
                  >
                    {formatRupee(balanceAmount)}
                  </SliderMark>

                  <SliderMark 
                    value={balanceAmount / 2} 
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-14"
                    ml="-10"
                    w="28"
                    fontSize='2xl'
                  >
                    {formatRupee(balanceAmount / 2)}
                  </SliderMark>
                  
                  <SliderTrack >
                    <SliderFilledTrack   />
                  </SliderTrack>
                  <SliderThumb boxSize={8}  />
                </Slider>
            </BetSliderArea> : null}


          {currentTurnSeat && currentTurnSeat.actions && currentTurnSeat.actions[4] ? 
            <CallBtn onClick={() => callHand({MessageType: "CALL_HAND"})}><BtnTxt>{"CALL"}</BtnTxt><BtnTxtAmount>₹{callAmount}</BtnTxtAmount></CallBtn> : null}

            {currentTurnSeat && currentTurnSeat.cards.length > 0 && active ? <ShowBtn onClick={() => handleOnTap()}><ShowBtnText>{"HIDE"}</ShowBtnText></ShowBtn> : null}
            {currentTurnSeat && currentTurnSeat.cards.length > 0 && !active ? <ShowBtn onClick={() => handleOnTap()}><ShowBtnText>{"SHOW"}</ShowBtnText></ShowBtn> : null}
        
        </Container>
      </ScrollPanel>
    );
  
}

const mapStateToProps = applySpec({
  userId: playerIdSelector,
  table: tableSelector,
  seats: seatsSelector,
  players: playersSelector,
  cashierTransactions: cashierTransactionsSelector,
});
const mapDispatchToProps = {
  addMoney: playersActions.balance.add,
  removeMoney: playersActions.balance.remove,
  electDealer: adminActions.game.elect,
  cancelGame: adminActions.game.cancel,
  newGame: adminActions.game.new,
  foldHand: adminActions.hand.fold,
  checkHand: adminActions.hand.check,
  raiseHand: adminActions.hand.raise,
  betHand: adminActions.hand.bet,
  callHand: adminActions.hand.call,
};
export default connect(mapStateToProps, mapDispatchToProps)(OverViewTabFn);
