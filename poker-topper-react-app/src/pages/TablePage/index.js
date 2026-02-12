import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {applySpec} from "ramda";
import gsap, {Power1} from "gsap";

import {
	cashierTransactionsSelector,
	foldBetValueSumSeatsSelector,
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
	WaterMark,
	Logo,
	BetContainer,
	BetAmount,
	Dealer,
	SmallBet,
	BigBet,
	Player1Background,
	GameName,
	VideoArea,
	TableDealer,
	StatusIcon,
	BetIcon,
	BetIconMirror,
	TurnVideoArea,
	TurnTimerArea,
	PotMeter,
	BackGroundArea,
	PotContainer,
	MainPotArea,
	SidePotArea,
} from "./style";

import {formatRupee} from "../../utils/functions/formatRupee";
import {isObjectNonEmpty} from "../../utils";

import Table from "../../components/Table";
import Seat from "../../components/Seat";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import Check from "../../primitives/Check";
import Bet from "../../primitives/Bet";
import Raise from "../../primitives/Raise";
import Call from "../../primitives/Call";
import Fold from "../../primitives/Fold";
import AllIn from "../../primitives/AllIn";
import Money from "../../primitives/Money";
import soundActions from "../../store/actions/sound";
import Pocket from "../../components/Pocket";

function numberWithCommas(x) {
	return x.toLocaleString("en-IN", {
		maximumFractionDigits: 0,
		style: "currency",
		currency: "INR",
	});
}

const path = [
	{x: 100, y: 100},
	{x: -364, y: 40}, //1
	{x: -626, y: -95}, //2
	{x: -666, y: -372}, //3
	{x: -356, y: -530}, //4
	{x: 140, y: -540}, //5
	{x: 510, y: -370}, //6
	{x: 470, y: -90}, //7
	{x: 252, y: 40}, //8
];

function TablePage({table, tableWager, seats}) {
	const checkButtonRefs = useRef([]);
	const callButtonRefs = useRef([]);
	const betButtonRefs = useRef([]);
	const raiseButtonRefs = useRef([]);
	const allInButtonRefs = useRef([]);

	const potAmountRef = useRef(null);
	const dealerRef = useRef(null);

	const dispatch = useDispatch();
	const [active, setActive] = useState("-1");
	const [minHandBetAmount, setMinHandBetAmount] = useState(0);
	const [minHandRaiseAmount, setMinHandRaiseAmount] = useState(0);
	const [handBetAmount, setHandBetAmount] = useState(0);
	const [handRaiseAmount, setHandRaiseAmount] = useState(0);
	const {stage, potAmount} = table;

	useLayoutEffect(() => {
		let ctx = gsap.context(() => {
			if (potAmountRef.current) {
				gsap.to(potAmountRef.current, {
					textContent: potAmount,
					duration: 2,
					ease: Power1.easeIn,
					snap: {textContent: 1},
					stagger: {
						each: 1.0,
						onUpdate: function () {
							this.targets()[0].innerHTML = numberWithCommas(
								Math.ceil(this.targets()[0].textContent),
							);
						},
					},
				});
			}
		}, potAmountRef);

		return () => ctx.revert();
	}, [potAmount]);

	useLayoutEffect(() => {
		let ctx = gsap.context(
			() => {
				if (
					stage == "7" ||
					stage == "10" ||
					stage == "13" ||
					stage == "16" ||
					stage == "17" ||
					stage == "18"
				) {
					callButtonRefs.current.forEach((callBtn) => {
						if (isObjectNonEmpty(callBtn)) {
							gsap.to(callBtn, {
								x: `${path[callBtn.id].x}`,
								y: `${path[callBtn.id].y}`,
								duration: 1,
								repeat: 0,
							});
							gsap.to(callBtn, {opacity: 0, delay: 0.5});
						}
					});
					checkButtonRefs.current.forEach((checkbtn) => {
						if (isObjectNonEmpty(checkbtn)) {
							gsap.to(checkbtn, {
								x: `${path[checkbtn.id].x}`,
								y: `${path[checkbtn.id].y}`,
								duration: 1,
								repeat: 0,
							});
							gsap.to(checkbtn, {opacity: 0, delay: 0.5});
						}
					});
					betButtonRefs.current.forEach((betBtn) => {
						if (isObjectNonEmpty(betBtn)) {
							gsap.to(betBtn, {
								x: `${path[betBtn.id].x}`,
								y: `${path[betBtn.id].y}`,
								duration: 1,
								repeat: 0,
							});
							gsap.to(betBtn, {opacity: 0, delay: 0.5});
						}
					});
					raiseButtonRefs.current.forEach((raiseBtn) => {
						if (isObjectNonEmpty(raiseBtn)) {
							gsap.to(raiseBtn, {
								x: `${path[raiseBtn.id].x}`,
								y: `${path[raiseBtn.id].y}`,
								duration: 1,
								repeat: 0,
							});
							gsap.to(raiseBtn, {opacity: 0, delay: 0.5});
						}
					});
					allInButtonRefs.current.forEach((allInBtn) => {
						if (isObjectNonEmpty(allInBtn)) {
							gsap.to(allInBtn, {
								x: `${path[allInBtn.id].x}`,
								y: `${path[allInBtn.id].y}`,
								duration: 1,
								repeat: 0,
							});
							gsap.to(allInBtn, {opacity: 0, delay: 0.5});
						}
					});
				}
			},
			callButtonRefs,
			betButtonRefs,
			checkButtonRefs,
			raiseButtonRefs,
			allInButtonRefs,
			stage,
		);

		return () => ctx.revert();
	}, [tableWager, stage]);

	useEffect(() => {
		if (tableWager > 0) {
			dispatch(soundActions.play.bet());
		}
	}, [tableWager]);

	const seat1 = seats[0];
	const seat2 = seats[1];
	const seat3 = seats[2];
	const seat4 = seats[3];
	const seat5 = seats[4];
	const seat6 = seats[5];
	const seat7 = seats[6];
	const seat8 = seats[7];

	const playingIds = seats
		.filter(
			(seat) =>
				!seat.gameStatus.toUpperCase().includes("SIT") &&
				!seat.gameStatus.toUpperCase().includes("FOLD") &&
				!seat.gameStatus.toUpperCase().includes("LOST") &&
				!seat.gameStatus.toUpperCase().includes("WIN") &&
				!seat.gameStatus.toUpperCase().includes("IN"),
		)
		.map((seat) => seat.id);

	const totalSidePots =
		table.sidePots && table.sidePots.length > 0
			? table.sidePots
					.map(
						(item) =>
							item.capAmount *
							[...new Set([...item.ids, ...playingIds])].length,
					)
					.reduce((result, current) => {
						return result + current;
					}, 0)
			: 0;

	const {pokerVariant = "Texas", betLimit = "No Limit"} =
		table.configData || {};

	if (seats.length == 0) return null;
	else
		return (
			<Container>
				<TableDealer ref={dealerRef} />
				{/* <WaterMark /> */}
				{/* <Logo /> */}
				<GameName pokerVariant={pokerVariant} betLimit={betLimit} />

				<Table
					configData={table.configData}
					roundId={table.roundId}
					sidePots={table.sidePots}
					action={table.action}
					stage={table.stage}
					potAmount={table.potAmount}
					tableWager={tableWager}
					gameCards={table.gameCards}
					selected={false}
				/>

				{seat1 && seat1 ? (
					<Player1Area
						gameStatus={seat1.gameStatus.toUpperCase()}
						turn={seat1.isTurn}>
						<Seat seat={seat1} />
						<Pocket
							id={1}
							bets={seat1.bets}
							gameStatus={seat1.gameStatus}
							left={"-110px"}
							top={"212px"}
							checkButtonRefs={checkButtonRefs}
							allInButtonRefs={allInButtonRefs}
							callButtonRefs={callButtonRefs}
							betButtonRefs={betButtonRefs}
							raiseButtonRefs={raiseButtonRefs}
						/>
						{/*               
              {seat1.gameStatus.toUpperCase().includes('FOLDED') ?  <StatusIcon color={"red"} left={"-110px"} top={"212px"} ><Fold /></StatusIcon> : null}
              {seat1.gameStatus.toUpperCase().includes('CHECKED') ? <StatusIcon color={"darkturquoise"} left={"-110px"} top={"212px"} ><Check id={1} ref={checkButtonRefs} /></StatusIcon> : null}

              {seat1.gameStatus.toUpperCase().includes('ALL IN') ?  
                <BetIconMirror color={"red"} left={"-110px"} top={"212px"}>
                    <AllIn id={1} ref={allInButtonRefs} />
                    <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat1.bets[0])} </span>
                </BetIconMirror>
                : null}

              {seat1.gameStatus.toUpperCase().includes('CALLED') ?  
                <BetIconMirror color={"darkturquoise"} left={"-110px"} top={"212px"}>
                  <Call id={1} ref={callButtonRefs} />
                  <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat1.bets[0])} </span>
                </BetIconMirror> 
                : null}
              {seat1.gameStatus.toUpperCase().includes('BET') ||  seat1.gameStatus.toUpperCase().includes('SB') ?  
                <BetIconMirror color={"yellow"} left={"-110px"} top={"212px"}>
                  <Bet id={1} ref={betButtonRefs} />
                  <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat1.bets[0])} </span>
                </BetIconMirror> 
                : null}
              {seat1.gameStatus.toUpperCase().includes('RAISE') ||  seat1.gameStatus.toUpperCase().includes('BB') ?  
                <BetIconMirror color={"orange"} left={"-110px"} top={"212px"}>
                  <Raise id={1} ref={raiseButtonRefs} />
                  <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat1.bets[0])} </span>
                </BetIconMirror> 
                : null} */}
					</Player1Area>
				) : null}
				{seat2 && seat2 ? (
					<Player2Area
						gameStatus={seat2.gameStatus.toUpperCase()}
						turn={seat2.isTurn}>
						<Seat seat={seat2} />
						<Pocket
							id={2}
							bets={seat2.bets}
							gameStatus={seat2.gameStatus}
							left={"-125px"}
							top={"83px"}
							checkButtonRefs={checkButtonRefs}
							allInButtonRefs={allInButtonRefs}
							callButtonRefs={callButtonRefs}
							betButtonRefs={betButtonRefs}
							raiseButtonRefs={raiseButtonRefs}
						/>

						{/* {seat2.gameStatus.toUpperCase().includes('FOLDED') ?  <StatusIcon color={"red"} left={"-125px"} top={"83px"} ><Fold /></StatusIcon> : null}
              {seat2.gameStatus.toUpperCase().includes('CHECKED') ?  <StatusIcon color={"darkturquoise"} left={"-125px"} top={"83px"} ><Check id={2} ref={checkButtonRefs}  /></StatusIcon> : null}
              
              {seat2.gameStatus.toUpperCase().includes('ALL IN') ?  
                <BetIconMirror color={"red"} left={"-125px"} top={"83px"}>
                    <AllIn id={2} ref={allInButtonRefs} />
                    <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat2.bets[0])} </span>
                </BetIconMirror>
                : null}

              {seat2.gameStatus.toUpperCase().includes('CALLED') ?  
                <BetIconMirror color={"darkturquoise"} left={"-125px"} top={"83px"}>
                  <Call  id={2} ref={callButtonRefs} />
                  <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat2.bets[0])} </span>
                </BetIconMirror> 
                : null}
              {seat2.gameStatus.toUpperCase().includes('BET') ||  seat2.gameStatus.toUpperCase().includes('SB') ?  
                <BetIconMirror color={"yellow"} left={"-125px"} top={"83px"}>
                  <Bet id={2} ref={betButtonRefs} />
                  <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat2.bets[0])} </span>
                </BetIconMirror> 
                : null}
              {seat2.gameStatus.toUpperCase().includes('RAISE') ||  seat2.gameStatus.toUpperCase().includes('BB') ?  
                <BetIconMirror color={"orange"} left={"-125px"} top={"83px"}>
                  <Raise id={2} ref={raiseButtonRefs}  />
                  <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat2.bets[0])} </span>
                </BetIconMirror> : null}
 */}
					</Player2Area>
				) : null}
				{seat3 && seat3 ? (
					<Player3Area
						gameStatus={seat3.gameStatus.toUpperCase()}
						turn={seat3.isTurn}>
						<Seat seat={seat3} />
						<Pocket
							id={3}
							bets={seat3.bets}
							gameStatus={seat3.gameStatus}
							left={"-140px"}
							top={"23px"}
							checkButtonRefs={checkButtonRefs}
							allInButtonRefs={allInButtonRefs}
							callButtonRefs={callButtonRefs}
							betButtonRefs={betButtonRefs}
							raiseButtonRefs={raiseButtonRefs}
						/>

						{/* {seat3.gameStatus.toUpperCase().includes('FOLDED') ?  <StatusIcon color={"red"} left={"-140px"} top={"23px"} ><Fold /></StatusIcon> : null}
              {seat3.gameStatus.toUpperCase().includes('CHECKED') ? <StatusIcon color={"darkturquoise"} left={"-140px"} top={"23px"} ><Check id={3} ref={checkButtonRefs}  /></StatusIcon> : null}
              
              {seat3.gameStatus.toUpperCase().includes('ALL IN') ?  
                <BetIconMirror color={"red"} left={"-140px"} top={"23px"}>
                    <AllIn id={3} ref={allInButtonRefs} />
                    <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat3.bets[0])} </span>
                </BetIconMirror>
                : null}

              {seat3.gameStatus.toUpperCase().includes('CALLED') ?  
                <BetIconMirror color={"darkturquoise"} left={"-140px"} top={"23px"}>
                  <Call  id={3} ref={callButtonRefs} />
                  <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat3.bets[0])} </span>
                </BetIconMirror> 
                : null}
              {seat3.gameStatus.toUpperCase().includes('BET') ||  seat3.gameStatus.toUpperCase().includes('SB') ?  
                <BetIconMirror color={"yellow"} left={"-140px"} top={"23px"}>
                  <Bet id={3} ref={betButtonRefs} />
                  <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat3.bets[0])} </span>
                </BetIconMirror> 
                : null}
              {seat3.gameStatus.toUpperCase().includes('RAISE') ||  seat3.gameStatus.toUpperCase().includes('BB') ?  
                <BetIconMirror color={"orange"} left={"-140px"} top={"23px"}>
                  <Raise id={3} ref={raiseButtonRefs}  />
                  <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat3.bets[0])} </span>
                </BetIconMirror> 
                : null} */}
					</Player3Area>
				) : null}
				{seat4 && seat4 ? (
					<Player4Area
						gameStatus={seat4.gameStatus.toUpperCase()}
						turn={seat4.isTurn}>
						<Seat seat={seat4} />
						<Pocket
							id={4}
							bets={seat4.bets}
							gameStatus={seat4.gameStatus}
							left={"20px"}
							top={"-57px"}
							checkButtonRefs={checkButtonRefs}
							allInButtonRefs={allInButtonRefs}
							callButtonRefs={callButtonRefs}
							betButtonRefs={betButtonRefs}
							raiseButtonRefs={raiseButtonRefs}
						/>

						{/* {seat4.gameStatus.toUpperCase().includes('FOLDED') ?  <StatusIcon color={"red"} left={"90px"} top={"-57px"} ><Fold /></StatusIcon> : null}
              {seat4.gameStatus.toUpperCase().includes('CHECKED') ? <StatusIcon color={"darkturquoise"} left={"90px"} top={"-57px"} ><Check id={4} ref={checkButtonRefs}  /></StatusIcon> : null}
              
              {seat4.gameStatus.toUpperCase().includes('ALL IN') ?  
                <BetIconMirror color={"red"} left={"20px"} top={"-57px"}>
                    <AllIn id={4} ref={allInButtonRefs} />
                    <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat4.bets[0])} </span>
                </BetIconMirror>
                : null}
              
              {seat4.gameStatus.toUpperCase().includes('CALLED') ?  
                <BetIconMirror color={"darkturquoise"} left={"20px"} top={"-57px"}>
                  <Call  id={4} ref={callButtonRefs} />
                  <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat4.bets[0])} </span>
                </BetIconMirror> 
                : null}

              {seat4.gameStatus.toUpperCase().includes('BET') ||  seat4.gameStatus.toUpperCase().includes('SB') ?  
                <BetIconMirror color={"yellow"} left={"20px"} top={"-57px"}>
                  <Bet id={4} ref={betButtonRefs}  />
                  <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat4.bets[0])} </span>
                </BetIconMirror> 
                : null}

              {seat4.gameStatus.toUpperCase().includes('RAISE') ||  seat4.gameStatus.toUpperCase().includes('BB') ?  
                <BetIconMirror color={"orange"} left={"20px"} top={"-57px"}>
                  <Raise id={4} ref={raiseButtonRefs} />
                  <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat4.bets[0])} </span>
                </BetIconMirror> 
                : null} */}
					</Player4Area>
				) : null}
				{seat5 && seat5 ? (
					<Player5Area
						gameStatus={seat5.gameStatus.toUpperCase()}
						turn={seat5.isTurn}>
						<Seat seat={seat5} />
						<Pocket
							id={5}
							bets={seat5.bets}
							gameStatus={seat5.gameStatus}
							left={"310px"}
							top={"-57px"}
							checkButtonRefs={checkButtonRefs}
							allInButtonRefs={allInButtonRefs}
							callButtonRefs={callButtonRefs}
							betButtonRefs={betButtonRefs}
							raiseButtonRefs={raiseButtonRefs}
						/>

						{/* {seat5.gameStatus.toUpperCase().includes('FOLDED') ?  <StatusIcon color={"red"} left={"310px"} top={"-57px"} ><Fold /></StatusIcon> : null}
              {seat5.gameStatus.toUpperCase().includes('CHECKED') ? <StatusIcon color={"darkturquoise"} left={"310px"} top={"-57px"} ><Check  id={5} ref={checkButtonRefs}/></StatusIcon> : null}
              
              {seat5.gameStatus.toUpperCase().includes('ALL IN') ?  
                <BetIcon color={"red"} left={"310px"} top={"-57px"}>
                    <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat5.bets[0])} </span>
                    <AllIn id={5} ref={allInButtonRefs} />
                </BetIcon>
                : null}

              {seat5.gameStatus.toUpperCase().includes('CALLED') ?  
                <BetIcon color={"darkturquoise"} left={"310px"} top={"-57px"}>
                  <span style={{display: 'inline-flex', alignItems: 'center'}}>{formatRupee(seat5.bets[0])} </span>
                  <Call  id={5} ref={callButtonRefs} />
                </BetIcon> 
                : null}
              {seat5.gameStatus.toUpperCase().includes('BET') ||  seat5.gameStatus.toUpperCase().includes('SB') ?  
                <BetIcon color={"yellow"} left={"310px"} top={"-57px"}>
                  <span style={{display: 'inline-flex', alignItems: 'center'}}>{formatRupee(seat5.bets[0])} </span>
                  <Bet  id={5} ref={betButtonRefs}/>
                </BetIcon> 
                : null}
              {seat5.gameStatus.toUpperCase().includes('RAISE') ||  seat5.gameStatus.toUpperCase().includes('BB') ?  
                <BetIcon color={"orange"} left={"310px"} top={"-57px"}>
                  <span style={{display: 'inline-flex', alignItems: 'center'}}>{formatRupee(seat5.bets[0])} </span>
                  <Raise  id={5} ref={raiseButtonRefs}/>
                </BetIcon> : null} */}
					</Player5Area>
				) : null}
				{seat6 && seat6 ? (
					<Player6Area
						gameStatus={seat6.gameStatus.toUpperCase()}
						turn={seat6.isTurn}>
						<Seat seat={seat6} />
						<Pocket
							id={6}
							bets={seat6.bets}
							gameStatus={seat6.gameStatus}
							left={"428px"}
							top={"23px"}
							checkButtonRefs={checkButtonRefs}
							allInButtonRefs={allInButtonRefs}
							callButtonRefs={callButtonRefs}
							betButtonRefs={betButtonRefs}
							raiseButtonRefs={raiseButtonRefs}
						/>

						{/* {seat6.gameStatus.toUpperCase().includes('FOLDED') ?  <StatusIcon color={"red"} left={"428px"} top={"23px"} ><Fold /></StatusIcon> : null}
              {seat6.gameStatus.toUpperCase().includes('CHECKED') ? <StatusIcon color={"darkturquoise"} left={"428px"} top={"23px"} ><Check  id={6} ref={checkButtonRefs} /></StatusIcon> : null}
              
              {seat6.gameStatus.toUpperCase().includes('ALL IN') ?  
                <BetIcon color={"red"} left={"428px"} top={"23px"}>
                    <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat6.bets[0])} </span>
                    <AllIn id={6} ref={allInButtonRefs} />
                </BetIcon>
                : null}

              {seat6.gameStatus.toUpperCase().includes('CALLED') ?  
                <BetIcon color={"darkturquoise"} left={"428px"} top={"23px"}>
                  <span style={{display: 'inline-flex', alignItems: 'center'}}>{formatRupee(seat6.bets[0])} </span>
                  <Call id={6} ref={callButtonRefs} />
                </BetIcon> : null}
              
              {seat6.gameStatus.toUpperCase().includes('BET') ||  seat6.gameStatus.toUpperCase().includes('SB') ?  
                <BetIcon color={"yellow"} left={"428px"} top={"23px"}>
                  <span style={{display: 'inline-flex', alignItems: 'center'}}>{formatRupee(seat6.bets[0])} </span>
                  <Bet  id={6} ref={betButtonRefs} />
                </BetIcon> 
                : null}
              
              {seat6.gameStatus.toUpperCase().includes('RAISE') ||  seat6.gameStatus.toUpperCase().includes('BB') ?  
                <BetIcon color={"orange"} left={"428px"} top={"23px"}>
                  <span style={{display: 'inline-flex', alignItems: 'center'}}>{formatRupee(seat6.bets[0])} </span>
                  <Raise  id={6} ref={raiseButtonRefs} />
                </BetIcon> 
                : null} */}
					</Player6Area>
				) : null}
				{seat7 && seat7 ? (
					<Player7Area
						gameStatus={seat7.gameStatus.toUpperCase()}
						turn={seat7.isTurn}>
						<Seat seat={seat7} />
						<Pocket
							id={7}
							bets={seat7.bets}
							gameStatus={seat7.gameStatus}
							left={"420px"}
							top={"83px"}
							checkButtonRefs={checkButtonRefs}
							allInButtonRefs={allInButtonRefs}
							callButtonRefs={callButtonRefs}
							betButtonRefs={betButtonRefs}
							raiseButtonRefs={raiseButtonRefs}
						/>

						{/* {seat7.gameStatus.toUpperCase().includes('FOLDED') ?  <StatusIcon color={"red"} left={"420px"} top={"83px"} ><Fold /></StatusIcon> : null}
              {seat7.gameStatus.toUpperCase().includes('CHECKED') ?  <StatusIcon color={"darkturquoise"} left={"420px"} top={"83px"} ><Check  id={7} ref={checkButtonRefs}/></StatusIcon> : null}
              
              {seat7.gameStatus.toUpperCase().includes('ALL IN') ?  
                <BetIcon color={"red"} left={"420px"} top={"83px"}>
                    <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat7.bets[0])} </span>
                    <AllIn id={7} ref={allInButtonRefs} />
                </BetIcon>
                : null}

              {seat7.gameStatus.toUpperCase().includes('CALLED') ?  
                <BetIcon color={"darkturquoise"} left={"420px"} top={"83px"}>
                  <span style={{display: 'inline-flex', alignItems: 'center'}}>{formatRupee(seat7.bets[0])} </span>
                  <Call  id={7} ref={callButtonRefs} />
                </BetIcon> 
                : null}
              {seat7.gameStatus.toUpperCase().includes('BET') ||  seat7.gameStatus.toUpperCase().includes('SB') ?  
                <BetIcon color={"yellow"} left={"420px"} top={"83px"}>
                  <span style={{display: 'inline-flex', alignItems: 'center'}}>{formatRupee(seat7.bets[0])} </span>
                  <Bet  id={7} ref={betButtonRefs} />
                </BetIcon> 
                : null}
              {seat7.gameStatus.toUpperCase().includes('RAISE') ||  seat7.gameStatus.toUpperCase().includes('BB') ?  
                <BetIcon color={"orange"} left={"420px"} top={"83px"}>
                  <span style={{display: 'inline-flex', alignItems: 'center'}}>{formatRupee(seat7.bets[0])} </span>
                  <Raise  id={7} ref={betButtonRefs} />
                </BetIcon> 
                : null} */}
					</Player7Area>
				) : null}
				{seat8 && seat8 ? (
					<Player8Area
						gameStatus={seat8.gameStatus.toUpperCase()}
						turn={seat8.isTurn}>
						<Seat seat={seat8} />
						<Pocket
							id={8}
							bets={seat8.bets}
							gameStatus={seat8.gameStatus}
							left={"417px"}
							top={"212px"}
							checkButtonRefs={checkButtonRefs}
							allInButtonRefs={allInButtonRefs}
							callButtonRefs={callButtonRefs}
							betButtonRefs={betButtonRefs}
							raiseButtonRefs={raiseButtonRefs}
						/>

						{/* {seat8.gameStatus.toUpperCase().includes('FOLDED') ?  <StatusIcon color={"red"} left={"417px"} top={"212px"} ><Fold /></StatusIcon> : null}
              {seat8.gameStatus.toUpperCase().includes('CHECKED') ?  <StatusIcon color={"darkturquoise"} left={"417px"} top={"212px"} ><Check  id={8} ref={checkButtonRefs} /></StatusIcon> : null}
              
              {seat8.gameStatus.toUpperCase().includes('ALL IN') ?  
                <BetIcon color={"red"} left={"417px"} top={"212px"}>
                    <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'end'}}>{formatRupee(seat8.bets[0])} </span>
                    <AllIn id={8} ref={allInButtonRefs} />
                </BetIcon>
                : null}
              
              {seat8.gameStatus.toUpperCase().includes('CALLED') ?  
                <BetIcon color={"darkturquoise"} left={"417px"} top={"212px"}>
                  <span style={{display: 'inline-flex', alignItems: 'center'}}>{formatRupee(seat8.bets[0])} </span>
                  <Call  id={8} ref={callButtonRefs} />
                </BetIcon> 
                : null}
              {seat8.gameStatus.toUpperCase().includes('BET') ||  seat8.gameStatus.toUpperCase().includes('SB') ?  
                <BetIcon color={"yellow"} left={"417px"} top={"212px"}>
                  <span style={{display: 'inline-flex', alignItems: 'center'}}>{formatRupee(seat8.bets[0])} </span>
                  <Bet id={8} ref={betButtonRefs} />
                </BetIcon> 
                : null}
              {seat8.gameStatus.toUpperCase().includes('RAISE') || seat8.gameStatus.toUpperCase().includes('BB') ?  
                <BetIcon color={"orange"} left={"417px"} top={"212px"}>
                  <span style={{display: 'inline-flex', alignItems: 'center'}}>{formatRupee(seat8.bets[0])} </span>
                  <Raise id={8} ref={raiseButtonRefs} />
                </BetIcon> 
                : null} */}
					</Player8Area>
				) : null}

				<TableBg pokerVariant={pokerVariant} betLimit={betLimit}>
					{table.sidePots.length > 0 &&
					(totalSidePots <= table.potAmount || stage == "18") ? (
						<SidePotArea>
							{table.sidePots.map((item, index) => (
								<PotContainer key={index}>
									<Money />
									<span>
										{formatRupee(
											item.capAmount *
												[...new Set([...item.ids, ...playingIds])].length +
												item.foldAmount,
										)}
									</span>
								</PotContainer>
							))}
						</SidePotArea>
					) : null}
					{(table.sidePots.length == 0 || totalSidePots > table.potAmount) &&
					table.potAmount > 0 ? (
						<MainPotArea>
							<PotContainer color={"white"}>
								<Money />
								<span
									ref={potAmountRef}
									className="data"
									style={{display: "inline-flex", alignItems: "center"}}>
									₹{numberWithCommas(potAmount - totalSidePots)}
								</span>
							</PotContainer>
						</MainPotArea>
					) : null}
					{table.sidePots.length > 0 && totalSidePots <= table.potAmount ? (
						<MainPotArea>
							<PotContainer>
								<Money />
								<span>{formatRupee(table.potAmount - totalSidePots)}</span>
							</PotContainer>
						</MainPotArea>
					) : null}

					{seat1 &&
					seat1.isTurn &&
					!seat1.gameStatus.toUpperCase().includes("WIN") ? (
						<TurnVideoArea
							top={"182px"}
							left={"848px"}
							width={"290px"}
							height={"250px"}>
							<VideoPlayer
								url={`${REACT_APP_API_ORIGIN}/assets/videos/anims/Player1Glow.webm`}
							/>
						</TurnVideoArea>
					) : null}
					{seat2 &&
					seat2.isTurn &&
					!seat2.gameStatus.toUpperCase().includes("WIN") ? (
						<TurnVideoArea
							top={"350px"}
							left={"1018px"}
							width={"290px"}
							height={"250px"}>
							<VideoPlayer
								url={`${REACT_APP_API_ORIGIN}/assets/videos/anims/Player2Glow.webm`}
							/>
						</TurnVideoArea>
					) : null}
					{seat3 &&
					seat3.isTurn &&
					!seat3.gameStatus.toUpperCase().includes("WIN") ? (
						<TurnVideoArea
							top={"562px"}
							left={"936px"}
							width={"290px"}
							height={"250px"}>
							<VideoPlayer
								url={`${REACT_APP_API_ORIGIN}/assets/videos/anims/Player3Glow.webm`}
							/>
						</TurnVideoArea>
					) : null}
					{seat4 &&
					seat4.isTurn &&
					!seat4.gameStatus.toUpperCase().includes("WIN") ? (
						<TurnVideoArea
							top={"605px"}
							left={"672px"}
							width={"290px"}
							height={"250px"}>
							<VideoPlayer
								url={`${REACT_APP_API_ORIGIN}/assets/videos/anims/Player4Glow.webm`}
							/>
						</TurnVideoArea>
					) : null}
					{seat5 &&
					seat5.isTurn &&
					!seat5.gameStatus.toUpperCase().includes("WIN") ? (
						<TurnVideoArea
							top={"605px"}
							left={"390px"}
							width={"290px"}
							height={"250px"}>
							<VideoPlayer
								url={`${REACT_APP_API_ORIGIN}/assets/videos/anims/Player5Glow.webm`}
							/>
						</TurnVideoArea>
					) : null}
					{seat6 &&
					seat6.isTurn &&
					!seat6.gameStatus.toUpperCase().includes("WIN") ? (
						<TurnVideoArea
							top={"562px"}
							left={"126px"}
							width={"290px"}
							height={"250px"}>
							<VideoPlayer
								url={`${REACT_APP_API_ORIGIN}/assets/videos/anims/Player6Glow.webm`}
							/>
						</TurnVideoArea>
					) : null}
					{seat7 &&
					seat7.isTurn &&
					!seat7.gameStatus.toUpperCase().includes("WIN") ? (
						<TurnVideoArea
							top={"348px"}
							left={"38px"}
							width={"290px"}
							height={"250px"}>
							<VideoPlayer
								url={`${REACT_APP_API_ORIGIN}/assets/videos/anims/Player7Glow.webm`}
							/>
						</TurnVideoArea>
					) : null}
					{seat8 &&
					seat8.isTurn &&
					!seat8.gameStatus.toUpperCase().includes("WIN") ? (
						<TurnVideoArea
							top={"177px"}
							left={"217px"}
							width={"290px"}
							height={"250px"}>
							<VideoPlayer
								url={`${REACT_APP_API_ORIGIN}/assets/videos/anims/Player8Glow.webm`}
							/>
						</TurnVideoArea>
					) : null}

					{seat1 && seat1.isDealer ? (
						<Dealer left={"875px"} top={"342px"} />
					) : null}
					{seat2 && seat2.isDealer ? (
						<Dealer left={"1123px"} top={"424px"} />
					) : null}
					{seat3 && seat3.isDealer ? (
						<Dealer left={"1123px"} top={"630px"} />
					) : null}
					{seat4 && seat4.isDealer ? (
						<Dealer left={"922px"} top={"702px"} />
					) : null}
					{seat5 && seat5.isDealer ? (
						<Dealer left={"452px"} top={"702px"} />
					) : null}
					{seat6 && seat6.isDealer ? (
						<Dealer left={"256px"} top={"630px"} />
					) : null}
					{seat7 && seat7.isDealer ? (
						<Dealer left={"248px"} top={"424px"} />
					) : null}
					{seat8 && seat8.isDealer ? (
						<Dealer left={"500px"} top={"342px"} />
					) : null}
				</TableBg>
			</Container>
		);
}

const mapStateToProps = applySpec({
	table: tableSelector,
	seats: seatsSelector,
	tableWager: foldBetValueSumSeatsSelector,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(TablePage);
