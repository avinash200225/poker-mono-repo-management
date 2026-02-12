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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Box,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { TotalBet } from "../../style";
import { Cell, Header } from "./style";

function PopoverSeatBets(props) {
  const { uid, betList } = props;
  return (
    <Popover placement="right-start">
      <PopoverTrigger>
        <Box className={TotalBet}>
          {betList
            .map((bet) => bet.betValue)
            .reduce((partialSum, a) => partialSum + a, 0)}
        </Box>
      </PopoverTrigger>
      <PopoverContent minW={"500px"}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{`SEAT ${uid} ACTIONS`}</PopoverHeader>
        <PopoverBody>
          <VStack spacing={"0"} align={"stretch"}>
            <HStack spacing={"0"} align={"stretch"}>
              <Box className={Header} w={"25%"}>
                Index
              </Box>
              <Box className={Header} w={"25%"}>
                Group
              </Box>
              <Box className={Header} w={"25%"}>
                Type
              </Box>
              <Box className={Header} w={"25%"}>
                Value
              </Box>
            </HStack>
            {betList.map((bet, index) => (
              <HStack spacing={"0"} key={index}>
                <Box className={Cell} w={"25%"}>
                  {bet.index}
                </Box>
                <Box className={Cell} w={"25%"}>
                  {bet.group}
                </Box>
                <Box className={Cell} w={"25%"}>
                  {bet.betType}
                </Box>
                <Box className={Cell} w={"25%"}>
                  {bet.betValue}
                </Box>
              </HStack>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverSeatBets;
