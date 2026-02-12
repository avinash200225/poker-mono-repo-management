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
import { DraggableArea, TopBarContainer } from "./style";
import screenfull from "screenfull";

import { Button, Icon, IconButton, Portal, Spacer } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaExpand, FaCompress, FaHamburger, FaHome } from "react-icons/fa";
import {
  AiFillAccountBook,
  AiFillBook,
  AiFillCloud,
  AiFillFund,
  AiFillHome,
  AiFillMoneyCollect,
  AiFillSetting,
  AiOutlineHistory,
  AiOutlineHome,
  AiOutlineUser,
  AiTwotoneAccountBook,
} from "react-icons/ai";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { tableSelector } from "./store/selectors";

function AppTopbarFn({}) {
  const { stage = 1 } = useSelector(tableSelector);

  return (
    <TopBarContainer>
      {/* <IconButton 
        size={'lg'}
        variant='solid' 
        as={NavLink} 
        to='/'
        colorScheme='purple' 
        aria-label='Expand' 
        icon={<Icon style={{width: '2rem', height: '2rem'}} as={FaHome} />}
        marginRight={'16px'}
      /> */}
      <Button
        style={{ fontSize: "1.5rem" }}
        leftIcon={
          <Icon style={{ width: "2rem", height: "2rem" }} as={AiOutlineHome} />
        }
        as={NavLink}
        to="/"
        colorScheme="purple"
        marginRight={"16px"}
        variant="solid"
      >
        Home
      </Button>

      {stage == 1 && (
        <Button
          style={{ fontSize: "1.5rem" }}
          leftIcon={
            <Icon
              style={{ width: "2rem", height: "2rem" }}
              as={AiOutlineUser}
            />
          }
          as={NavLink}
          to="/cashier"
          colorScheme="purple"
          marginRight={"16px"}
          variant="solid"
        >
          Cashier
        </Button>
      )}

      <Spacer className={DraggableArea} />

      {/* <IconButton 
        size={'lg'}
        variant='solid' 
        as={NavLink} 
        to='/'
        colorScheme='purple' 
        aria-label='Expand' 
        icon={<Icon style={{width: '2rem', height: '2rem'}} as={AiFillSetting} />}
        marginRight={'16px'}
      /> */}

      {/* <Button
        style={{fontSize: '1.5rem'}} 
        leftIcon={<Icon style={{width: '2rem', height: '2rem'}} as={AiFillBook} />} 
        as={NavLink} 
        to='/logs'
        colorScheme='purple'
        marginRight={'16px'}  
        variant='solid'>
        Logs
      </Button> */}

      <Button
        style={{ fontSize: "1.5rem" }}
        leftIcon={
          <Icon
            style={{ width: "2rem", height: "2rem" }}
            as={AiOutlineHistory}
          />
        }
        as={NavLink}
        to="/history"
        colorScheme="purple"
        marginRight={"16px"}
        variant="solid"
      >
        Table History
      </Button>

      <Button
        style={{ fontSize: "1.5rem" }}
        leftIcon={
          <Icon
            style={{ width: "2rem", height: "2rem" }}
            as={AiTwotoneAccountBook}
          />
        }
        as={NavLink}
        to="/transactions"
        colorScheme="purple"
        marginRight={"16px"}
        variant="solid"
      >
        Accounting
      </Button>

      <Button
        style={{ fontSize: "1.5rem" }}
        leftIcon={
          <Icon style={{ width: "2rem", height: "2rem" }} as={AiFillSetting} />
        }
        as={NavLink}
        to="/operations/games"
        colorScheme="purple"
        marginRight={"16px"}
        variant="solid"
      >
        Settings
      </Button>

      {/* <Menu>
        <MenuButton
          as={Button}
          size='lg'
          variant='solid'
          colorScheme='purple'
          fontSize='2xl'
        >
          Admin Pages <ChevronDownIcon />
        </MenuButton>
        <Portal>
          <MenuList>
            <MenuItem as={NavLink} to='/'>Table</MenuItem>
            <MenuDivider />
            <MenuItem  as={NavLink} to='/transactions'>Transactions</MenuItem>
            <MenuItem  as={NavLink} to='/cashier'>Cashier</MenuItem>
            <MenuItem  as={NavLink} to='/operations/player'>User Management</MenuItem>
            <MenuItem  as={NavLink} to='/operations/games'>Settings</MenuItem>
          </MenuList>
        </Portal>
      </Menu> */}

      <IconButton
        variant="solid"
        onClick={() => {
          if (screenfull.isEnabled) {
            screenfull.toggle();
          }
        }}
        colorScheme="purple"
        aria-label="Expand"
        icon={<Icon style={{ width: "2rem", height: "2rem" }} as={FaExpand} />}
        marginLeft={"16px"}
      />
    </TopBarContainer>
  );
}

export default AppTopbarFn;
