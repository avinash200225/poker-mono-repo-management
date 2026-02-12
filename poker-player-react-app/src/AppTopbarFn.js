import React from "react";
import { TopBarContainer } from "./style";
import screenfull from 'screenfull';

import { Button, Icon, IconButton, Portal } from '@chakra-ui/react'
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaExpand,FaCompress } from 'react-icons/fa';


import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { NavLink } from "react-router-dom";

function AppTopbarFn({
  
}) {


  return (
    <TopBarContainer>
      <Menu>
        <MenuButton>
            
        </MenuButton>
      </Menu>

      <IconButton 
        variant='outline' 
        onClick={() => {if (screenfull.isEnabled) {screenfull.toggle();}}} 
        colorScheme='teal' 
        aria-label='Expand' 
        icon={<Icon as={FaExpand} />} 
      />     
    </TopBarContainer>
  );
}

export default AppTopbarFn;
