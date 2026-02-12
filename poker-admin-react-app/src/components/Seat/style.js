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
import styled from "@emotion/styled";

import playerImg from "../../assets/images/playerImg.png";
import balanceImage from "../../assets/images/balance.png";
import statusImage from "../../assets/images/balance.png";
import roundBetsImage from "../../assets/images/roundBets.png";
import cardImage from "../../assets/images/v48_3631.png";
import dealerImage from "../../assets/images/DealerBtn.png";
import bigBetImage from "../../assets/images/bb.png";
import smallBetImage from "../../assets/images/smb.png";
import glowImage from "../../assets/images/glow.png";

export const PlayerHeader = styled.div`
  width: 240px;
  height: 61px;
  background: url(${playerImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 5px;
  left: 45px;
  z-index: 100;
  border-radius: 50%;
`;

export const PlayerNameStr = styled.span`
  width: 240px;
  color: rgb(255, 255, 255);
  position: absolute;
  font-family: "Rubik";
  font-size: 36px;
  opacity: 1;
  left: 50px;
  color: floralwhite;
`;

export const Status = styled.div`
  width: 380px;
  height: 60px;
  opacity: 1;
  position: absolute;
  top: 110px;
  text-align: center;
  padding-left: 5px;
  padding-top: 5px;
  z-index: 80;
`;

export const StatusMirror = styled.div`
  width: 380px;
  height: 60px;
  opacity: 1;
  position: absolute;
  top: 110px;
  text-align: center;
  padding-left: 5px;
  padding-top: 5px;
  z-index: 80;
`;

export const StatusStr = styled.span`
  width: 100%;
  color: lightcoral;
  font-family: "Gelasio";
  font-style: normal;
  font-weight: ${(props) =>
    props.gameStatus.includes("WIN")
      ? 800
      : props.gameStatus.includes("RAISE" | "BET")
      ? 800
      : 800};
  font-size: ${(props) =>
    props.gameStatus.includes("WIN")
      ? "30px"
      : props.gameStatus.includes("RAISE" | "BET")
      ? "30px"
      : "30px"};
  line-height: 160%;
  text-align: center;
  color: ${(props) =>
    props.gameStatus.includes("LOST")
      ? "orangered"
      : props.gameStatus.includes("WIN")
      ? "greenyellow"
      : props.gameStatus.includes("RAISE" | "BET")
      ? "orange"
      : props.gameStatus.includes("FOLD")
      ? "white"
      : "yellow"};
`;

export const Balance = styled.div`
  width: 186px;
  height: 60px;
  opacity: 1;
  position: relative;
  text-align: center;
  top: 65px;
  z-index: 90;
`;

export const BalanceMirror = styled.div`
  width: 186px;
  height: 60px;
  opacity: 1;
  position: relative;
  top: 65px;
  text-align: center;
  z-index: 90;
`;

export const BalanceAmount = styled.span`
  width: 192px;
  position: absolute;
  font-family: "Rubik";
  font-size: 40px;
  opacity: 1;
  padding-left: 5px;
  color: greenyellow;
`;

export const CurrentBetContainer = styled.div`
  width: 170px;
  height: 35px;
  opacity: 1;
  position: absolute;
  top: 84px;
  left: 300px;
  z-index: 80;
`;

export const CurrentBetContainerMirror = styled.div`
  width: 170px;
  height: 35px;
  opacity: 1;
  position: absolute;
  top: 84px;
  left: 5px;
  z-index: 80;
`;

export const CurrentBetAmount = styled.span`
  width: 142px;
  color: rgb(255, 255, 255);
  position: absolute;
  font-family: "Rubik";
  font-size: 30px;
  opacity: 1;
  text-align: left;
  padding-left: 5px;
  color: aqua;
`;

export const CurrentBet = styled.div`
  width: 170px;
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

export const HandContainer = styled.div`
  width: 170px;
  height: 125px;
  opacity: 1;
  position: absolute;
  top: 155px;
  left: 105px;
  z-index: 80;
`;

export const HandContainerMirror = styled.div`
  width: 170px;
  height: 35px;
  opacity: 1;
  position: absolute;
  top: 155px;
  left: 105px;
  z-index: 80;
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

export const CardBack = styled.div`
  width: 62px;
  height: 92px;
  background: url(${cardImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  opacity: 1;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  z-index: 80;
`;

export const Card1 = styled.div`
  width: 62px;
  height: 92px;
  background: url(${cardImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  opacity: 1;
  position: absolute;
  top: 0px;
  left: 4px;
  z-index: 80;
`;

export const Card2 = styled.div`
  width: 62px;
  height: 92px;
  background: url(${cardImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  opacity: 1;
  position: absolute;
  top: 0px;
  left: 70px;
  z-index: 80;
`;

export const Dealer = styled.div`
  width: 70px;
  height: 70px;
  background: url(${dealerImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 35px;
  left: 45px;
  z-index: 110;
`;

export const DealerMirror = styled.div`
  width: 70px;
  height: 70px;
  background: url(${dealerImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 35px;
  left: 45px;
  z-index: 110;
`;

export const Turn = styled.div`
  width: 485px;
  height: 379px;
  background: url(${glowImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: -47px;
  left: -43px;
  z-index: 70;
`;

export const TurnMirror = styled.div`
  width: 485px;
  height: 379px;
  background: url(${glowImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: -47px;
  left: 15px;
  z-index: 70;
`;
