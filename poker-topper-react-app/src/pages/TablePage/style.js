import styled from "@emotion/styled";

import Background from "../../assets/images/table/V2/Background.png";
import TableGreen from "../../assets/images/table/v2/TableGreen.png";
import TableBlue from "../../assets/images/table/v2/TableBlue.png";
import TableRed from "../../assets/images/table/v2/TableRed.png";

import TexasLimitImg from "../../assets/images/table/v2/TexasLimit.png";
import TexasPotLimitImg from "../../assets/images/table/v2/TexasPotLimit.png";
import TexasNoLimitImg from "../../assets/images/table/v2/TexasNoLimit.png";

import OmahaLimitImg from "../../assets/images/table/v2/OmahaLimit.png";
import OmahaPotLimitImg from "../../assets/images/table/v2/OmahaPotLimit.png";
import OmahaNoLimitImg from "../../assets/images/table/v2/OmahaNoLimit.png";

import MeterBg from "../../assets/images/meter.png";
import WaterMarkImg from "../../assets/images/TexasHoldem.png";
import GameNameImg from "../../assets/images/GameName.png";
import LogoImg from "../../assets/images/FunPalaceCenter.png";
import PlateImg from "../../assets/images/Plate.png";

import player1Img from "../../assets/images/Meter1.png";
import player2Img from "../../assets/images/Meter1.png";
import player3Img from "../../assets/images/Meter1.png";
import player4Img from "../../assets/images/Meter1.png";
import player5Img from "../../assets/images/Meter6.png";
import player6Img from "../../assets/images/Meter6.png";
import player7Img from "../../assets/images/Meter6.png";
import player8Img from "../../assets/images/Meter6.png";

import playerImg1 from "../../assets/images/player/p1.png";
import playerImg2 from "../../assets/images/player/p2.png";
import playerImg3 from "../../assets/images/player/p3.png";
import playerGlow from "../../assets/images/anims/BorderGlowImg.png";

import tableDealerImage from "../../assets/images/TableDealer.png";
import dealerImage from "../../assets/images/DealerImg.png";
import bigBetImage from "../../assets/images/bb.png";
import smallBetImage from "../../assets/images/smb.png";

export const Container = styled.div`
	width: 1920px;
	height: 1080px;

	background-image: url(${Background});
	background-repeat: no-repeat;
	background-size: contain;
	background-position: top;

	display: grid;
	grid-template-columns: repeat(40, 48px);
	grid-template-rows: repeat(25, 44px);
`;

export const BackGroundArea = styled.div`
	position: relative;
	top: 0%;
	left: 0%;
	grid-row: 1 / -1;
	grid-column: 1 / -1;
	z-index: 0;
`;

export const PotMeter = styled.div`
	position: relative;
	width: 222px;
	height: 60px;
	top: 32%;
	left: 42%;

	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: repeat(1, 1fr);
	font-family: "Roboto";
	font-weight: 800;
	font-size: 1.8rem;
	opacity: 1;
	color: white;
	text-align: center;
	z-index: 110;
	background: black;
	border-radius: 20px;
`;

export const TurnVideoArea = styled.div`
	position: absolute;
	top: ${(props) => (props.top ? props.top : "-37px")};
	left: ${(props) => (props.left ? props.left : "187px")};
	width: ${(props) => (props.width ? props.width : "320px")};
	height: ${(props) => (props.height ? props.height : "320px")};
	z-index: 0;
	transform-style: preserve-3d;
	transform: ${(props) =>
		props.rotX
			? `perspective(54em) rotateX(${props.rotX}deg) rotateY(${props.rotY}deg) rotateZ(${props.rotZ}deg)`
			: `perspective(54em) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`};
`;

export const TurnTimerArea = styled.div`
	position: absolute;
	top: ${(props) => (props.top ? props.top : "-37px")};
	left: ${(props) => (props.left ? props.left : "187px")};
	width: ${(props) => (props.width ? props.width : "160px")};
	height: ${(props) => (props.height ? props.height : "250px")};
	z-index: 0;
`;

export const StatusIcon = styled.div`
	position: absolute;
	color: ${(props) => (props.color ? props.color : "darkturquoise")};
	left: ${(props) => (props.left ? props.left : "437px")};
	top: ${(props) => (props.top ? props.top : "23px")};
	z-index: 70;
	width: 48px;
	height: 48px;
`;

export const MainPotArea = styled.div`
	position: absolute;
	width: 230px;
	height: 50px;
	left: 600px;
	top: 360px;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SidePotArea = styled.div`
	position: absolute;
	width: ${210 * 4}px;
	height: 50px;
	left: 300px;
	top: 440px;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const PotContainer = styled.div`
	display: grid;
	grid-template-columns: 1.2fr 3fr;
	grid-template-rows: repeat(1, 1fr);
	align-items: center;

	color: ${(props) => (props.color ? props.color : "white")};
	z-index: 70;
	width: min-content;
	height: 48px;

	font-family: "Rubik";
	font-weight: 700;
	font-size: 1.5rem;

	background: black;
	border-radius: 20px;
	padding-right: 8px;
	padding-left: 8px;
	margin-right: 5px;
`;

export const BetIcon = styled.div`
	position: absolute;
	display: grid;
	grid-template-columns: 1.2fr 3fr;
	grid-template-rows: repeat(1, 1fr);
	align-items: center;

	color: ${(props) => (props.color ? props.color : "darkturquoise")};
	left: ${(props) => (props.left ? props.left : "437px")};
	top: ${(props) => (props.top ? props.top : "23px")};
	z-index: 70;
	width: min-content;
	height: 38px;

	font-family: "Rubik";
	font-weight: 700;
	font-size: 1.3rem;

	background: black;
	border-radius: 20px;
	transform-style: preserve-3d;
	transform: perspective(54em) rotateX(30deg);
	padding-right: 8px;
	padding-left: 8px;
`;

export const BetIconMirror = styled.div`
	position: absolute;
	display: grid;
	grid-template-columns: 3fr 1.2fr;
	grid-template-rows: repeat(1, 1fr);
	align-items: center;

	color: ${(props) => (props.color ? props.color : "darkturquoise")};
	left: ${(props) => (props.left ? props.left : "437px")};
	top: ${(props) => (props.top ? props.top : "23px")};
	z-index: 70;
	width: min-content;
	height: 38px;

	font-family: "Rubik";
	font-weight: 700;
	font-size: 1.3rem;

	background: black;
	border-radius: 20px;
	transform-style: preserve-3d;
	transform: perspective(54em) rotateX(30deg);
	padding-right: 8px;
	padding-left: 8px;
`;

export const TableBg = styled.div`
	position: relative;
	grid-area: 1 / 6 / -1 / -6;
	width: 100%;
	height: 100%;

	background: url("${(props) =>
		props.pokerVariant == "Texas" && props.betLimit == "Limit"
			? TableGreen
			: props.pokerVariant == "Texas" && props.betLimit == "Pot Limit"
			? TableBlue
			: props.pokerVariant == "Texas" && props.betLimit == "No Limit"
			? TableRed
			: props.pokerVariant == "Omaha" && props.betLimit == "Limit"
			? TableGreen
			: props.pokerVariant == "Omaha" && props.betLimit == "Pot Limit"
			? TableBlue
			: TableRed}");

	background-repeat: no-repeat;
	background-position: center center;
	background-size: contain;

	transform-style: preserve-3d;
	transform: perspective(54em) rotateX(30deg);
`;

export const VideoArea = styled.div`
	position: relative;
	grid-row: 4 / 7;
	grid-column: 32 / 38;
	width: 100%;
	height: 100%;
	z-index: 1;
`;

export const WaterMark = styled.div`
	grid-row: 10 / 12;
	grid-column: 12 / 30;
	width: 100%;
	height: 100%;

	background: url(${WaterMarkImg});
	background-repeat: no-repeat;
	background-position: center center;
	background-size: cover;
	scale: 0.765;
	opacity: 0.5;
	transform-style: preserve-3d;
	transform: perspective(54em) rotateX(15deg);
`;
export const GameName = styled.div`
	position: absolute;
	top: 0%;
	left: 42%;
	width: 300px;
	height: 70px;

	background: url("${(props) =>
		props.pokerVariant == "Texas" && props.betLimit == "Limit"
			? TexasLimitImg
			: props.pokerVariant == "Texas" && props.betLimit == "Pot Limit"
			? TexasPotLimitImg
			: props.pokerVariant == "Texas" && props.betLimit == "No Limit"
			? TexasNoLimitImg
			: props.pokerVariant == "Omaha" && props.betLimit == "Limit"
			? OmahaLimitImg
			: props.pokerVariant == "Omaha" && props.betLimit == "Pot Limit"
			? OmahaPotLimitImg
			: OmahaNoLimitImg}");
	background-repeat: no-repeat;
	background-position: center center;
	background-size: contain;
	scale: 4;
	margin-top: ${(props) =>
		props.pokerVariant == "Texas" && props.betLimit == "Limit"
			? "54px"
			: props.pokerVariant == "Texas" && props.betLimit == "Pot Limit"
			? "28px"
			: props.pokerVariant == "Texas" && props.betLimit == "No Limit"
			? "28px"
			: props.pokerVariant == "Omaha" && props.betLimit == "Limit"
			? "44px"
			: props.pokerVariant == "Omaha" && props.betLimit == "Pot Limit"
			? "44px"
			: "44px"};
`;
export const TableDealer = styled.div`
	grid-row: 4 / 8;
	grid-column: 18 / 24;
	width: 100%;
	height: 100%;

	background: url(${tableDealerImage});
	background-repeat: no-repeat;
	background-position: center center;
	background-size: contain;
	scale: 2.2;
	opacity: 1;
	margin-top: 64px;
	z-index: 100;
`;

export const Logo = styled.div`
	grid-row: 12 / 14;
	grid-column: 8 / 33;
	width: 100%;
	height: 100%;

	background: url(${LogoImg});
	background-repeat: no-repeat;
	background-position: center center;
	background-size: cover;
	scale: 0.85;
	margin-left: 15px;
	opacity: 0.9;
`;

export const SidePotsArea = styled.div`
	grid-row: 16 / 17;
	grid-column: 13 / 30;
	width: 100%;
	height: 100%;
	z-index: 120;
`;
export const BetContainer = styled.div`
	box-sizing: border-box;

	position: absolute;
	width: 100px;
	height: 75px;
	left: ${(props) => (props.left ? props.left : "12px")};
	top: ${(props) => (props.top ? props.top : "502px")};

	background: url(${PlateImg});
	background-repeat: no-repeat;
	background-position: center center;
	background-size: contain;
`;

export const BetAmount = styled.span`
	width: 94px;
	position: absolute;
	font-family: "Roboto";
	font-weight: bolder;
	font-size: 1.5rem;
	opacity: 1;
	text-align: center;
	padding-top: 20px;
	color: black;

	left: ${(props) => (props.left ? props.left : "0px")};
	top: ${(props) => (props.top ? props.top : "0px")};
`;

export const Player1Area = styled.div`
	position: relative;
	top: 0;
	left: -40px;
	z-index: 100;
	grid-row: 5 / 8;
	grid-column: -5 / -14;
	margin-right: 60%;

	background-image: ${(props) =>
		props.turn
			? `url(${playerGlow}), url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`
			: `url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`};
	background-repeat: no-repeat;
	background-size: contain;
	background-position: top;

	transform: ${(props) =>
		props.gameStatus.includes("LOST")
			? "scale(1)"
			: props.gameStatus.includes("WIN")
			? "scale(1.1)"
			: props.gameStatus.includes("FOLD")
			? "scale(.9)"
			: "scale(1)"};

	opacity: ${(props) =>
		props.gameStatus.includes("LOST")
			? "1.0"
			: props.gameStatus.includes("OUT")
			? "0.0"
			: props.gameStatus.includes("FOLD")
			? "0.5"
			: "1.0"};
`;

export const Player6Area = styled.div`
	position: relative;
	z-index: 100;
	grid-row: 16 / 19;
	grid-column: 1 / 10;
	left: -10px;
	margin-right: -54%;

	background-image: ${(props) =>
		props.turn
			? `url(${playerGlow}), url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`
			: `url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`};
	background-repeat: no-repeat;
	background-size: contain;
	background-position: top;

	transform: ${(props) =>
		props.gameStatus.includes("LOST")
			? "scale(1)"
			: props.gameStatus.includes("WIN")
			? "scale(1.1)"
			: props.gameStatus.includes("FOLD")
			? "scale(.9)"
			: "scale(1)"};

	opacity: ${(props) =>
		props.gameStatus.includes("LOST")
			? "1.0"
			: props.gameStatus.includes("OUT")
			? "0.0"
			: props.gameStatus.includes("FOLD")
			? "0.5"
			: "1.0"};
`;

export const Player3Area = styled.div`
	position: relative;
	z-index: 100;
	grid-row: 16 / 19;
	grid-column: -1 / -10;
	left: 10px;

	margin-right: 60%;
	background-image: ${(props) =>
		props.turn
			? `url(${playerGlow}), url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`
			: `url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`};
	background-repeat: no-repeat;
	background-size: contain;
	background-position: top;

	transform: ${(props) =>
		props.gameStatus.includes("LOST")
			? "scale(1)"
			: props.gameStatus.includes("WIN")
			? "scale(1.1)"
			: props.gameStatus.includes("FOLD")
			? "scale(.9)"
			: "scale(1)"};

	opacity: ${(props) =>
		props.gameStatus.includes("LOST")
			? "1.0"
			: props.gameStatus.includes("OUT")
			? "0.0"
			: props.gameStatus.includes("FOLD")
			? "0.5"
			: "1.0"};
`;

export const Player2Area = styled.div`
	position: relative;
	z-index: 100;
	grid-row: 10 / 13;
	grid-column: -1 / -10;

	margin-right: 60%;

	background-image: ${(props) =>
		props.turn
			? `url(${playerGlow}), url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`
			: `url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`};
	background-repeat: no-repeat;
	background-size: contain;
	background-position: top;

	transform: ${(props) =>
		props.gameStatus.includes("LOST")
			? "scale(1)"
			: props.gameStatus.includes("WIN")
			? "scale(1.1)"
			: props.gameStatus.includes("FOLD")
			? "scale(.9)"
			: "scale(1)"};

	opacity: ${(props) =>
		props.gameStatus.includes("LOST")
			? "1.0"
			: props.gameStatus.includes("OUT")
			? "0.0"
			: props.gameStatus.includes("FOLD")
			? "0.5"
			: "1.0"};
`;

export const Player7Area = styled.div`
	position: relative;
	z-index: 100;
	grid-row: 10 / 13;
	grid-column: 1 / 10;
	margin-right: -54%;

	background-image: ${(props) =>
		props.turn
			? `url(${playerGlow}), url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`
			: `url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`};
	background-repeat: no-repeat;
	background-size: contain;
	background-position: top;

	transform: ${(props) =>
		props.gameStatus.includes("LOST")
			? "scale(1)"
			: props.gameStatus.includes("WIN")
			? "scale(1.1)"
			: props.gameStatus.includes("FOLD")
			? "scale(.9)"
			: "scale(1)"};

	opacity: ${(props) =>
		props.gameStatus.includes("LOST")
			? "1.0"
			: props.gameStatus.includes("OUT")
			? "0.0"
			: props.gameStatus.includes("FOLD")
			? "0.5"
			: "1.0"};
`;

export const Player8Area = styled.div`
	position: relative;
	top: 0;
	left: 40px;
	z-index: 100;
	grid-row: 5 / 8;
	grid-column: 5 / 14;
	margin-right: -54%;

	background-image: ${(props) =>
		props.turn
			? `url(${playerGlow}), url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`
			: `url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`};
	background-repeat: no-repeat;
	background-size: contain;
	background-position: top;

	transform: ${(props) =>
		props.gameStatus.includes("LOST")
			? "scale(1)"
			: props.gameStatus.includes("WIN")
			? "scale(1.1)"
			: props.gameStatus.includes("FOLD")
			? "scale(.9)"
			: "scale(1)"};

	opacity: ${(props) =>
		props.gameStatus.includes("LOST")
			? "1.0"
			: props.gameStatus.includes("OUT")
			? "0.0"
			: props.gameStatus.includes("FOLD")
			? "0.5"
			: "1.0"};
`;

export const Player4Area = styled.div`
	position: relative;
	z-index: 100;
	grid-row: 20 / 23;
	grid-column: 23 / 32;
	margin-right: 60%;

	background-image: ${(props) =>
		props.turn
			? `url(${playerGlow}), url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`
			: `url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`};
	background-repeat: no-repeat;
	background-size: contain;
	background-position: top;

	transform: ${(props) =>
		props.gameStatus.includes("LOST")
			? "scale(1)"
			: props.gameStatus.includes("WIN")
			? "scale(1.1)"
			: props.gameStatus.includes("FOLD")
			? "scale(.9)"
			: "scale(1)"};

	opacity: ${(props) =>
		props.gameStatus.includes("LOST")
			? "1.0"
			: props.gameStatus.includes("OUT")
			? "0.0"
			: props.gameStatus.includes("FOLD")
			? "0.5"
			: "1.0"};
`;

export const Player5Area = styled.div`
	position: relative;
	z-index: 100;
	grid-row: 20 / 23;
	grid-column: 10 / 19;
	margin-right: -54%;

	background-image: ${(props) =>
		props.turn
			? `url(${playerGlow}), url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`
			: `url(${playerImg3}), url(${playerImg2}), url(${playerImg1})`};
	background-repeat: no-repeat;
	background-size: contain;
	background-position: top;

	transform: ${(props) =>
		props.gameStatus.includes("LOST")
			? "scale(1)"
			: props.gameStatus.includes("WIN")
			? "scale(1.1)"
			: props.gameStatus.includes("FOLD")
			? "scale(.9)"
			: "scale(1)"};

	opacity: ${(props) =>
		props.gameStatus.includes("LOST")
			? "1.0"
			: props.gameStatus.includes("OUT")
			? "0.0"
			: props.gameStatus.includes("FOLD")
			? "0.5"
			: "1"};
`;

export const AllInBtn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 8px 16px;

	position: absolute;
	width: 200px;
	height: 60px;
	left: 380px;
	top: 1040px;

	background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.94) 0%,
			rgba(255, 255, 255, 0.24) 52.08%,
			rgba(255, 255, 255, 0) 52.09%,
			rgba(255, 255, 255, 0.29) 100%
		),
		linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(255, 255, 255, 0) 51.56%
		),
		#00c700;
	background-blend-mode: soft-light, normal, normal;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
		inset 0px -2px 6px rgba(44, 0, 0, 0.05);
	border-radius: 32px;
`;

export const FoldBtn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 8px 16px;

	position: absolute;
	width: 200px;
	height: 60px;
	left: 600px;
	top: 1040px;

	background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.94) 0%,
			rgba(255, 255, 255, 0.24) 52.08%,
			rgba(255, 255, 255, 0) 52.09%,
			rgba(255, 255, 255, 0.29) 100%
		),
		linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(255, 255, 255, 0) 51.56%
		),
		#cf3c3c;
	background-blend-mode: soft-light, normal, normal;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
		inset 0px -2px 6px rgba(44, 0, 0, 0.05);
	border-radius: 32px;
`;

export const CheckBtn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 8px 16px;

	position: absolute;
	width: 200px;
	height: 60px;
	left: 820px;
	top: 1040px;

	background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.94) 0%,
			rgba(255, 255, 255, 0.24) 52.08%,
			rgba(255, 255, 255, 0) 52.09%,
			rgba(255, 255, 255, 0.29) 100%
		),
		linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(255, 255, 255, 0) 51.56%
		),
		#42c740;
	background-blend-mode: soft-light, normal, normal;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
		inset 0px -2px 6px rgba(44, 0, 0, 0.05);
	border-radius: 32px;
`;

export const RaiseBtn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 8px 16px;

	position: absolute;
	width: 200px;
	height: 60px;
	left: 1040px;
	top: 1040px;

	background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.94) 0%,
			rgba(255, 255, 255, 0.24) 52.08%,
			rgba(255, 255, 255, 0) 52.09%,
			rgba(255, 255, 255, 0.29) 100%
		),
		linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(255, 255, 255, 0) 51.56%
		),
		#cf683c;
	background-blend-mode: soft-light, normal, normal;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
		inset 0px -2px 6px rgba(44, 0, 0, 0.05);
	border-radius: 32px;
`;

export const BetBtn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 8px 16px;

	position: absolute;
	width: 200px;
	height: 60px;
	left: 1260px;
	top: 1040px;

	background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.94) 0%,
			rgba(255, 255, 255, 0.24) 52.08%,
			rgba(255, 255, 255, 0) 52.09%,
			rgba(255, 255, 255, 0.29) 100%
		),
		linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(255, 255, 255, 0) 51.56%
		),
		#42c740;
	background-blend-mode: soft-light, normal, normal;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
		inset 0px -2px 6px rgba(44, 0, 0, 0.05);
	border-radius: 32px;
`;

export const CallBtn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 8px 16px;

	position: absolute;
	width: 200px;
	height: 60px;
	left: 1480px;
	top: 1040px;

	background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.94) 0%,
			rgba(255, 255, 255, 0.24) 52.08%,
			rgba(255, 255, 255, 0) 52.09%,
			rgba(255, 255, 255, 0.29) 100%
		),
		linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(255, 255, 255, 0) 51.56%
		),
		#42c740;
	background-blend-mode: soft-light, normal, normal;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
		inset 0px -2px 6px rgba(44, 0, 0, 0.05);
	border-radius: 32px;
`;

export const BtnTxtAmount = styled.span`
	width: 100px;
	height: 33px;

	font-family: "Acme";
	font-style: normal;
	font-weight: 400;
	font-size: 24px;
	line-height: 110%;
	/* identical to box height, or 33px */

	text-align: center;

	color: #ffffff;

	/* Inside auto layout */

	flex: none;
	order: 1;
	flex-grow: 0;
`;

export const BtnTxt = styled.span`
	width: 75px;
	height: 25px;

	font-family: "Acme";
	font-style: normal;
	font-weight: 400;
	font-size: 28px;
	line-height: 43px;
	/* identical to box height */

	display: flex;
	align-items: center;
	text-align: center;

	color: #161313;

	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 0;
`;

export const Dealer = styled.div`
	width: 50px;
	height: 50px;
	scale: 1;

	background: url(${dealerImage});
	background-repeat: no-repeat;
	background-position: center center;
	background-size: contain;

	position: absolute;
	z-index: 110;
	left: ${(props) => (props.left ? props.left : "0px")};
	top: ${(props) => (props.top ? props.top : "0px")};
`;

export const BigBet = styled.div`
	width: 70px;
	height: 70px;
	scale: 1;

	background: url(${bigBetImage});
	background-repeat: no-repeat;
	background-position: center center;
	background-size: contain;

	position: absolute;
	z-index: 120;
	left: ${(props) => (props.left ? props.left : "0px")};
	top: ${(props) => (props.top ? props.top : "0px")};
`;

export const SmallBet = styled.div`
	width: 70px;
	height: 70px;
	scale: 1;

	background: url(${smallBetImage});
	background-repeat: no-repeat;
	background-position: center center;
	background-size: contain;

	position: absolute;
	z-index: 120;
	left: ${(props) => (props.left ? props.left : "0px")};
	top: ${(props) => (props.top ? props.top : "0px")};
`;
