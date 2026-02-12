import styled from "@emotion/styled";

import potImage from "../../assets/images/pot.png";
import potMeterImage from "../../assets/images/mainPotMeter.png";
import dealerImage from "../../assets/images/DealerGold.png"


export const SidePotsArea = styled.div`
  grid-area: 6 / 8 / 9 / 33;
  width: 100%;
  height: 100%;
  z-index: 120;
  padding-top: 40px;
  padding-left: 20px;

`



export const TableLimitsText = styled.span`
height: 50px;
grid-row: 1 / 2;
grid-column: 6 / 16;

font-family: Croissant One;
font-weight: Regular;
font-size: 30px;
line-height: 150%;
opacity: 1;
color: crimson;
text-align: center;
z-index: 110;
`;

export const GameTypeText = styled.span`
height: 50px;
grid-row: 1 / 2;
grid-column: 17 / 23;

font-family: Croissant One;
font-weight: Regular;
font-size: 30px;
line-height: 150%;
opacity: 1;
color: crimson;
text-align: center;
z-index: 110;
`;

export const RakeText = styled.span`
height: 50px;
grid-row: 1 / 2;
grid-column: 24 / 30;

font-family: Croissant One;
font-weight: Regular;
font-size: 30px;
line-height: 150%;
opacity: 1;
color: crimson;
text-align: center;
z-index: 110;
`;

export const GameIdText = styled.span`
height: 50px;
grid-row: 1 / 2;
grid-column: 31 / 38;

font-family: Croissant One;
font-weight: Regular;
font-size: 30px;
line-height: 150%;
opacity: 1;
color: crimson;
text-align: center;
z-index: 110;
`


export const NewGameBtn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 8px 16px;

position: absolute;
width: 200px;
height: 60px;
left: 48px;
top: 1040px;

background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.94) 0%,
    rgba(255, 255, 255, 0.24) 52.08%,
    rgba(255, 255, 255, 0) 52.09%,
    rgba(255, 255, 255, 0.29) 100%
  ),
  linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 51.56%
  ),
  #4066c7;
background-blend-mode: soft-light, normal, normal;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
  inset 0px -2px 6px rgba(44, 0, 0, 0.05);
border-radius: 32px;
`;

export const SkipElectionBtn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 8px 16px;

position: absolute;
width: 200px;
height: 60px;
left: 48px;
top: 970px;

background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.94) 0%,
    rgba(255, 255, 255, 0.24) 52.08%,
    rgba(255, 255, 255, 0) 52.09%,
    rgba(255, 255, 255, 0.29) 100%
  ),
  linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 51.56%
  ),
  #4066c7;
background-blend-mode: soft-light, normal, normal;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
  inset 0px -2px 6px rgba(44, 0, 0, 0.05);
border-radius: 32px;
`;

export const ReElectionBtn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 8px 16px;

position: absolute;
width: 200px;
height: 60px;
left: 48px;
top: 970px;

background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.94) 0%,
    rgba(255, 255, 255, 0.24) 52.08%,
    rgba(255, 255, 255, 0) 52.09%,
    rgba(255, 255, 255, 0.29) 100%
  ),
  linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 51.56%
  ),
  #4066c7;
background-blend-mode: soft-light, normal, normal;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
  inset 0px -2px 6px rgba(44, 0, 0, 0.05);
border-radius: 32px;
`;

export const CancelGameBtn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 8px 16px;

position: absolute;
width: 200px;
height: 60px;
left: 48px;
top: 1110px;

background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.94) 0%,
    rgba(255, 255, 255, 0.24) 52.08%,
    rgba(255, 255, 255, 0) 52.09%,
    rgba(255, 255, 255, 0.29) 100%
  ),
  linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 51.56%
  ),
  #cf3c3c;
background-blend-mode: soft-light, normal, normal;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
  inset 0px -2px 6px rgba(44, 0, 0, 0.05);
border-radius: 32px;
`;

export const ContinueBtn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 8px 16px;

position: absolute;
width: 200px;
height: 60px;
left: 48px;
top: 1110px;

background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.94) 0%,
    rgba(255, 255, 255, 0.24) 52.08%,
    rgba(255, 255, 255, 0) 52.09%,
    rgba(255, 255, 255, 0.29) 100%
  ),
  linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 51.56%
  ),
  #cf3c3c;
background-blend-mode: soft-light, normal, normal;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
  inset 0px -2px 6px rgba(44, 0, 0, 0.05);
border-radius: 32px;
`;

export const FoldBtn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 8px 16px;

position: absolute;
width: 200px;
height: 60px;
left: 691px;
top: 1040px;

background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.94) 0%,
    rgba(255, 255, 255, 0.24) 52.08%,
    rgba(255, 255, 255, 0) 52.09%,
    rgba(255, 255, 255, 0.29) 100%
  ),
  linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 51.56%
  ),
  #cf3c3c;
background-blend-mode: soft-light, normal, normal;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
  inset 0px -2px 6px rgba(44, 0, 0, 0.05);
border-radius: 32px;
`;

export const CheckBtn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 8px 16px;

position: absolute;
width: 200px;
height: 60px;
left: 1011px;
top: 1040px;

background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.94) 0%,
    rgba(255, 255, 255, 0.24) 52.08%,
    rgba(255, 255, 255, 0) 52.09%,
    rgba(255, 255, 255, 0.29) 100%
  ),
  linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 51.56%
  ),
  #42c740;
background-blend-mode: soft-light, normal, normal;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
  inset 0px -2px 6px rgba(44, 0, 0, 0.05);
border-radius: 32px;
`;

export const RaiseBtn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 8px 16px;

position: absolute;
width: 200px;
height: 60px;
left: 1316px;
top: 1040px;

background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.94) 0%,
    rgba(255, 255, 255, 0.24) 52.08%,
    rgba(255, 255, 255, 0) 52.09%,
    rgba(255, 255, 255, 0.29) 100%
  ),
  linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 51.56%
  ),
  #cf683c;
background-blend-mode: soft-light, normal, normal;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
  inset 0px -2px 6px rgba(44, 0, 0, 0.05);
border-radius: 32px;
`;

export const CallBtn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 8px 16px;

position: absolute;
width: 200px;
height: 60px;
left: 1617px;
top: 1040px;

background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.94) 0%,
    rgba(255, 255, 255, 0.24) 52.08%,
    rgba(255, 255, 255, 0) 52.09%,
    rgba(255, 255, 255, 0.29) 100%
  ),
  linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 51.56%
  ),
  #42c740;
background-blend-mode: soft-light, normal, normal;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
  inset 0px -2px 6px rgba(44, 0, 0, 0.05);
border-radius: 32px;
`;

export const BtnTxt = styled.span`
width: 170px;
height: 25px;

font-family: "Acme";
font-style: normal;
font-weight: 400;
font-size: 38px;
line-height: 43px;
/* identical to box height */

display: flex;
align-items: center;
text-align: center;

color: #161313;

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;
export const NewGameText = styled.span`
width: 160px;
height: 25px;

font-family: "Acme";
font-style: normal;
font-weight: 400;
font-size: 28px;
line-height: 43px;
/* identical to box height */

display: flex;
align-items: center;
text-align: center;

color: #161313;

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

export const BtnTxtAmount = styled.span`
width: 100px;
height: 33px;

font-family: "Acme";
font-style: normal;
font-weight: 400;
font-size: 28px;
line-height: 170%;
/* identical to box height, or 33px */

text-align: center;

color: #ffffff;

/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`;

export const GameLimits = styled.div`
grid-row: 1 / 2; /*from top 1 row height starting from row 1 */
grid-column: 6 / 12; /* from left 6 rows width starting from 6 */

font-style: normal;
font-size: 28px;
line-height: 200%;
z-index: 110;

text-align: center;
${'' /* text-transform: uppercase; */}
color: coral;
`;

export const GameMessage = styled.div`
grid-row: 1 / 2; /*from top 1 row height starting from row 1 */
grid-column: 14 / 28; /** from left 8 colums width starting from 12  */
font-style: normal;
font-size: 28px;
line-height: 140%;
z-index: 110;
text-align: center;
color: cornflowerblue;
`;

export const GameType = styled.div`
  grid-row: 1 / 2; /* from top 1 row starting from 1 */
  grid-column: 28 / 35; /* from left 4 columns starting from 31  */
  font-style: normal;
  font-size: 28px;
  line-height: 150%;
  z-index: 110;
  text-align: center;
  color: coral;
`

export const Rake = styled.div`
  grid-row: 1 / 2; /* from top 1 row starting from 1 */
  grid-column: 36 / 39; /*from left 2 columns starting from 36 */
  font-style: normal;
  font-size: 25px;
  line-height: 180%;
  z-index: 110;
  text-align: center;
  color: darkslategray;
`

export const TableHeader = styled.div`
position: absolute;
left: 41.51%;
right: 39.17%;
top: 0.37%;
bottom: 93.89%;

font-family: "Euphoria Script";
font-style: normal;
font-weight: 400;
font-size: 56px;
line-height: 110%;
/* identical to box height, or 62px */

text-align: center;

color: #ff36;

text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const MainPotImage = styled.div`
width: 85px;
height: 70px;
grid-row: 2 / 3;
grid-column: 18 / 20;
z-index: 120;

background: url(${potImage});
background-repeat: no-repeat;
background-position: center center;
background-size: cover;
`;

export const DealerImage = styled.div`
width: 200px;
height: 70px;
grid-row: 4 / 6;
grid-column: 19 / 21;
z-index: 120;

background: url(${dealerImage});
background-repeat: no-repeat;
background-position: center center;
background-size: cover;
`;

export const MainPotMeterImage = styled.div`
width: 195px;
height: 50px;
margin-top: 10px;
grid-row: 2 / 3;
grid-column: 19 / 23;

background: url(${potMeterImage});
background-repeat: no-repeat;
background-position: center center;
background-size: cover;
z-index: 110;
`;

export const MainPotMeter = styled.span`
width: 195px;
height: 50px;
grid-row: 2 / 3;
grid-column: 19 / 23;

font-family: Croissant One;
font-weight: Regular;
font-size: 38px;
line-height: 250%;
opacity: 1;
color: rgba(255, 255, 255, 1);
text-align: center;
z-index: 110;
`;


export const WagerMeter = styled.span`
width: 195px;
height: 50px;
grid-row: 2 / 3;
grid-column: 19 / 23;

font-family: Croissant One;
font-weight: Regular;
font-size: 38px;
line-height: 200%;
opacity: 1;
color: rgba(255, 255, 255, 1);
text-align: center;
z-index: 110;
`;


export const FlopCard1 = styled.div`
box-sizing: border-box;

position: absolute;
width: 130px;
    height: 190px;
left: 572px;
top: 432px;

border: 1px solid #456;
`;

export const FlopCard2 = styled.div`
box-sizing: border-box;

position: absolute;
width: 130px;
    height: 190px;
left: 712px;
top: 432px;

border: 1px solid #456;
`;

export const FlopCard3 = styled.div`
box-sizing: border-box;

position: absolute;
width: 130px;
    height: 190px;
left: 852px;
top: 432px;

border: 1px solid #456;
`;

export const TurnCard = styled.div`
box-sizing: border-box;

position: absolute;
width: 130px;
    height: 190px;
left: 1002px;
top: 432px;

border: 1px solid #456;
`;

export const RiverCard = styled.div`
box-sizing: border-box;

position: absolute;
width: 130px;
    height: 190px;
left: 1152px;
top: 432px;

border: 1px solid #456;
`;
