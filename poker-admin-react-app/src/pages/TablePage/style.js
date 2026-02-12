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

import Background from "../../assets/images/table/V2/Room.png";
import Table from "../../assets/images/Table.png";
import TableGreen from "../../assets/images/table/V2/TableGreen.png";
import TableBlue from "../../assets/images/table/V2/TableBlue.png";
import TableRed from "../../assets/images/table/V2/TableRed.png";

import TexasLimitImg from "../../assets/images/table/V2/TexasLimit.png";
import TexasPotLimitImg from "../../assets/images/table/V2/TexasPotLimit.png";
import TexasNoLimitImg from "../../assets/images/table/V2/TexasNoLimit.png";

import OmahaLimitImg from "../../assets/images/table/V2/OmahaLimit.png";
import OmahaPotLimitImg from "../../assets/images/table/V2/OmahaPotLimit.png";
import OmahaNoLimitImg from "../../assets/images/table/V2/OmahaNoLimit.png";

import player1Img from "../../assets/images/Player1.png";
import player2Img from "../../assets/images/Player2.png";
import player3Img from "../../assets/images/Player3.png";
import player4Img from "../../assets/images/Player4.png";
import player5Img from "../../assets/images/Player5.png";
import player6Img from "../../assets/images/Player6.png";
import player7Img from "../../assets/images/Player7.png";
import player8Img from "../../assets/images/Player8.png";
import { Tab } from "@chakra-ui/react";

export const Container = styled.div`
  width: 1920px;
  height: 1200px;

  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;

  display: grid;
  grid-template-columns: repeat(40, 40px);
  grid-template-rows: repeat(25, 48px);
  padding-left: 4%;
  padding-top: 1%;
`;

export const TableBg = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;

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
  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  transform: rotate(180deg);
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

export const SidePotsArea = styled.div`
  grid-area: 9 / 10 / 12 / 33;
  width: 100%;
  height: 100%;
  z-index: 120;
  padding-top: 40px;
  padding-left: 20px;
`;

export const Player1Area = styled.div`
  grid-row: 16 / 21;
  grid-column: 6 / 15;
  position: relative;
  background-color: rgba(0, 0, 110, 0.4);
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) =>
    props.gameStatus.includes("LOST")
      ? "scale(.8)"
      : props.gameStatus.includes("WIN")
      ? "scale(1.2)"
      : props.gameStatus.includes("FOLD")
      ? "scale(.8)"
      : "scale(.8)"};
  opacity: ${(props) =>
    props.gameStatus.includes("OUT")
      ? "0.3"
      : props.gameStatus.includes("FOLD")
      ? "0.3"
      : "1.0"};
`;

export const Player1Header = styled.div`
  width: 210px;
  height: 61px;

  background: url(${player1Img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 0px;
  left: 30px;
  z-index: 100;
  ${"" /* transform: rotate(180deg); */}
`;

export const Player8Area = styled.div`
  grid-row: 16 / 21;
  grid-column: -6 / -15;
  position: relative;
  background-color: rgba(0, 0, 110, 0.4);
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) =>
    props.gameStatus.includes("LOST")
      ? "scale(.8)"
      : props.gameStatus.includes("WIN")
      ? "scale(1.2)"
      : props.gameStatus.includes("FOLD")
      ? "scale(.8)"
      : "scale(.8)"};

  opacity: ${(props) =>
    props.gameStatus.includes("OUT")
      ? "0.3"
      : props.gameStatus.includes("FOLD")
      ? "0.3"
      : "1.0"};
`;

export const Player8Header = styled.div`
  width: 210px;
  height: 61px;
  background: url(${player8Img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 0px;
  left: 148px;
  z-index: 100;
  ${"" /* transform: rotate(180deg); */}
`;

export const Player2Area = styled.div`
  grid-row: 10 / 15;
  grid-column: 1 / 9;
  position: relative;
  background-color: rgba(0, 0, 110, 0.4);
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) =>
    props.gameStatus.includes("LOST")
      ? "scale(.8)"
      : props.gameStatus.includes("WIN")
      ? "scale(1.2)"
      : props.gameStatus.includes("FOLD")
      ? "scale(.8)"
      : "scale(.8)"};

  opacity: ${(props) =>
    props.gameStatus.includes("OUT")
      ? "0.3"
      : props.gameStatus.includes("FOLD")
      ? "0.3"
      : "1.0"};
  top: 36%;
  left: 0%;
`;

export const Player2Header = styled.div`
  width: 210px;
  height: 61px;
  background: url(${player2Img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 0px;
  left: 30px;
  z-index: 100;
`;

export const Player7Area = styled.div`
  grid-row: 10 / 15;
  grid-column: -1 / -9;
  position: relative;
  background-color: rgba(0, 0, 110, 0.4);
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) =>
    props.gameStatus.includes("LOST")
      ? "scale(.8)"
      : props.gameStatus.includes("WIN")
      ? "scale(1.2)"
      : props.gameStatus.includes("FOLD")
      ? "scale(.8)"
      : "scale(.8)"};

  opacity: ${(props) =>
    props.gameStatus.includes("OUT")
      ? "0.3"
      : props.gameStatus.includes("FOLD")
      ? "0.3"
      : "1.0"};
  top: 36%;
  left: 0%;
`;

export const Player7Header = styled.div`
  width: 210px;
  height: 61px;
  background: url(${player7Img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 0px;
  left: 148px;
  z-index: 100;
`;

export const Player3Area = styled.div`
  grid-row: 3 / 8;
  grid-column: 2 / 11;
  position: relative;
  background-color: rgba(0, 0, 110, 0.4);
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) =>
    props.gameStatus.includes("LOST")
      ? "scale(.8)"
      : props.gameStatus.includes("WIN")
      ? "scale(1.2)"
      : props.gameStatus.includes("FOLD")
      ? "scale(.8)"
      : "scale(.8)"};

  opacity: ${(props) =>
    props.gameStatus.includes("OUT")
      ? "0.3"
      : props.gameStatus.includes("FOLD")
      ? "0.3"
      : "1.0"};

  top: 60%;
  left: 0%;
`;

export const Player3Header = styled.div`
  width: 210px;
  height: 61px;
  background: url(${player3Img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 0px;
  left: 30px;
  z-index: 100;
`;

export const Player6Area = styled.div`
  grid-row: 3 / 8;
  grid-column: -2 / -11;
  position: relative;
  background-color: rgba(0, 0, 110, 0.4);
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) =>
    props.gameStatus.includes("LOST")
      ? "scale(.8)"
      : props.gameStatus.includes("WIN")
      ? "scale(1.2)"
      : props.gameStatus.includes("FOLD")
      ? "scale(.8)"
      : "scale(.8)"};

  opacity: ${(props) =>
    props.gameStatus.includes("OUT")
      ? "0.3"
      : props.gameStatus.includes("FOLD")
      ? "0.3"
      : "1.0"};

  top: 60%;
  left: 0%;
`;

export const Player6Header = styled.div`
  width: 210px;
  height: 61px;
  background: url(${player6Img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 0px;
  left: 148px;
  z-index: 100;
`;

export const Player4Area = styled.div`
  grid-row: 2 / 7;
  grid-column: 12 / 21;
  position: relative;
  background-color: rgba(0, 0, 110, 0.4);
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) =>
    props.gameStatus.includes("LOST")
      ? "scale(.8)"
      : props.gameStatus.includes("WIN")
      ? "scale(1.2)"
      : props.gameStatus.includes("FOLD")
      ? "scale(.8)"
      : "scale(.8)"};

  opacity: ${(props) =>
    props.gameStatus.includes("OUT")
      ? "0.3"
      : props.gameStatus.includes("FOLD")
      ? "0.3"
      : "1.0"};
  top: 29%;
`;

export const Player4Header = styled.div`
  width: 210px;
  height: 61px;
  background: url(${player4Img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 0px;
  left: 80px;
  z-index: 100;
`;

export const Player5Area = styled.div`
  grid-row: 2 / 7;
  grid-column: 22 / 31;
  position: relative;
  background-color: rgba(0, 0, 110, 0.4);
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) =>
    props.gameStatus.includes("LOST")
      ? "scale(.8)"
      : props.gameStatus.includes("WIN")
      ? "scale(1.2)"
      : props.gameStatus.includes("FOLD")
      ? "scale(.8)"
      : "scale(.8)"};

  opacity: ${(props) =>
    props.gameStatus.includes("OUT")
      ? "0.3"
      : props.gameStatus.includes("FOLD")
      ? "0.3"
      : "1.0"};
  top: 29%;
`;

export const Player5Header = styled.div`
  width: 210px;
  height: 61px;
  background: url(${player5Img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 0px;
  left: 148px;
  z-index: 100;
`;

export const AllInBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 60px;
  left: 18px;
  top: 1080px;

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
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 60px;
  left: 320px;
  top: 1080px;

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
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 60px;
  left: 1170px;
  top: 1080px;

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
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 60px;
  left: 860px;
  top: 1080px;

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
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 60px;
  left: 860px;
  top: 1080px;

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
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 60px;
  left: 1170px;
  top: 1080px;

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

export const RaiseSliderArea = styled.div`
  grid-row: 22 / 23;
  grid-column: 21 / 29;
`;
