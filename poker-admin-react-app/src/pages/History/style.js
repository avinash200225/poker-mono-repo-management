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

import bgImage from "../../assets/images/Background.png";
import { css } from "@emotion/css";

export const Container = styled.div`
  position: relative;
  width: 1920px;
  height: 1200px;
  overflow: hidden;

  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;

  padding-top: 80px;

  display: grid;
  grid-template-columns: repeat(48, 40px);
  grid-template-rows: repeat(30, 40px);
`;

export const WinnerBallsAreaBg = styled.div`
  position: relative;
  display: grid;
  grid-row: 2/28;
  grid-column: -2/-18;
  background-color: gray;
  grid-template-rows: repeat(12, 102px);
  grid-template-columns: repeat(6, 104px);
  grid-gap: 2px;
  margin-left: 3px;
`;

export const WinnerBallsArea = styled.div`
  position: relative;
  display: grid;
  grid-row: 2/28;
  grid-column: -2/-18;
  grid-template-rows: repeat(12, 102px);
  grid-template-columns: repeat(6, 104px);
  grid-gap: 2px;
  margin-left: 3px;
`;

export const GameResultArea = styled.div`
  position: relative;
  grid-row: 2/5;
  grid-column: 2/-18;
  background-color: #faf5ff;
`;
export const SeatHeaderArea = styled.div`
  position: relative;
  grid-row: 5/6;
  grid-column: 2/-18;
  background-color: #faf5ff;
`;

export const SeatDetailsArea = styled.div`
  position: relative;
  grid-row: 6/28;
  grid-column: 2/-18;
  background-color: #faf5ff;
`;

export const ResultEmpty = css`
  height: 74px;
  width: 74px;
  border-radius: 50%;
  margin: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Rubik;
  font-weight: 700;
  font-size: 2rem;
  color: var(--chakra-colors-purple-700);
  background-color: var(--chakra-colors-purple-200);
`;

export const Result = css`
  height: 74px;
  width: 74px;
  border-radius: 50%;
  margin: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Rubik;
  font-weight: 700;
  font-size: 2rem;
  color: var(--chakra-colors-purple-700);
  background-color: var(--chakra-colors-purple-200);
  cursor: pointer;
`;

export const Heading = css`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Rubik;
  font-weight: 800;
  font-size: 1.5rem;
`;

export const Config = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-family: Rubik;
  font-weight: 800;
  font-size: 1.5rem;

  text-transform: uppercase;
  color: darkgray;
`;

export const GameCards = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HoleCards = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SelectedCards = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const TotalBet = css`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Rubik;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--chakra-colors-purple-700);
`;

export const WonBet = css`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Rubik;
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--chakra-colors-green-500);
  text-transform: uppercase;
`;

export const LostBet = css`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Rubik;
  font-weight: 500;
  font-size: 1.2rem;
  color: var(--chakra-colors-red-700);
  text-transform: uppercase;
`;
