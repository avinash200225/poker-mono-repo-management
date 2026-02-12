import {injectGlobal} from '@emotion/css'
import styled from '@emotion/styled';

import RobotoRegularW2 from './assets/fonts/Roboto-Regular.woff2';

import RubicLight from './assets/fonts/Rubik/Rubik-Light.ttf'
import RubicRegular from './assets/fonts/Rubik/Rubik-Regular.ttf'
import RubicMedium from './assets/fonts/Rubik/Rubik-Medium.ttf'
import RubicSemiBold from './assets/fonts/Rubik/Rubik-SemiBold.ttf'
import RubicBold from './assets/fonts/Rubik/Rubik-Bold.ttf';
import RubicExtraBold from './assets/fonts/Rubik/Rubik-ExtraBold.ttf'
import RubicBlack from './assets/fonts/Rubik/Rubik-Black.ttf'

import Inline from './assets/fonts/Inline.ttf';

injectGlobal `
    * {
        box-sizing: border-box;
        list-style: none;
        -webkit-tap-highlight-color:transparent;
    }
    
    @font-face {
        font-family: Roboto;
        src: url(${RobotoRegularW2});
    }

    @font-face {
        font-family: Rubik;
        src: url(${RubicLight});
        font-weight: 300;
    }

    @font-face {
        font-family: Rubik;
        src: url(${RubicRegular});
        font-weight: 400;
    }
    @font-face {
        font-family: Rubik;
        src: url(${RubicMedium});
        font-weight: 500;
    }
    @font-face {
        font-family: Rubik;
        src: url(${RubicSemiBold});
        font-weight: 600;
    }

    @font-face {
        font-family: Rubik;
        src: url(${RubicBold});
        font-weight: 700;
    }

    @font-face {
        font-family: Rubik;
        src: url(${RubicExtraBold});
        font-weight: 800;
    }
    @font-face {
        font-family: Rubik;
        src: url(${RubicBlack});
        font-weight: 900;
    }

  
    @font-face {
        font-family: Inline;
        src: url(${Inline}) format('truetype');
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
          height:1080px;
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

import './assets/css/tykhe/others.css'

export const TopBarContainer = styled.div `
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
    -webkit-app-region: drag;
`
