import React, { useEffect, useState, useRef, Fragment } from "react";
import { connect } from "react-redux";
import { applySpec } from "ramda";
import { ScrollPanel } from 'primereact/scrollpanel';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'

import { 
  Button, 
} from '@chakra-ui/react'

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

import {
  cashierTransactionsSelector,
  foldBetValueSumSeatsSelector,
  playersSelector,
  playerIdSelector,
  seatsSelector,
  tableSelector,
  playerBetsSumSelector,
  playerLastWinSelector,
  playerLastBetSelector,
} from "../../store/selectors";

import playersActions from "../../store/actions/players";
import adminActions from "../../store/actions/admin";
import { 
  Container,
  TableBg,
  PlayerHeader,

  AllInBtn,
  FoldBtn,
  CheckBtn,
  BetBtn,
  BetSliderArea,
  RaiseBtn,
  RaiseSliderArea,
  BtnTxt,
  CallBtn,
  BtnTxtAmount,
  PlusButton,
  MinusButton,
} from "./style";



import Table from "../../components/Table";
import Seat from "../../components/Seat";
import { formatRupee } from "../../utils/functions/formatRupee";


function PlayerPage({
  userId,
  table,
  tableWager,
  seats,
  playerBetsSum,
  playerLastBet,
  playerLastWin,
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

    const [isLimited, setIsLimited] = useState(false);
    const [minHandBetAmount, setMinHandBetAmount] = useState(0);
    const [minHandRaiseAmount, setMinHandRaiseAmount] = useState(0);
    const [handBetAmount, setHandBetAmount] = useState(0);
    const [handRaiseAmount, setHandRaiseAmount] = useState(0);

    const [foldActionFlag, setFoldActionFalg] = useState(false)
    const [allInActionFlag, setAllInActionFlag] = useState(false)

    const foldCancelRef = useRef() //To note most non destructive button
    const allInCancelRef = useRef() //To note most non destructive button

    const dialogSetFuncMap = {
      'fold': setFoldActionFalg,
      'allIn':setAllInActionFlag
    }

    const onOpen = (name) => {
      dialogSetFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
      dialogSetFuncMap[`${name}`](false);
    }

    const onSubmitFold = () => {
      foldHand({ MessageType: "FOLD_HAND", uid: userId })
      onHide('fold')
    }

    const onSubmitAllIn = () => {
      callHand({ MessageType: "ALL_IN", uid: userId })
      onHide('allIn')
    }

    const balanceAmount = currentTurnSeat ? currentTurnSeat.balance ? currentTurnSeat.balance: 0 :  0

    useEffect(() => {
        setIsLimited(table.gameType == "Limit" )
        setHandBetAmount(table.betAmount); //Amount to Bet
        setMinHandBetAmount(table.betAmount); //Minimum Amount to Bet

        setHandRaiseAmount(table.raiseAmount); //Amount to Raise
        setMinHandRaiseAmount(table.raiseAmount); //Minimum Amount for a Raise
    }, [table, seats]);

    useEffect(() => {
        // const updatedSeats = seats.map((seat) => {
        // if((seat.uid == userId) && (!active) && (seat.cards.length > 0) && (table.stage != "2" )) {
        //     /* We need to hide cards and hint */
        //     if(seat.cards.length == 1) return {...seat, cards: ["xx"] , hint: "" }
        //     else return {...seat, cards: ["xx", "xx"], hint: "" }
        // } else return {...seat}
        // })

        setCurrentTurnSeat(seats.find(seat => seat.uid == userId));
        setCurrentBetAmount(currentTurnSeat ? currentTurnSeat.bets[0] ? currentTurnSeat.bets[0]: 0 :  0)
    }, [table, seats, userId, active]);

    function handleOnTap ()  { setActive(!active)}
  

    const onRaiseMinusButtonClick = () => {
      const updatedAmount = handRaiseAmount - table.raiseAmount
      if(updatedAmount >= minHandRaiseAmount) setHandRaiseAmount(updatedAmount) 
      else setHandRaiseAmount(table.raiseAmount)
    }

    const onRaisePlusButtonClick = () => {
      const updatedAmount = handRaiseAmount + table.raiseAmount
      if(updatedAmount < balanceAmount) setHandRaiseAmount(updatedAmount)
    }

    const onBetMinusButtonClick = () => {
      const updatedAmount = handBetAmount - table.betAmount
      if(updatedAmount >= minHandBetAmount) setHandBetAmount(updatedAmount)
      else setHandBetAmount(table.betAmount)
    }

    const onBetPlusButtonClick = () => {
      const updatedAmount = handBetAmount + table.betAmount
      if(updatedAmount < balanceAmount) setHandBetAmount(updatedAmount)
    }

    if (seats.length == 0) return null
    else return (
      <ScrollPanel style={{padding: '0 0 0 0', width: '100%', height: '1200px'}}>
        <Container>
          <TableBg />

          {currentTurnSeat ? <PlayerHeader>{currentTurnSeat.name}</PlayerHeader> : null }

          <Table 
            roundId={table.roundId}
            sidePots={table.sidePots}
            action={table.action}
            stage={table.stage}
            gameType={table.gameType}
            rake={table.rake}
            blind={table.blind}
            potAmount={table.potAmount}
            tableWager={tableWager}
            gameCards={table.gameCards}
            electDealer={electDealer}
            cancelGame={cancelGame}
            newGame={newGame}
            selected={false}
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
              playerBetsSum={playerBetsSum}
              playerLastBet={playerLastBet}
              playerLastWin={playerLastWin}
              />
           : null}           


{/* actions[0] - Fold */}
{/* actions[1] - Check */}
{/* actions[2] - Raise & Its Slider */}
{/* actions[3] - Bet & Its Slider */}
{/* actions[4] - Call */}
{/* actions[5] - All In */}


{currentTurnSeat &&
          currentTurnSeat.actions &&
          currentTurnSeat.actions[0] ? (
            <FoldBtn onClick={() => onOpen('fold')}>
              <BtnTxt>{"FOLD"}</BtnTxt>
            </FoldBtn>
          ) : null}

{currentTurnSeat &&
          currentTurnSeat.actions &&
          currentTurnSeat.actions[5]  ? (
            <AllInBtn onClick={() => onOpen('allIn')}>
              <BtnTxt>{"ALL_IN"}</BtnTxt>
              <BtnTxtAmount>{formatRupee(balanceAmount)}</BtnTxtAmount>
            </AllInBtn>
          ) : null}



{currentTurnSeat &&
          currentTurnSeat.actions &&
          currentTurnSeat.actions[1] ? (
            <CheckBtn onClick={() => checkHand({ MessageType: "CHECK_HAND", uid: userId })}>
              <BtnTxt>{"CHECK"}</BtnTxt>
            </CheckBtn>
          ) : null}

          {currentTurnSeat &&
          currentTurnSeat.actions &&
          currentTurnSeat.actions[2] ? (
            <RaiseBtn
              onClick={() =>
                raiseHand({
                  MessageType: "RAISE_HAND",
                  uid: userId,
                  amount: handRaiseAmount,
                })
              }
            >
              <BtnTxt>{"RAISE"}</BtnTxt>
              <BtnTxtAmount>{formatRupee(handRaiseAmount)}</BtnTxtAmount>
            </RaiseBtn>
          ) : null}
          {!isLimited &&
          currentTurnSeat &&
          currentTurnSeat.actions &&
          currentTurnSeat.actions[2] ? (
            <Fragment>
              <MinusButton onClick={onRaiseMinusButtonClick} />
              <PlusButton onClick={onRaisePlusButtonClick} />
              <RaiseSliderArea>
                <Slider
                  value={handRaiseAmount}
                  min={minHandRaiseAmount}
                  step={100}
                  max={balanceAmount}
                  aria-label="slider-raise"
                  onChange={(e) => {
                    setHandRaiseAmount(e);
                  }}
                >
                  <SliderMark
                    value={handRaiseAmount}
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-14"
                    ml="-10"
                    w="28"
                    fontSize="2xl"
                  >
                    {formatRupee(handRaiseAmount)}
                  </SliderMark>
                  <SliderMark 
                    value={balanceAmount} 
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-14"
                    ml="-10"
                    w="28"
                    fontSize="2xl"
                  >
                    {formatRupee(balanceAmount)}
                  </SliderMark>

                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={8} />
                </Slider>
              </RaiseSliderArea>
            </Fragment>
          ) : null}


          {currentTurnSeat &&
          currentTurnSeat.actions &&
          currentTurnSeat.actions[3] ? (
            <BetBtn
              onClick={() =>
                betHand({
                  MessageType: "BET_HAND",
                  uid: userId,
                  amount: handBetAmount,
                })
              }
            >
              <BtnTxt>{"BET"}</BtnTxt>
              <BtnTxtAmount>{formatRupee(handBetAmount)}</BtnTxtAmount>
            </BetBtn>
          ) : null}
          {!isLimited &&
          currentTurnSeat &&
          currentTurnSeat.actions &&
          currentTurnSeat.actions[3] ? (
            <Fragment>
              <MinusButton onClick={onBetMinusButtonClick} />
              <PlusButton onClick={onBetPlusButtonClick} />
              <BetSliderArea>
                <Slider
                  value={handBetAmount}
                  min={minHandBetAmount}
                  step={100}
                  max={balanceAmount}
                  aria-label="slider-bet"
                  onChange={(e) => {
                    setHandBetAmount(e);
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
                    fontSize="2xl"
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
                    fontSize="2xl"
                  >
                    {formatRupee(balanceAmount)}
                  </SliderMark>

                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={8} />
                </Slider>
              </BetSliderArea>
            </Fragment>
          ) : null}


          {currentTurnSeat &&
          currentTurnSeat.actions &&
          currentTurnSeat.actions[4] ? (
            <CallBtn onClick={() => callHand({ MessageType: "CALL_HAND", uid: userId })}>
              <BtnTxt>{"CALL"}</BtnTxt>
              <BtnTxtAmount>{formatRupee(handBetAmount)}</BtnTxtAmount>
            </CallBtn>
          ) : null}


        //Fold Alert Dialog
        <AlertDialog
          isOpen={foldActionFlag}
          leastDestructiveRef={foldCancelRef}
          onClose={() => onHide('fold')}
          motionPreset='scale'
          isCentered
          size={"2xl"}
        >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize={'lg'} fontWeight={'bold'}>Fold Hand Confirm?</AlertDialogHeader>
                <AlertDialogBody>Are you Sure? You can't undo this action afterwards.</AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={foldCancelRef} onClick={() => onHide('fold')}>No</Button>
                  <Button colorScheme={'red'} ml={3} onClick={onSubmitFold}>Yes</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>      
    

        //All In Alert Dialog
        <AlertDialog
          isOpen={allInActionFlag}
          leastDestructiveRef={allInCancelRef}
          onClose={() => onHide('allIn')}
          motionPreset='scale'
          isCentered
          size={"2xl"}
        >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize={'lg'} fontWeight={'bold'}>{`All In with Amount ${formatRupee(balanceAmount)}, Confirm?`}</AlertDialogHeader>
                <AlertDialogBody>Are you Sure?</AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={allInCancelRef} onClick={() => onHide('allIn')}>No</Button>
                  <Button colorScheme={'yellow'} ml={3} onClick={onSubmitAllIn}>Yes</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>      
    


        </Container>
      </ScrollPanel>
    );
  
}

const mapStateToProps = applySpec({
  userId: playerIdSelector,
  table: tableSelector,
  seats: seatsSelector,
  players: playersSelector,
  tableWager: foldBetValueSumSeatsSelector,
  cashierTransactions: cashierTransactionsSelector,
  playerBetsSum: playerBetsSumSelector,
  playerLastWin: playerLastWinSelector,
  playerLastBet: playerLastBetSelector
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
export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
