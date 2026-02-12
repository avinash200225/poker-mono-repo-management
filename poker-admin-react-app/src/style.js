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
import { css, injectGlobal } from "@emotion/css";
import styled from "@emotion/styled";

import RobotoRegularW2 from "./assets/fonts/Roboto-Regular.woff2";
import RobotoMediumW2 from "./assets/fonts/Roboto-Medium.woff2";
import RobotoBoldW2 from "./assets/fonts/Roboto-Bold.woff2";
import RobotoLightW2 from "./assets/fonts/Roboto-Light.woff2";
import RobotoItalicW2 from "./assets/fonts/Roboto-Italic.woff2";
import Anton from "./assets/fonts/anton-latin-400-normal.woff";
import PrimeIcons from "./assets/fonts/primeicons.woff";

import RubikLight from "./assets/fonts/Rubik/Rubik-Light.ttf";
import RubikRegular from "./assets/fonts/Rubik/Rubik-Regular.ttf";
import RubikMedium from "./assets/fonts/Rubik/Rubik-Medium.ttf";
import RubikSemiBold from "./assets/fonts/Rubik/Rubik-SemiBold.ttf";
import RubikBold from "./assets/fonts/Rubik/Rubik-Bold.ttf";
import RubikExtraBold from "./assets/fonts/Rubik/Rubik-ExtraBold.ttf";
import RubikBlack from "./assets/fonts/Rubik/Rubik-Black.ttf";

import "./assets/css/prime/primeicons.css";

injectGlobal`
    * {
        box-sizing: border-box;
        list-style: none;
        -webkit-tap-highlight-color:transparent;
    }
    
  
    html,body,#root,#app{
      width:100%;
      height:100%;
      font-family: Roboto,sans-serif;
      touch-action:manipulation;
      background-color:var(--background-color, #fff);
      color: '#bfd6ff';
      
      &.desktop-body{
          position:relative;
          display:flex;
          align-items:center;
          justify-content:center;
      }
      
      &.desktop-app{
          width:1920px;
          height:1200px;
          flex:none;
          flex-shrink:0;
          transform-origin:center;
        }
    }
    
    #root{
        background:transparent;
    }
    
    #app{
        overflow:hidden;
    }
    
      
    @font-face {
        font-family: primeicons;
        src: url(${PrimeIcons})
    }

    @font-face {
        font-family: Rubik;
        src: url(${RubikLight});
        font-weight: 300;
    }

    @font-face {
        font-family: Rubik;
        src: url(${RubikRegular});
        font-weight: 400;
    }
    @font-face {
        font-family: Rubik;
        src: url(${RubikMedium});
        font-weight: 500;
    }
    @font-face {
        font-family: Rubik;
        src: url(${RubikSemiBold});
        font-weight: 600;
    }

    @font-face {
        font-family: Rubik;
        src: url(${RubikBold});
        font-weight: 700;
    }

    @font-face {
        font-family: Rubik;
        src: url(${RubikExtraBold});
        font-weight: 800;
    }
    @font-face {
        font-family: Rubik;
        src: url(${RubikBlack});
        font-weight: 900;
    }

        
    @font-face{
        font-family:'Anton';
        font-style:italic;
        font-weight:400;
        src:url(${Anton});
    }
        
    @font-face{
        font-family:'Roboto';
        font-style:italic;
        font-weight:400;
        src:url(${RobotoItalicW2});
    }

    @font-face {
        font-family:'Roboto';
        font-style:normal;
        font-weight:300;
        src: url(${RobotoLightW2});
    }

    @font-face{
        font-family:'Roboto';
        font-style:normal;
        font-weight:400;
        src:url(${RobotoRegularW2});
    }
    
    @font-face{
        font-family:'Roboto';
        font-style:normal;
        font-weight:500;
        src:url(${RobotoMediumW2});
    }
    @font-face{
        font-family:'Roboto';
        font-style:normal;
        font-weight:700;
        src:url(${RobotoBoldW2});
    }
  
`;

import "./assets/css/prime/primereact.css";
import "./assets/css/prime/primeflex.css";
import "./assets/css/prime/lara-light-blue/theme.css";

import "./assets/css/layout/layout-blue.css";
import "./assets/css/theme/theme-bluegrey.css";

import "./assets/css/tykhe/others.css";

export const TopBarContainer = styled.div`
  padding: 10px;
  height: 80px;
  color: wheat;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: space-between;
  // -webkit-app-region: drag;
`;

export const DraggableArea = css`
  -webkit-app-region: drag;
`;
