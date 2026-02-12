import { injectGlobal } from '@emotion/css'
import styled from "@emotion/styled";

import RobotoRegularW2 from './assets/fonts/Roboto-Regular.woff2';

injectGlobal`
    * {
        box-sizing: border-box;
        list-style: none;
        -webkit-tap-highlight-color:transparent;
    }
    
    @font-face {
        font-family: Roboto;
        src: url(${RobotoRegularW2});
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
    
  
`
import './assets/css/prime/primereact.css';
import './assets/css/prime/primeflex.css';
import './assets/css/prime/primeicons.css';
import './assets/css/prime/lara-light-blue/theme.css'

import './assets/css/layout/layout-blue.css'
import './assets/css/theme/theme-bluegrey.css'

import './assets/css/tykhe/diamond.css'
import './assets/css/tykhe/fonts.css'
import './assets/css/tykhe/others.css'
import './assets/css/tykhe/serenity.css'


export const TopBarContainer = styled.div`
    padding: 10px;
    height: 60px;
    color: wheat;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;

    display: flex;
    align-items: center;
    justify-content: space-between;
`