import React, { useLayoutEffect, useRef, useState } from "react";
import Card from "../Card";
import gsap, {Power1} from "gsap";

import { 
    Balance,
    BalanceAmount,
    BalanceMirror,
    BorderElement,
    Card1,
    Card2,
    CardBack,
    HandContainer,
    HandContainerMirror,
    PlayerNameHeader,
    PlayerNameHeaderMirror,
    PlayerNameStr,
    Status,
    StatusMirror,
    StatusStr,
  } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { tableSelector } from "../../store/selectors";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { TurnTimerArea } from "../../pages/TablePage/style";
import soundActions from '../../store/actions/sound'

function numberWithCommas(x) {
  return x.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'INR'
  })

}

const path = [
  {x: -364 -40 , y: 40 + 90 - 10},//1
  {x: -626 -20, y: -95 - 10},//2
  {x: -666 - 20, y: -372 - 10},//3
  {x: -220 - 10, y: -530 - 40},//4
  {x: 140 + 20, y: -530 - 40},//5
  {x: 510 + 110, y: -370 - 30},//6
  {x: 470 + 140, y: -90 - 20 - 10},//7
  {x: 252 + 115, y: 40 + 90 - 10},//8
]

function Seat({seat}) {

  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)
  const card4Ref = useRef(null)
  const balanceRef = useRef(null)

  const dispatch = useDispatch()
  const table    = useSelector(tableSelector)
  const [cardsLength, setCardsLength] = useState(0)
  const [prevbalance, setPrevBalance] = useState(0)
  const {winners = [], stage} = useSelector(tableSelector)
  const {id: seatId, isTurn, gameStatus, cards, balance} = seat
  const isRight = [0, 1, 2, 3].includes(seatId)
  const {pokerVariant = 'Texas', betLimit = 'No Limit'} = table.configData || {}

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if(balanceRef.current && (prevbalance != balance)) {
        gsap.to(balanceRef.current,  {
          textContent: balance,
          duration: 0.5,
          ease: Power1.easeIn,
          snap: { textContent: 1 },
          onStart:function(){
            this.targets()[0].textContent = prevbalance
          },
          stagger: {
            each: 1.0,
            onUpdate: function() {
              this.targets()[0].innerHTML = numberWithCommas(Math.min(Math.ceil(this.targets()[0].textContent)));
            },
          }
        });
        setPrevBalance(balance);
      }
    }, balanceRef)

    return () => ctx.revert()
  }, [balance])

  useLayoutEffect(() => {
     let ctx = gsap.context(() => {
        if((stage == 4) || (stage == 2)) {

           if((cardsLength == 0) && (cards.length == 1) && card1Ref.current ) {
            dispatch(soundActions.play.card())
            gsap.from(card1Ref.current, {x: `${path[seatId].x + 50}`, y: `${path[seatId].y}`, duration: 1, scale: .4, delay: 0, repeat: 0 })
            setCardsLength(1)
           } else if( (cardsLength == 1) && (cards.length == 2) && card2Ref.current) {
            dispatch(soundActions.play.card())
            gsap.from(card2Ref.current, {x: `${path[seatId].x}`, y: `${path[seatId].y}`, duration: 1, scale: .4, delay: 0, repeat: 0 })
            setCardsLength(2)
           } else if( (cardsLength == 2) && (cards.length == 3) && card3Ref.current) {
            dispatch(soundActions.play.card())
            gsap.from(card3Ref.current, {x: `${path[seatId].x}`, y: `${path[seatId].y}`, duration: 1, scale: .4, delay: 0, repeat: 0 })
            setCardsLength(3)
           } else if( (cardsLength == 3) && (cards.length == 4) && card4Ref.current) {
            dispatch(soundActions.play.card())
            gsap.from(card4Ref.current, {x: `${path[seatId].x}`, y: `${path[seatId].y}`, duration: 1, scale: .4, delay: 0, repeat: 0 })
            setCardsLength(4)
           }
        } else {
          setCardsLength(0)
        } 
     }, card1Ref, card2Ref, card3Ref, card4Ref)
     
     return () => ctx.revert()
  }, [stage, seatId, cards])

  const becameWinner = winners.length > 0 ? winners.findIndex((x) => x.id == seat.id) != -1 
                  ? winners[winners.findIndex((x) => x.id == seat.id)] 
                    : {} 
                  : {}

  const {hand = "", id = -1, cards: winningCards = [] , winAmount = 0} = becameWinner

  let balanceTop = `${170}px` 
  switch (true) {
    case /WIN$/.test(gameStatus.toUpperCase()):
      balanceTop = `212px`
      break;
    case /PLAYING/.test(gameStatus.toUpperCase()) && cards.length > 0:
      balanceTop = `212px`
      break;
    case /PLAYING/.test(gameStatus.toUpperCase()):
      balanceTop = `112px`
      break;
    case /WIN*/.test(gameStatus.toUpperCase()):
      balanceTop = `212px`
      break;
    case /LOST-+/.test(gameStatus.toUpperCase()):
      balanceTop = `212px`
      break;
    case /FOLD*/.test(gameStatus.toUpperCase()):
      balanceTop = `212px`
      break;
    default:
      balanceTop = `212px`
      break;
  }


  const {
    REACT_APP_API_ORIGIN
  } = window

  return (
    <React.Fragment>
      {(stage == 18) ? isRight ? 
        <StatusMirror gameStatus={gameStatus.toUpperCase()}>
          <StatusStr gameStatus={/^LOST$/.test(gameStatus.toUpperCase()) ? "FOLDED" : gameStatus.toUpperCase()}>{gameStatus.toUpperCase()}</StatusStr>
        </StatusMirror> 
        : <Status gameStatus={gameStatus.toUpperCase()}>
            <StatusStr gameStatus={/^LOST$/.test(gameStatus.toUpperCase()) ? "FOLDED" : gameStatus.toUpperCase()}>{gameStatus.toUpperCase()}</StatusStr>
          </Status> : null}
      {isRight ? <PlayerNameHeaderMirror><PlayerNameStr>{seatId + 1}</PlayerNameStr></PlayerNameHeaderMirror> : <PlayerNameHeader><PlayerNameStr>{seatId + 1}</PlayerNameStr></PlayerNameHeader>}
      {isRight ? <BalanceMirror top={balanceTop}><BalanceAmount ref={balanceRef}>{numberWithCommas(balance)}</BalanceAmount></BalanceMirror> 
        : <Balance top={balanceTop}><BalanceAmount  ref={balanceRef}>{numberWithCommas(balance)}</BalanceAmount></Balance>}

      {isRight && isTurn && !gameStatus.toUpperCase().includes('WIN') ?  
        <TurnTimerArea top={"-36px"} left={"-15px"} width={"162px"} height={"250px"}><VideoPlayer  url={`${REACT_APP_API_ORIGIN}/assets/videos/anims/PlayerTurnTimer.webm`} /></TurnTimerArea> : null
      }

      {!isRight && isTurn && !gameStatus.toUpperCase().includes('WIN') ?  
        <TurnTimerArea top={"-36px"} left={"232px"} width={"162px"} height={"250px"}><VideoPlayer  url={`${REACT_APP_API_ORIGIN}/assets/videos/anims/PlayerTurnTimer.webm`} /></TurnTimerArea> : null
      }

      {
        pokerVariant == 'Texas' ?
        isRight ?
        <HandContainerMirror>     
            {cards ? cards.length > 0 ? cards[0] == "xx" ? <Card1 ref={card1Ref}></Card1> :
            <>
              <Card ref={card1Ref} name={cards[0]} width={`${.7*130}px`} height={`${.7*190}px`}  top={"-20px"} left={"-34px"}/>
              {winningCards.length > 0 && 
               winningCards.includes(cards[0]) && 
               <BorderElement width={`${.7*130}px`} height={`${.7*190}px`}  top={"-20px"} left={"-34px"}/>
              }
              
            </> :null : null}
            {cards ? cards.length > 1 ?  cards[1] == "xx" ? <Card2 ref={card2Ref}></Card2>:
            <>
              <Card ref={card2Ref} name={cards[1]} width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"58px"}/>
              {winningCards.length > 0 && 
               winningCards.includes(cards[1]) && 
                <BorderElement width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"58px"}/>
              }
            </>   
            :null : null}
        </HandContainerMirror> :
        <HandContainer>
            {cards ? cards.length > 0 ? cards[0] == "xx" ? <Card1 ref={card1Ref}></Card1>:
              <>
                <Card ref={card1Ref} name={cards[0]} width={`${.7*130}px`} height={`${.7*190}px`}  top={"-20px"} left={"-34px"}/>
                {winningCards.length > 0 && 
                 winningCards.includes(cards[0]) && 
                  <BorderElement width={`${.7*130}px`} height={`${.7*190}px`}  top={"-20px"} left={"-34px"}/>
                }
              </>
            : null : null}
            {cards ? cards.length > 1 ? cards[1] == "xx" ? <Card2 ref={card2Ref}></Card2>:
              <>
                <Card ref={card2Ref} name={cards[1]} width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"58px"}/>
                {winningCards.length > 0 && 
                 winningCards.includes(cards[1]) && 
                  <BorderElement width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"58px"}/>
                }
              </>
            :null : null}
        </HandContainer>
        ://Case pokerVariant == 'Omaha'
        isRight ?
        <HandContainerMirror>     
            {cards ? cards.length > 0 ? cards[0] == "xx" ? <CardBack ref={card1Ref} top={"-20px"} left={"-44px"}></CardBack> :
            <>
              <Card ref={card1Ref} name={cards[0]} width={`${.7*130}px`} height={`${.7*190}px`}  top={"-20px"} left={"-44px"}/>
              {winningCards.length > 0 && 
               winningCards.includes(cards[0]) && 
               <BorderElement width={`${.7*130}px`} height={`${.7*190}px`}  top={"-20px"} left={"-44px"}/>
              }
              
            </> :null : null}
            {cards ? cards.length > 1 ?  cards[1] == "xx" ? <CardBack ref={card2Ref} top={"-20px"} left={"-4px"}></CardBack>:
            <>
              <Card ref={card2Ref} name={cards[1]} width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"-4px"}/>
              {winningCards.length > 0 && 
               winningCards.includes(cards[1]) && 
                <BorderElement width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"-4px"}/>
              }
            </>   
            :null : null}
            {cards ? cards.length > 2 ?  cards[2] == "xx" ? <CardBack ref={card3Ref} top={"-20px"} left={"28px"}></CardBack>:
            <>
              <Card ref={card3Ref} name={cards[2]} width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"28px"}/>
              {winningCards.length > 0 && 
               winningCards.includes(cards[2]) && 
                <BorderElement width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"28px"}/>
              }
            </>   
            :null : null}
            {cards ? cards.length > 3 ?  cards[3] == "xx" ? <CardBack ref={card4Ref} top={"-20px"} left={"62px"}></CardBack>:
            <>
              <Card ref={card4Ref} name={cards[3]} width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"62px"}/>
              {winningCards.length > 0 && 
               winningCards.includes(cards[3]) && 
                <BorderElement width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"62px"}/>
              }
            </>   
            :null : null}
        </HandContainerMirror> :
        <HandContainer>
            {cards ? cards.length > 0 ? cards[0] == "xx" ? <CardBack ref={card1Ref} top={"-20px"} left={"-44px"}></CardBack> :
            <>
              <Card ref={card1Ref} name={cards[0]} width={`${.7*130}px`} height={`${.7*190}px`}  top={"-20px"} left={"-44px"}/>
              {winningCards.length > 0 && 
               winningCards.includes(cards[0]) && 
               <BorderElement width={`${.7*130}px`} height={`${.7*190}px`}  top={"-20px"} left={"-44px"}/>
              }
              
            </> :null : null}
            {cards ? cards.length > 1 ?  cards[1] == "xx" ? <CardBack ref={card2Ref} top={"-20px"} left={"-4px"}></CardBack>:
            <>
              <Card ref={card2Ref} name={cards[1]} width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"-4px"}/>
              {winningCards.length > 0 && 
               winningCards.includes(cards[1]) && 
                <BorderElement width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"-4px"}/>
              }
            </>   
            :null : null}
            {cards ? cards.length > 2 ?  cards[2] == "xx" ? <CardBack ref={card3Ref} top={"-20px"} left={"28px"}></CardBack>:
            <>
              <Card ref={card3Ref} name={cards[2]} width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"28px"}/>
              {winningCards.length > 0 && 
               winningCards.includes(cards[2]) && 
                <BorderElement width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"28px"}/>
              }
            </>   
            :null : null}
            {cards ? cards.length > 3 ?  cards[3] == "xx" ? <CardBack ref={card4Ref} top={"-20px"} left={"62px"}></CardBack>:
            <>
              <Card ref={card4Ref} name={cards[3]} width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"62px"}/>
              {winningCards.length > 0 && 
               winningCards.includes(cards[3]) && 
                <BorderElement width={`${.7*130}px`} height={`${.7*190}px`} top={"-20px"} left={"62px"}/>
              }
            </>   
            :null : null}
        </HandContainer>
      }
    </React.Fragment>
  );
}

export default Seat;
