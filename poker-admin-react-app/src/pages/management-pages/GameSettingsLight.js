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
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { applySpec } from "ramda";

import { Flex, SimpleGrid, Spacer, useToast } from "@chakra-ui/react";

import {
  Box,
  Stack,
  Center,
  Grid,
  GridItem,
  Heading,
  Button,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";

import { Radio, RadioGroup, Switch } from "@chakra-ui/react";

import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
} from "@chakra-ui/react";

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

import { Formik } from "formik";
import { useHistory } from "react-router-dom";

const labelStyles = { mt: "4", ml: "-4.5", fontSize: "2xl" };
import { formatRupee } from "../../utils/functions/formatRupee";

import { Container, LeftBox, RightBox } from "./style";
import { tableSelector } from "../../store/selectors";
import tableActions from "../../store/actions/table";

const holdemDomain = {
  Texas: {
    betLimitConfig: {
      Limit: true,
      "No Limit": true,
      "Pot Limit": true,
    },
    playerCardsConfig: {
      count: 2,
      min: 0,
      max: 2,
    },
    communityCardsConfig: {
      count: 5,
      min: 3,
      max: 5,
    },
    maxRaiseConfig: {
      preFlop: 3,
      Flop: 3,
      Turn: 3,
      River: 3,
    },
    winnerConfig: {
      Low: false,
      High: true,
      LoHi: false,
    },
  },
  Omaha: {
    betLimitConfig: {
      Limit: true,
      "No Limit": true,
      "Pot Limit": true,
    },
    playerCardsConfig: {
      count: 4,
      min: 2,
      max: 2,
    },
    communityCardsConfig: {
      count: 5,
      min: 3,
      max: 3,
    },
    maxRaiseConfig: {
      preFlop: 3,
      Flop: 3,
      Turn: 3,
      River: 3,
    },
    winnerConfig: {
      Low: false,
      High: true,
      LoHi: false,
    },
  },
};

export const GameSettingsLight = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();
  const table = useSelector(tableSelector);

  const handleOnSubmit = (values, actions) => {
    console.log({
      MessageType: "SETTINGS_UPDATE",
      pokerVariant: values.pokerVariant,
      betLimit: values.betLimit,
      liveDealer: values.liveDealer,
      tournamentMode: values.tournamentMode,
      playerCardsConfig: holdemDomain[values.pokerVariant].playerCardsConfig,
      communityCardsConfig:
        holdemDomain[values.pokerVariant].communityCardsConfig,
      rakePercent: +values.rakePercent,
      blind: values.blind,
    });

    dispatch(
      tableActions.table.update({
        MessageType: "SETTINGS_UPDATE",
        pokerVariant: values.pokerVariant,
        betLimit: values.betLimit,
        liveDealer: values.liveDealer,
        tournamentMode: values.tournamentMode,
        playerCardsConfig: holdemDomain[values.pokerVariant].playerCardsConfig,
        communityCardsConfig:
          holdemDomain[values.pokerVariant].communityCardsConfig,
        rakePercent: +values.rakePercent,
        blind: values.blind,
      })
    );
    history.push("/");
  };

  const {
    configData: {
      pokerVariant = "Omaha",
      betLimit = "Pot Limit",
      rakePercent = 20,
      blind = 1000,
      liveDealer = false,
      tournamentMode = false,
    } = {},
  } = table;

  return (
    <Container>
      <Center
        zIndex="1"
        w="1920px"
        h="1200px"
        color="black"
        fontFamily="Roboto"
        alignItems={"flex-start"}
      >
        <Formik
          initialValues={{
            pokerVariant,
            betLimit,
            rakePercent,
            blind,
            liveDealer,
            tournamentMode,
          }}
          onSubmit={handleOnSubmit}
          enableReinitialze={true}
        >
          {(props) => (
            <Grid
              as="form"
              id="configDataForm"
              onSubmit={props.handleSubmit}
              templateAreas={`"header header header"
                            "nav main navr"
                            "nav footer navr"`}
              gridTemplateRows={"30px 1fr .2fr"}
              gridTemplateColumns={"20px 1fr 20px"}
              h="90%"
              w="90%"
              zIndex="1"
            >
              <GridItem pt="2" bg="#F6FBF9" area={"main"} zIndex="2">
                <VStack
                  mx="auto"
                  w="90%"
                  h="100%"
                  justifyContent="start"
                  alignItems={"flex-start"}
                  spacing="12"
                >
                  <Heading as={"u"} fontFamily={"Roboto"} size={"2xl"}>
                    Game Setting
                  </Heading>

                  <Flex w={"100%"} justifyContent={"flex-start"}>
                    <FormControl
                      w={"50%"}
                      border={"1px solid #DEF"}
                      padding={"4"}
                    >
                      <FormLabel htmlFor="pokerVariant">
                        <Text color="blue.500" fontSize="4xl">
                          Poker Variant
                        </Text>
                      </FormLabel>
                      <RadioGroup
                        id="pokerVariant"
                        name="pokerVariant"
                        onChange={props.handleChange("pokerVariant")}
                        value={props.values.pokerVariant}
                      >
                        <HStack spacing={8} direction="row">
                          <Radio size="lg" colorScheme="blue" value="Texas">
                            <Text fontSize="3xl">Texas</Text>
                          </Radio>
                          <Radio size="lg" colorScheme="blue" value="Omaha">
                            <Text fontSize="3xl">Omaha</Text>
                          </Radio>
                          <Radio
                            size="lg"
                            colorScheme="blue"
                            value="Pinapple"
                            isDisabled
                          >
                            <Text fontSize="3xl">Pinapple</Text>
                          </Radio>
                        </HStack>
                      </RadioGroup>
                    </FormControl>
                    <Spacer />
                    {/* <FormControl as={HStack} w={'30%'} border={'1px solid #DEF'} padding={'4'}>
                    <FormLabel htmlFor='liveDealer'><Text color="blue.500" fontSize="4xl">Live Dealer: </Text> </FormLabel>
                    <Switch size={'lg'} id='liveDealer' isChecked={props.values.liveDealer} onChange={props.handleChange('liveDealer')}  />
                    {props.values.liveDealer ? <Text color="blue.500" fontSize="4xl">ON</Text> : <Text color="gray.500" fontSize="4xl">OFF</Text>}
                  </FormControl> */}
                  </Flex>

                  <Flex w={"50%"} padding={"4"} border={"1px solid #DEF"}>
                    <FormControl>
                      <FormLabel htmlFor="betLimit">
                        <Text color="blue.500" fontSize="4xl">
                          Bet Limit
                        </Text>
                      </FormLabel>
                      <RadioGroup
                        id="betLimit"
                        name="betLimit"
                        onChange={props.handleChange("betLimit")}
                        value={props.values.betLimit}
                      >
                        <HStack spacing={8} direction="row">
                          <Radio size="lg" colorScheme="blue" value="Limit">
                            <Text fontSize="3xl">Fixed Limit</Text>
                          </Radio>
                          <Radio size="lg" colorScheme="blue" value="Pot Limit">
                            <Text fontSize="3xl">Pot Limit</Text>
                          </Radio>
                          <Radio size="lg" colorScheme="blue" value="No Limit">
                            <Text fontSize="3xl">No Limit</Text>
                          </Radio>
                        </HStack>
                      </RadioGroup>
                    </FormControl>
                  </Flex>
                  {/* 
                <Flex width={'100%'} padding={'4'}  >
                  <FormControl as={HStack} w={'50%'} >
                    <FormLabel htmlFor='tournamentMode'><Text color="blue.500" fontSize="4xl">Tournament Mode: </Text> </FormLabel>
                    <Switch size={'lg'} id='tournamentMode' isChecked={props.values.tournamentMode} onChange={props.handleChange('tournamentMode')}  />
                    {props.values.tournamentMode ? <Text color="blue.500" fontSize="4xl">ON</Text> : <Text color="gray.500" fontSize="4xl">OFF</Text>}
                  </FormControl>
                  <Spacer />

                  {!props.values.tournamentMode && <FormControl w={'50%'}>
                  <FormLabel pb={8} htmlFor="rakePercent"><Text color={'blue.500'} fontSize="4xl"> Rake Percentage</Text></FormLabel>

                  <Slider
                    value={props.values.rakePercent}
                    min={0}
                    step={1}
                    max={25}
                    aria-label="slider-rakePercent"
                    onChange={(e) => props.setFieldValue('rakePercent', e)}
                  >
                    <SliderMark value={0} {...labelStyles}>
                      0%
                    </SliderMark>
                    <SliderMark value={5} {...labelStyles}>
                      5%
                    </SliderMark>
                    <SliderMark value={10} {...labelStyles}>
                      10%
                    </SliderMark>
                    <SliderMark value={15} {...labelStyles}>
                      15%
                    </SliderMark>
                    <SliderMark value={20} {...labelStyles}>
                      20%
                    </SliderMark>
                    <SliderMark value={25} {...labelStyles}>
                      25%
                    </SliderMark>
                    <SliderMark
                      value={props.values.rakePercent}
                      textAlign="center"
                      bg="blue.500"
                      color="white"
                      mt="-14"
                      ml="-10"
                      w="28"
                      fontSize='2xl'
                    >
                      {props.values.rakePercent}%
                    </SliderMark>
                    <SliderTrack >
                      <SliderFilledTrack   />
                    </SliderTrack>
                    <SliderThumb boxSize={8}  />
                  </Slider>
                  </FormControl>}
                </Flex>
         */}
                  <Flex width={"100%"} padding={"4"}>
                    <FormControl>
                      <FormLabel pb={8} htmlFor="blind">
                        <Text color={"blue.500"} fontSize="4xl">
                          Min Bet/ Big Blind
                        </Text>
                      </FormLabel>

                      <Slider
                        id="blind"
                        name="blind"
                        value={props.values.blind}
                        min={100}
                        step={100}
                        max={10000}
                        aria-label="slider-blind"
                        onChange={(e) => props.setFieldValue("blind", e)}
                      >
                        <SliderMark value={100} {...labelStyles}>
                          {formatRupee(100)}
                        </SliderMark>
                        <SliderMark value={1000} {...labelStyles}>
                          {formatRupee(1000)}
                        </SliderMark>
                        <SliderMark value={3000} {...labelStyles}>
                          {formatRupee(3000)}
                        </SliderMark>
                        <SliderMark value={5000} {...labelStyles}>
                          {formatRupee(5000)}
                        </SliderMark>
                        <SliderMark value={7500} {...labelStyles}>
                          {formatRupee(7500)}
                        </SliderMark>
                        <SliderMark value={10000} {...labelStyles}>
                          {formatRupee(10000)}
                        </SliderMark>
                        <SliderMark
                          value={props.values.blind}
                          textAlign="center"
                          bg="blue.500"
                          color="white"
                          mt="-14"
                          ml="-10"
                          w="28"
                          fontSize="2xl"
                        >
                          {formatRupee(props.values.blind)}
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb boxSize={8} />
                      </Slider>
                    </FormControl>
                  </Flex>
                </VStack>
              </GridItem>

              <GridItem pl="2" bg="#F6FBF9" area={"header"}></GridItem>
              <GridItem pl="2" bg="#F6FBF9" area={"nav"}></GridItem>
              <GridItem
                pl="2"
                bg="#F6FBF9"
                area={"footer"}
                padding={"4"}
                display={"flex"}
              >
                <HStack
                  w={"100%"}
                  alignItems="center"
                  spacing={"20px"}
                  justifyContent="flex-end"
                >
                  <Button
                    onClick={() => history.push("/")}
                    fontSize={"2xl"}
                    colorScheme="gray"
                    size={"lg"}
                  >
                    {" "}
                    CANCEL{" "}
                  </Button>
                  <Button
                    type="submit"
                    fontSize={"2xl"}
                    form="configDataForm"
                    colorScheme="blue"
                    size={"lg"}
                  >
                    {" "}
                    SUBMIT{" "}
                  </Button>
                </HStack>
              </GridItem>
              <GridItem pl="2" bg="#F6FBF9" area={"navr"}></GridItem>
            </Grid>
          )}
        </Formik>
      </Center>
    </Container>
  );
};

export default GameSettingsLight;
