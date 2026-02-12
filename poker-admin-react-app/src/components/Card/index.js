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
import React from "react";
import {
  Back,
  Clubs10,
  Clubs2,
  Clubs3,
  Clubs4,
  Clubs5,
  Clubs6,
  Clubs7,
  Clubs8,
  Clubs9,
  ClubsA,
  ClubsJ,
  ClubsK,
  ClubsQ,
} from "./clubs/style";
import {
  Diamond10,
  Diamond2,
  Diamond3,
  Diamond4,
  Diamond5,
  Diamond6,
  Diamond7,
  Diamond8,
  Diamond9,
  DiamondA,
  DiamondJ,
  DiamondK,
  DiamondQ,
} from "./diamond/style";
import {
  Hearts10,
  Hearts2,
  Hearts3,
  Hearts4,
  Hearts5,
  Hearts6,
  Hearts7,
  Hearts8,
  Hearts9,
  HeartsA,
  HeartsJ,
  HeartsK,
  HeartsQ,
} from "./hearts/style";
import {
  Spade10,
  Spade2,
  Spade3,
  Spade4,
  Spade5,
  Spade6,
  Spade7,
  Spade8,
  Spade9,
  SpadeA,
  SpadeJ,
  SpadeK,
  SpadeQ,
} from "./spade/style";

function Card({
  name = "xx",
  left = "652px",
  top = "530px",
  width = "80px",
  height = "120px",
  position = "absolute",
}) {
  switch (name) {
    case "c2":
      return (
        <Clubs2
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "c3":
      return (
        <Clubs3
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "c4":
      return (
        <Clubs4
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "c5":
      return (
        <Clubs5
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "c6":
      return (
        <Clubs6
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "c7":
      return (
        <Clubs7
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "c8":
      return (
        <Clubs8
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "c9":
      return (
        <Clubs9
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "c10":
      return (
        <Clubs10
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "cJ":
      return (
        <ClubsJ
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "cQ":
      return (
        <ClubsQ
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "cK":
      return (
        <ClubsK
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "cA":
      return (
        <ClubsA
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );

    case "d2":
      return (
        <Diamond2
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "d3":
      return (
        <Diamond3
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "d4":
      return (
        <Diamond4
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "d5":
      return (
        <Diamond5
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "d6":
      return (
        <Diamond6
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "d7":
      return (
        <Diamond7
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "d8":
      return (
        <Diamond8
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "d9":
      return (
        <Diamond9
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "d10":
      return (
        <Diamond10
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "dJ":
      return (
        <DiamondJ
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "dQ":
      return (
        <DiamondQ
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "dK":
      return (
        <DiamondK
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "dA":
      return (
        <DiamondA
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );

    case "h2":
      return (
        <Hearts2
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "h3":
      return (
        <Hearts3
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "h4":
      return (
        <Hearts4
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "h5":
      return (
        <Hearts5
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "h6":
      return (
        <Hearts6
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "h7":
      return (
        <Hearts7
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "h8":
      return (
        <Hearts8
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "h9":
      return (
        <Hearts9
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "h10":
      return (
        <Hearts10
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "hJ":
      return (
        <HeartsJ
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "hQ":
      return (
        <HeartsQ
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "hK":
      return (
        <HeartsK
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "hA":
      return (
        <HeartsA
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );

    case "s2":
      return (
        <Spade2
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "s3":
      return (
        <Spade3
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "s4":
      return (
        <Spade4
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "s5":
      return (
        <Spade5
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "s6":
      return (
        <Spade6
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "s7":
      return (
        <Spade7
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "s8":
      return (
        <Spade8
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "s9":
      return (
        <Spade9
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "s10":
      return (
        <Spade10
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "sJ":
      return (
        <SpadeJ
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "sQ":
      return (
        <SpadeQ
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "sK":
      return (
        <SpadeK
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    case "sA":
      return (
        <SpadeA
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
    default:
      return (
        <Back
          left={left}
          top={top}
          width={width}
          height={height}
          position={position}
        />
      );
  }
}

export default Card;
