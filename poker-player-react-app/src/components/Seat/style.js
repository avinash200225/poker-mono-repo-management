import styled from "@emotion/styled";

import balanceImage from "../../assets/images/balance.png";
import statusImage from "../../assets/images/balance.png";
import roundBetsImage from "../../assets/images/roundBets.png";
import cardImage from "../../assets/images/v48_3631.png";
import dealerImage from "../../assets/images/DealerImg.png";
import bigBetImage from "../../assets/images/bb.png";
import smallBetImage from "../../assets/images/smb.png";
import glowImage from "../../assets/images/glow.png";

export const Balance = styled.div`
    grid-area: 26 / 20 / 28 / 29;
    position: relative;
    z-index: 90;
`;


export const BalanceAmount = styled.span`
width: 500px;
color: rgb(255, 255, 255);
position: absolute;
top: 24%;
font-family: "Croissant One";
font-size: 80px;
line-height: 95%;
opacity: 1;
text-align: left;
color: darkorange;
`;


export const CurrentBet = styled.div`
grid-area: 22 / 18 / 25 / 26;
width: 258px;
height: 85px;
border-radius: 50%;
opacity: 1;
position: absolute;
z-index: 80;
background: darkslateblue;
margin-left: 15px;
margin-top: 20px;
`;



export const Card1 = styled.div`
  width: 80px;
  height: 120px;
  background: url(${cardImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 842px;
  left: 834px;

  z-index: 80;
`;

export const Card2 = styled.div`
  width: 150px;
  height: 230px;
  background: url(${cardImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 42px;
  left: 70px;
  z-index: 80;
`;


export const CurrentBetContainer = styled.div`
  width: 136px;
  height: 148px;
  opacity: 1;
  position: absolute;
  top: 774px;
    left: 871px;
  z-index: 80;
`;


export const CurrentBetAmount = styled.span`
width: 252px;
color: aquamarine;
position: absolute;
top: 24%;
font-family: "Croissant One";
font-size: 38px;
line-height: 120%;
opacity: 1;
text-align: center;
`;


export const LastWin = styled.div`
    grid-area: -2 / 1 / -3 / 10;
    width: 100%;
    height: 40px;
    opacity: 1;
    position: absolute;
    z-index: 100;
    text-align: left;
    padding-top: 20px;
    padding-left: 5px;
`;


export const LastBet = styled.div`
    grid-area: -3 / 1 / -4 / 10;
    width: 100%;
    height: 40px;
    opacity: 1;
    position: absolute;
    z-index: 100;
    text-align: left;
    padding-top: 20px;
    padding-left: 5px;
`;

export const TotalBet = styled.div`
    grid-area: -2 / -1 / -3 / -8;
    width: 100%;
    height: 40px;
    opacity: 1;
    position: absolute;
    z-index: 100;
    text-align: left;
    padding-top: 20px;
`;



export const TotalBetStr = styled.span`
  width: 100%;
  color: lightcoral;
  font-family: "Gelasio";
  font-style: normal;
  font-weight: 800;
  font-size: 38px;
  line-height: 50%;
  text-align: center;
  color: aquamarine;
`;




export const Status = styled.div`
grid-area: 4 / 15 / 5 / 27;
width: 100%;
height: 40px;
opacity: 1;
position: relative;
z-index: 100;
text-align: center;
}
`;



export const StatusStr = styled.span`
  width: 100%;
  color: lightcoral;
  font-family: "Gelasio";
  font-style: normal;
  font-weight: ${props => props.gameStatus.includes("WIN") ? 800 : props.gameStatus.includes("RAISE" | "BET") ? 800  : 800};
  font-size: ${props => props.gameStatus.includes("WIN") ? "50px" : props.gameStatus.includes("RAISE" | "BET") ? "45px" : "40px"};
  line-height: 160%;
  text-align: center;
  color:${props => 
    props.gameStatus.includes("LOST") ? "red" 
    : props.gameStatus.includes("WIN") ? "greenyellow"
    : props.gameStatus.includes("RAISE" | "BET") ? "orange" 
    : props.gameStatus.includes("FOLD") ? "white" 
    : "yellow"
  };
`;


export const Hint = styled.div`
    grid-area: 22 / 18 / 23 / 24;
    width: 100%;
    height: 40px;
    opacity: 1;
    position: absolute;
    z-index: 100;
    text-align: center;
`;



export const HintStr = styled.span`
  width: 100%;
  color: lightcoral;
  font-family: "Gelasio";
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 160%;
  text-align: center;
  color:${props => 
    props.hint.includes("LOST") ? "red" 
    : props.hint.includes("WIN") ? "greenyellow"
    : props.hint.includes("RAISE" | "BET") ? "orange" 
    : props.hint.includes("FOLD") ? "white" 
    : "yellow"
  };
`;


export const GameId = styled.div`
    grid-area: -1 / 1 / -2 / 8;
    width: 100%;
    height: 40px;
    opacity: 1;
    position: absolute;
    z-index: 100;
    text-align: center;
`;



export const GameIdStr = styled.span`
  width: 100%;
  color: lightcoral;
  font-family: "Gelasio";
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 50%;
  text-align: center;
  color: white;
`;




export const Turn = styled.div`
  width: 485px;
  height: 379px;
  background: url(${glowImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: -47px;
  left: -43px;
  z-index: 70;
`;


export const BigBet = styled.div`
  width: 80px;
  height: 80px;
  background: url(${bigBetImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 57px;
  left: 1125px;
  z-index: 120;
`;


export const SmallBet = styled.div`
  width: 80px;
  height: 80px;
  background: url(${smallBetImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 57px;
  left: 1125px;
  z-index: 120;
`;

export const Dealer = styled.div`
  width: 80px;
  height: 80px;
  background: url(${dealerImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 57px;
  left: 1125px;
  z-index: 110;
`;
