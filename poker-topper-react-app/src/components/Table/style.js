import styled from "@emotion/styled";

import BlindImage from "../../assets/images/BlindImage.png";
import RakeImage from "../../assets/images/RakeImage.png";
import potMeterImage from "../../assets/images/PotMain.png";

export const GameMessage = styled.div`
  position: relative;
  top: 375px;
  grid-row: 2/3;
  grid-column: 6/36;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 110%;
  z-index: 110;
  text-align: center;
  color: burlywood;
  padding-top: 30px;
`;

export const WinCelebrationArea = styled.div`
    position: relative;
    grid-row: 8/22;
    grid-column: 8/34;
    width: 100%;
    height: 100%;
    z-index: 1000;
    margin-top: 16px;
    left: -14px;
    top: -27px;
    transform-style: preserve-3d;
    transform: perspective(54em) rotateX(30deg);
` 
export const WinCardsArea = styled.div`
    position: relative;
    grid-row: 16/20;
    grid-column: 16/27;
    width: 100%;
    height: 100%;
    z-index: 1001;
    display: flex;
    direction: row;
    margin-top: -37%;
    left: -22px;
    top: 20px;
`
export const WinHand = styled.div`
  position: relative;
  grid-row: 16/18;
  grid-column: 15/27;
  width: 100%;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 3rem;
  opacity: 1;
  color: greenyellow;
  text-align: center;
  z-index: 1002;
  margin-top: 42px;
`
export const WinPlayer = styled.div`
  position: absolute;
  top: 60%;
  left: 45%;

  width: max-content;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 3rem;

  z-index: 100;
  display: flex;
  justify-content: center;

`
export const WinAmount = styled.div`
  position: relative;
  grid-row: 18/20;
  grid-column: 15/27;
  width: 100%;
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 2.5rem;
  opacity: 1;
  color: gold;
  text-align: center;
  z-index: 1002;
  margin-top: 12px;
`

export const MainPotMeterImage = styled.div`
  grid-row: 8/11;
  grid-column: 19/23;

  background: url(${potMeterImage});

  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  z-index: 110;
  scale: .7;
  margin-top: 27px;
  margin-left: -12px;
`;


export const WagerMeter = styled.span`
  grid-row: 9/11;
  grid-column: 20/22;
  font-family: 'Roboto';
  font-weight: 800;
  font-size: 17px;
  opacity: 1;
  color: bisque;
  text-align: center;
  z-index: 110;
  margin-left: -24px;
  margin-top: 30px;
`;


export const PotMeter = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(1,1fr);
  grid-row: 9/11;
  grid-column: 19/23;
  font-family: 'Roboto';
  font-weight: 800;
  font-size: 1.8rem;
  opacity: 1;
  color: white;
  text-align: center;
  z-index: 110;
  margin-top: 19px;
  margin-left: 6px;
  margin-bottom: 21px;
  background: black;
  border-radius: 20px;
  padding-left: 10px;
  transform-style: preserve-3d;
  transform: perspective(54em) rotateX(40deg);
`;

export const MainPotMeter = styled.span`
width: 195px;
height: 50px;
grid-row: 10 / 11;
grid-column: 19 / 23;

font-family: Croissant One;
font-weight: Regular;
font-size: 2rem;
line-height: 200%;
opacity: 1;
color: rgba(255, 255, 255, 1);
text-align: center;
z-index: 110;
`;

export const GameCardsContainer = styled.div`
  position: relative;
  grid-area: 2 / 6 / -1 / -6;
  width: 100%;
  height: 100%;

  z-index: 100;
  transform-style: preserve-3d;
  transform:
    perspective(54em)
    rotateX(30deg);
`


export const FlopCard1 = styled.div`
box-sizing: border-box;

position: absolute;
width: 80px;
height: 120px;
left: 652px;
top: 530px;

transform-style: preserve-3d;
transform:
  perspective(54em)
  rotateX(15deg);
`;

export const FlopCard2 = styled.div`
box-sizing: border-box;

position: absolute;
width: 80px;
height: 120px;
left: 772px;
top: 530px;

transform-style: preserve-3d;
transform:
  perspective(54em)
  rotateX(15deg);
`;

export const FlopCard3 = styled.div`
box-sizing: border-box;

position: absolute;
width: 80px;
height: 120px;
left: 892px;
top: 530px;

transform-style: preserve-3d;
transform:
  perspective(54em)
  rotateX(15deg);
`;

export const TurnCard = styled.div`
box-sizing: border-box;

position: absolute;
width: 80px;
height: 120px;
left: 1042px;
top: 530px;

transform-style: preserve-3d;
transform:
  perspective(54em)
  rotateX(15deg);
`;

export const RiverCard = styled.div`
box-sizing: border-box;

position: absolute;
width: 80px;
height: 120px;
left: 1192px;
top: 530px;

transform-style: preserve-3d;
transform:
  perspective(54em)
  rotateX(15deg);
`;



export const SidePotAmountText = styled.span`
  width: 170px;
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

export const SidePotsSeatsText = styled.span`
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







export const TableLimitsText = styled.span`
    grid-row: 2 / 5;
    grid-column: 18 / 24;

    background: url(${BlindImage});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    font-size: 2rem;
    font-family: 'Roboto';
    font-weight: 800;
    color: goldenrod;
    z-index: 110;
    padding-left: 107px;
    padding-top: 40px;
    scale: 0.8;

`;

export const RakeText = styled.span`
grid-row: 2 / 4;
grid-column: 4 / 10;
scale: .7;

background: url(${RakeImage});
background-repeat: no-repeat;
background-position: center center;
background-size: cover;

font-family: monospace;
font-weight: Regular;
font-size: 2rem;
line-height: 220%;
opacity: 1;
color: bisque;
text-align: center;
z-index: 110;
margin-top: 5px;
margin-bottom: 15px;
padding-left: 35px;
`;

export const GameTypeText = styled.span`
height: 50px;
grid-row: 1 / 2;
grid-column: 17 / 23;

font-family: Croissant One;
font-weight: Regular;
font-size: 2rem;
line-height: 150%;
opacity: 1;
color: fuchsia;
text-align: center;
z-index: 110;
`;




export const GameIdText = styled.span`
height: 50px;
grid-row: 1 / 2;
grid-column: 31 / 38;

font-family: Croissant One;
font-weight: Regular;
font-size: 2rem;
line-height: 150%;
opacity: 1;
color: fuchsia;
text-align: center;
z-index: 110;
`;
