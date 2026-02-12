import { css } from "@emotion/react";
import styled from "@emotion/styled";

import bgImage from "../../../assets/images/Background.png";
// import tableImage from "../../../assets/images/Table.png";
import tableImage from "../../../assets/images/Table_BG.png";
import playerImage from "../../../assets/images/Player.png";

import balanceImage from "../../../assets/images/balance.png";
import statusImage from "../../../assets/images/balance.png";
import roundBetsImage from "../../../assets/images/roundBets.png";
import cardImage from "../../../assets/images/v48_3631.png";
// import dealerImage from '../../../assets/images/Dealer.png'
import dealerImage from "../../../assets/images/dealer.png";
import bigBetImage from "../../../assets/images/bb.png";
import smallBetImage from "../../../assets/images/smb.png";
import glowImage from "../../../assets/images/glow.png";
import potImage from "../../../assets/images/pot.png";
import potMeterImage from "../../../assets/images/mainPotMeter.png";

import player1Img from "../../../assets/images/Player1.png";
import player2Img from "../../../assets/images/Player2.png";
import player3Img from "../../../assets/images/Player3.png";
import player4Img from "../../../assets/images/Player4.png";
import player5Img from "../../../assets/images/Player5.png";
import player6Img from "../../../assets/images/Player6.png";
import player7Img from "../../../assets/images/Player7.png";
import player8Img from "../../../assets/images/Player8.png";

export const Container = styled.div`
  width: 1920px;
  height: 1200px;
  position: relative;
  overflow: hidden;

  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;

  display:grid;
  grid-template-columns: repeat(40,48px);
  grid-template-rows: repeat(29,42px);

`;

export const TableBg = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;

  width: 100%;
  height: 146%;
  background: url(${tableImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;






export const Balance = styled.div`
  width: 156px;
  height: 60px;
  background: url(${balanceImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: relative;
  top: 84px;
  left: 5px;
  z-index: 90;
`;

export const Dealer = styled.div`
  width: 100px;
  height: 90px;
  background: url(${dealerImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 17px;
  left: 235px;
  z-index: 90;
`;


export const SmallBet = styled.div`
  width: 70px;
  height: 70px;
  background: url(${smallBetImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 17px;
  left: 235px;
  z-index: 120;
`;

export const SmallBetMirror = styled.div`
  width: 70px;
  height: 70px;
  background: url(${smallBetImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 17px;
  left: 80px;
  z-index: 120;
`;

export const BigBet = styled.div`
  width: 70px;
  height: 70px;
  background: url(${bigBetImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 17px;
  left: 235px;
  z-index: 120;
`;

export const BigBetMirror = styled.div`
  width: 70px;
  height: 70px;
  background: url(${bigBetImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 17px;
  left: 80px;
  z-index: 120;
`;

export const BalanceAmount = styled.span`
  width: 142px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 24%;
  font-family: Croissant One;
  font-weight: Regular;
  font-size: 22px;
  opacity: 1;
  text-align: center;
`;

export const Status = styled.div`
  width: 156px;
  height: 60px;
  background: url(${statusImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 120px;
  left: 5px;
  z-index: 80;
`;

export const StatusMirror = styled.div`
  width: 156px;
  height: 60px;
  background: url(${statusImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 120px;
  left: 280px;
  z-index: 80;
`;

export const StatusStr = styled.span`
  width: 142px;
  color: lightcoral;
  position: absolute;
  top: 35%;
  font-family: "Gelasio";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 110%;
  text-align: center;
  color: #de8649;
`;

export const RoundBets = styled.div`
  width: 140px;
  height: 88px;
  background: url(${roundBetsImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 84px;
  left: 156px;
  z-index: 80;
`;

export const RoundBetsMirror = styled.div`
  width: 140px;
  height: 88px;
  background: url(${roundBetsImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 84px;
  left: 136px;
  z-index: 80;
`;

export const Round1Bet = styled.span`
  width: 142px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 10%;
  font-family: Croissant One;
  font-weight: Regular;
  font-size: 22px;
  opacity: 0.6;
  text-align: center;
`;

export const Round2Bet = styled.span`
  width: 142px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 35%;
  font-family: Croissant One;
  font-weight: Regular;
  font-size: 22px;
  opacity: 0.6;
  text-align: center;
`;

export const Round3Bet = styled.span`
  width: 142px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 60%;
  font-family: Croissant One;
  font-weight: Regular;
  font-size: 22px;
  opacity: 0.6;
  text-align: center;
`;

export const CurrentBetContainer = styled.div`
  width: 136px;
  height: 148px;
  opacity: 1;
  position: absolute;
  top: 84px;
  left: 156px;
  z-index: 80;
`;

export const CurrentBetContainerMirror = styled.div`
  width: 136px;
  height: 148px;
  opacity: 1;
  position: absolute;
  top: 84px;
  left: 136px;
  z-index: 80;
`;

export const CurrentBet = styled.div`
  width: 138px;
  height: 35px;
  background: url(${roundBetsImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 80;
`;

export const Card1 = styled.div`
  width: 62px;
  height: 92px;
  background: url(${cardImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 42px;
  left: 4px;
  z-index: 80;
`;

export const Card2 = styled.div`
  width: 62px;
  height: 92px;
  background: url(${cardImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 42px;
  left: 70px;
  z-index: 80;
`;

export const PlayerHeader = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;

  width: 210px;
  height: 61px;
  background: url(${playerImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  font-family: "Acme";
  font-style: normal;
  font-weight: 800;
  font-size: 33px;
  line-height: 43px;
  /* identical to box height */

  display: flex;
  align-items: center;
  justify-content: center;

  color: burlywood;
  text-transform: uppercase;


`;


export const ShowBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  width: 120px;
  height: 50px;
  left: 1146px;
    top: 874px;

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
    #40c7c7;
  background-blend-mode: soft-light, normal, normal;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    inset 0px -2px 6px rgba(44, 0, 0, 0.05);
  border-radius: 0px 0px 0px 0px;
`;

export const ShowBtnText = styled.span`
  font-family: "Acme";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;

  text-align: center;
`;


export const NewGameBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;

  position: absolute;
  width: 200px;
  height: 60px;
  left: 48px;
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
    #c706c7;
  background-blend-mode: soft-light, normal, normal;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    inset 0px -2px 6px rgba(44, 0, 0, 0.05);
  border-radius: 32px;
`;






export const AllInBtn = styled.div`
  
  grid-area: 27 / 35 / 28 / 37;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;

  position: absolute;
  width: 200px;
  height: 60px;
  ${'' /* left: 380px;
  top: 1040px; */}

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
    #c70000;
  background-blend-mode: soft-light, normal, normal;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    inset 0px -2px 6px rgba(44, 0, 0, 0.05);
  border-radius: 32px;
`;

export const FoldBtn = styled.div`
  grid-area: 27 / 13 / 28 / 16;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;

  position: absolute;
  width: 200px;
  height: 60px;
  ${'' /* left: 600px;
  top: 1040px; */}

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
  grid-area: 27 / 20 / 28 / 23;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;

  position: absolute;
  width: 200px;
  height: 60px;
  ${'' /* left: 820px;
  top: 1040px; */}

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
  grid-area: 27 / 28 / 28 / 32;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;

  position: absolute;
  width: 200px;
  height: 60px;
  ${'' /* left: 1040px;
  top: 1040px; */}

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
  grid-area: 27 / 28 / 28 / 32;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;

  position: absolute;
  width: 200px;
  height: 60px;
  ${'' /* left: 1260px;
  top: 1040px; */}

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

export const CallBtn = styled.div`
  grid-area: 27 / 20 / 28 / 23;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;

  position: absolute;
  width: 200px;
  height: 60px;
  ${'' /* left: 1480px;
  top: 1040px; */}

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
export const NewGameText = styled.span`
  width: 150px;
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

export const GameMessage = styled.div`
  grid-row: 15 / 16;
  grid-column: 12 / 30;

  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 110%;
  z-index: 110;
  /* or 36px */

  text-align: center;
  ${"" /* text-transform: lowercase; */}

  color: darkgray;
`;

export const TableHeader = styled.div`
  position: absolute;
  left: 41.51%;
  right: 39.17%;
  top: 0.37%;
  bottom: 93.89%;

  font-family: "Euphoria Script";
  font-style: normal;
  font-weight: 400;
  font-size: 56px;
  line-height: 110%;
  /* identical to box height, or 62px */

  text-align: center;

  color: #ff36;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`;


export const RaiseSliderArea = styled.div`
  grid-area: 26 / 26 / 27 / 35;

`


export const BetSliderArea = styled.div`
    grid-area: 26 / 26 / 27 / 35;


`