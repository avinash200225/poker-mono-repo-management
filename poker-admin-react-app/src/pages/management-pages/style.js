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
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import bgImage from "../../assets/images/Background.png";

export const Container = styled.div`
  width: 1920px;
  height: 1200px;
  position: relative;
  overflow: hidden;

  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;

  padding-top: 80px;
`;

export const LeftBox = styled.div`
  position: absolute;
  width: 520px;
  height: 590px;
  left: -125px;
  top: -179.73px;

  /* Box */

  background: #c1e3d6;
  border-radius: 40px;
  transform: rotate(-45deg);
  z-index: 0;
  overflow: hidden;
`;

export const RightBox = styled.div`
  position: absolute;
  width: 550px;
  height: 590px;
  left: 1479px;
  top: 854px;

  /* Box */

  background: #c1e3d6;
  border-radius: 40px;
  transform: rotate(-45deg);
  z-index: 0;
  overflow: hidden;
`;
