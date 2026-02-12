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

import potImage from "../../assets/images/pot.png";
import potMeterImage from "../../assets/images/mainPotMeter.png";

export const TableLimitsText = styled.span`
  height: 50px;
  grid-row: 1 / 2;
  grid-column: 6 / 16;

  font-family: Croissant One;
  font-weight: Regular;
  font-size: 30px;
  line-height: 150%;
  opacity: 1;
  color: fuchsia;
  text-align: center;
  z-index: 110;
`;

export const GameTypeText = styled.span`
  height: 50px;
  grid-row: 1 / 2;
  grid-column: 17 / 23;

  font-family: Croissant One;
  font-weight: Regular;
  font-size: 30px;
  line-height: 150%;
  opacity: 1;
  color: fuchsia;
  text-align: center;
  z-index: 110;
`;

export const RakeText = styled.span`
  height: 50px;
  grid-row: 1 / 2;
  grid-column: 24 / 32;

  font-family: Croissant One;
  font-weight: Regular;
  font-size: 30px;
  line-height: 150%;
  opacity: 1;
  color: fuchsia;
  text-align: center;
  z-index: 110;
`;

export const GameIdText = styled.span`
  height: 50px;
  grid-row: 1 / 2;
  grid-column: 33 / 38;

  font-family: Croissant One;
  font-weight: Regular;
  font-size: 30px;
  line-height: 150%;
  opacity: 1;
  color: fuchsia;
  text-align: center;
  z-index: 110;
`;

export const ElectionBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 60px;
  left: 1690px;
  top: 70px;

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

export const NewGameBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 120px;
  left: 1690px;
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

export const DrawCardBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 120px;
  left: 1690px;
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

export const GreenBtn = styled.div`
  position: absolute;
  width: 200px;
  height: 120px;
  cursor: pointer;
  border-radius: 32px;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  left: ${(props) => props.left};
  top: ${(props) => props.top};

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
`;

export const BlueBtn = styled.div`
  position: absolute;
  width: 200px;
  height: 120px;
  cursor: pointer;
  border-radius: 32px;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  left: ${(props) => props.left};
  top: ${(props) => props.top};

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
    #06d;
  background-blend-mode: soft-light, normal, normal;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    inset 0px -2px 6px rgba(44, 0, 0, 0.05);
`;

export const RedBtn = styled.div`
  position: absolute;
  width: 200px;
  height: 120px;
  cursor: pointer;
  border-radius: 32px;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  left: ${(props) => props.left};
  top: ${(props) => props.top};

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
`;

export const ButtonText = styled.span`
  width: max-content;

  font-family: "Rubik";
  font-weight: 600;
  font-size: 30px;
  color: ${(props) => (props.color ? props.color : "darkgreen")};
`;

export const SkipElectionBtn = styled.div`
  position: absolute;
  left: 1690px;
  top: 1040px;
  cursor: pointer;

  width: 200px;
  height: 120px;
  border-radius: 32px;
  padding-top: 2%;
  text-align: center;

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
`;

export const SkipElectionText = styled.span`
  width: max-content;

  font-family: fantasy;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  color: darkgreen;
`;

export const ReElectionBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 60px;
  left: 1690px;
  top: 190px;

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
    #4066c7;
  background-blend-mode: soft-light, normal, normal;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    inset 0px -2px 6px rgba(44, 0, 0, 0.05);
  border-radius: 32px;
`;

export const CashInBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 60px;
  left: 48px;
  top: 1100px;

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

export const CashOutBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 60px;
  left: 48px;
  top: 970px;

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

export const CancelGameBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 60px;
  left: 1690px;
  top: 70px;

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

export const ContinueBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  position: absolute;
  width: 200px;
  height: 60px;
  left: 1690px;
  top: 1110px;

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
  width: 170px;
  height: 25px;

  font-family: fantacy;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 43px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  color: darkgreen;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const ElectionText = styled.span`
  width: 170px;
  height: 55px;

  font-family: fantasy;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 43px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  color: darkgreen;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const CancelGameText = styled.span`
  width: 170px;
  height: 55px;

  font-family: fantasy;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 43px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  color: darkred;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const NewGameText = styled.span`
  width: 170px;
  height: 55px;

  font-family: fantasy;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 43px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  color: darkgreen;

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
  position: absolute;
  top: 3%;
  left: 12%;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 27px;
  z-index: 110;
  text-align: center;
  color: cyan;
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

export const MainPotImage = styled.div`
  width: 85px;
  height: 85px;
  grid-row: 8 / 10;
  grid-column: 20 / 22;
  z-index: 120;

  background: url(${potImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

export const MainPotMeterImage = styled.div`
  width: 195px;
  height: 50px;
  grid-row: 17 / 18;
  grid-column: 19 / 23;

  background: url(${potMeterImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  z-index: 110;
`;

export const MainPotMeter = styled.span`
  width: 195px;
  height: 50px;
  grid-row: 10 / 11;
  grid-column: 19 / 23;

  font-family: Croissant One;
  font-weight: Regular;
  font-size: 30px;
  line-height: 200%;
  opacity: 1;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  z-index: 110;
`;

export const PotLimitMeter = styled.span`
  width: 100%;
  height: 50px;
  grid-row: 16 / 17;
  grid-column: 17 / 25;
  text-align: center;

  font-family: Rubik;
  font-weight: 600;
  font-size: 20px;
  color: rgba(255, 255, 255, 1);
  z-index: 110;
  margin-top: 15px;
`;

export const WagerMeter = styled.span`
  position: absolute;
  width: 225px;
  height: 50px;
  top: 74%;
  left: 40%;

  background: url(${potMeterImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;

  font-family: Croissant One;
  font-weight: Regular;
  font-size: 30px;
  line-height: 200%;
  opacity: 1;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  z-index: 110;
`;

export const FlopCard1 = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 80px;
  height: 120px;
  left: 582px;
  top: 530px;

  border: 1px solid #456;
`;

export const FlopCard2 = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 80px;
  height: 120px;
  left: 702px;
  top: 530px;

  border: 1px solid #456;
`;

export const FlopCard3 = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 80px;
  height: 120px;
  left: 822px;
  top: 530px;

  border: 1px solid #456;
`;

export const TurnCard = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 80px;
  height: 120px;
  left: 972px;
  top: 530px;

  border: 1px solid #456;
`;

export const RiverCard = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 80px;
  height: 120px;
  left: 1122px;
  top: 530px;

  border: 1px solid #456;
`;
