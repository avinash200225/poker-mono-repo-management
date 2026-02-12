import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import balanceImage from "../../assets/images/balance.png";
import statusImage from "../../assets/images/balance.png";
import roundBetsImage from "../../assets/images/roundBets.png";
import cardImage from "../../assets/images/card.jpeg";
// import cardImage from "../../assets/images/cards/back.png";
import dealerImage from "../../assets/images/DealerImg.png";
import bigBetImage from "../../assets/images/bb.png";
import smallBetImage from "../../assets/images/smb.png";
import glowImage from "../../assets/images/glow.png";

const rotate = keyframes`
  0%, 25%, {
    border-image-source: linear-gradient(to top, #BF953F, #FCF6BA, #B38728);
    border-width: 5px;
  }

  25%, 50% {
    border-image-source: linear-gradient(to right, #BF953F, #FCF6BA, #B38728);
    border-width: 5px;
  }

  50%, 75% {
    border-image-source: linear-gradient(to right, #BF953F, #FCF6BA, #B38728);
    border-width: 5px;
  }

  75%, 100% {
    border-image-source: linear-gradient(to top, #BF953F, #FCF6BA, #B38728);
    border-width: 5px;
  }
`

export const BorderElement = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: ${props => props.width ? props.width : "130px"};
  height: ${props => props.height ? props.height : "190px"};

  left:  ${props => props.left ? props.left : "652px"};
  top: ${props => props.top ? props.top : "502px"};

  border: 10px solid;
  border-image-slice: 1;
  border-width: 5px;
  border-image-source: linear-gradient(to top, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
  
  animation: ${rotate} 2s ease infinite;

`;

export const PlayerNameHeaderMirror = styled.div`
  width: 150px;
  height: 40px;
  opacity: 1;
  position: absolute;
  top: 26px;
  left: 80px;
  z-index: 102;
`;


export const PlayerNameHeader = styled.div`
  width: 150px;
  height: 40px;
  opacity: 1;
  position: absolute;
  top: 26px;
  left: 326px;
  z-index: 102;
`;

export const PlayerNameStr = styled.span`
  position: absolute;
  font-weight: bold;
  font-size: 1.5rem;
  color: antiquewhite;
  text-transform: uppercase;
`;



export const Status = styled.div`
  width: max-content;
  min-width: 170px;
  height: 26px;
  opacity: 1;
  position: absolute;
  top: 55px;
  left: 242px;
  z-index: 102;
  text-align: center;
  // background: crimson;
  background: linear-gradient(to left, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);;
  background: linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c);
  background: ${props => 
    props.gameStatus.includes("LOST") ? "linear-gradient(45deg, red 0 50%, lightgrey 50% 100%);" 
    : props.gameStatus.includes("WIN") ? "linear-gradient(to left top, #BF953F, #FCF6BA, #B38728);"
    : props.gameStatus.includes("FOLD") ? "linear-gradient(45deg, grey 0 50%, grey 50% 100%);" 
    : "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)"
  };
`;

export const StatusMirror = styled.div`
    width: max-content;
    min-width: 170px;
    height: 26px;
    opacity: 1;
    position: absolute;
    top: 55px;
    left: -5px;
    z-index: 102;
    text-align: center;
    // background: crimson;
    background: linear-gradient(to left, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
    background: linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c);
    background: ${props => 
      props.gameStatus.includes("LOST") ? "linear-gradient(45deg, red 0 40%, lightgrey 40% 100%);" 
      : props.gameStatus.includes("WIN") ? "linear-gradient(to left top, #BF953F, #FCF6BA, #B38728);"
      : props.gameStatus.includes("FOLD") ? "linear-gradient(45deg, grey 0 50%, grey 50% 100%);" 
      : "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)"
    };
`;

export const StatusStr = styled.span`
    width: 100%;
    font-style: normal;
    font-weight: ${props => props.gameStatus.includes("WIN") ? 800 : props.gameStatus.includes("RAISE" | "BET") ? 800  : 800};
    font-size: ${props => props.gameStatus.includes("WIN") ? "1.4rem" : props.gameStatus.includes("RAISE" | "BET") ? "1.4rem" : "1rem"};
    color:${props => 
      props.gameStatus.includes("LOST") ? "darkblue" 
      : props.gameStatus.includes("WIN") ? "darkblue"
      : props.gameStatus.includes("RAISE" | "BET") ? "orange" 
      : props.gameStatus.includes("FOLD") ? "black" 
      : "antiquewhite"
    };
`;

export const Balance = styled.div`
  position: absolute;
  width: min-content;
  text-align: center;
  top: ${props => props.top ? props.top :  "170px"};
  left: 274px;
  z-index: 102;

`;


export const BalanceMirror = styled.div`
  position: absolute;
  width: min-content;
  text-align: center;
  top: ${props => props.top ? props.top :  "170px"};
  left: 34px;
  z-index: 102;
`;


export const BalanceAmount = styled.span`
    font-family: 'Rubik';
    font-weight: 600;
    font-size: 1.6rem;
    color: antiquewhite;
`;



export const CurrentBetContainer = styled.div`
  width: 170px;
  height: 35px;
  opacity: 1;
  position: absolute;
  top: 84px;
  left: 300px;
  z-index: 80;
`;

export const CurrentBetContainerMirror = styled.div`
  width: 170px;
  height: 35px;
  opacity: 1;
  position: absolute;
  top: 84px;
  left: 5px;
  z-index: 80;
`;

export const CurrentBetAmount = styled.span`
  width: 142px;
  color: rgb(255, 255, 255);
  position: absolute;
  font-family: monospace;
  font-size: 30px;
  opacity: 1;
  text-align: left;
  padding-left: 5px;
  color: aqua;
`;



export const CurrentBet = styled.div`
  width: 170px;
  height: 35px;
  background: url(${roundBetsImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 80;
`;




export const HandContainer = styled.div`
  position: relative;
  width: 90px;
  height: 120px;
  opacity: 1;
  top: 102px;
  left: 270px;
  z-index: 80;
  scale: 1;
`;

export const HandContainerMirror = styled.div`
  position: relative;
  width: 90px;
  height: 120px;
  opacity: 1;
  top: 102px;
  left: 25px;
  z-index: 80;
  scale: 1;
`;

export const CardBack = styled.div`
position: absolute;
  width: 91px;
  height: 133px;
  background: url(${cardImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  opacity: 1;
  top: ${props => props.top};
  left: ${props => props.left};
  scale: 1;
`;

export const Card1 = styled.div`
  width: 91px;
  height: 133px;
  background: url(${cardImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  opacity: 1;
  position: absolute;
  top: -20px;
  left: -30px;
  scale: 1;
`;

export const Card2 = styled.div`
  width: 91px;
  height: 133px;
  background: url(${cardImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  opacity: 1;
  position: absolute;
  top: -20px;
  left: 62px;
  scale: 1;
`;


export const BigBet = styled.div`
  width: 70px;
  height: 70px;
  background: url(${bigBetImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 17px;
  left: 235px;
  z-index: 120;
`;

export const BigBetMirror = styled.div`
  width: 70px;
  height: 70px;
  background: url(${bigBetImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 17px;
  left: 80px;
  z-index: 120;
`;


export const SmallBet = styled.div`
  width: 70px;
  height: 70px;
  background: url(${smallBetImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 17px;
  left: 235px;
  z-index: 120;
`;

export const SmallBetMirror = styled.div`
  width: 70px;
  height: 70px;
  background: url(${smallBetImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 17px;
  left: 80px;
  z-index: 120;
`;






export const Dealer = styled.div`
  width: 70px;
  height: 70px;
  background: url(${dealerImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  opacity: 1;
  position: absolute;
  left: 390px;
  top: 122px;
  z-index: 110;
`;

export const DealerMirror = styled.div`
  width: 70px;
  height: 70px;
  background: url(${dealerImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  opacity: 1;
  position: absolute;
  left: 390px;
  top: 122px;
  z-index: 110;
`;




export const Turn = styled.div`
  width: 485px;
  height: 379px;
  background: url(${glowImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: .5;
  position: absolute;
  top: -137px;
  left: 147px;
  z-index: 70;
`;

export const VideoArea = styled.div`
    position: absolute;
    width: 320px;
    height: 320px;
    top: -37px;
    left: 187px;
    z-index: 80;
`;

export const VideoAreaMirror = styled.div`
  position: absolute;
  width: 320px;
  height: 320px;
  top: -37px;
  left: 187px;
  z-index: 80;
`;

export const TurnVideoArea = styled.div`
    position: absolute;
    top: ${props => props.top ? props.top : "-37px"};
    left: ${props => props.left? props.left: "187px"};
    width: ${props => props.width ? props.width :"320px"};
    height: ${props => props.height ? props.height : "320px"};
    z-index: 80;
`;

export const TurnVideoAreaMirror = styled.div`
  position: absolute;
  top: ${props => props.top ? props.top : "-37px"};
  left: ${props => props.left? props.left: "187px"};
  width: ${props => props.width ? props.width :"320px"};
  height: ${props => props.height ? props.height : "320px"};
  z-index: 80;
`;

export const TurnMirror = styled.div`
  width: 485px;
  height: 379px;
  background: url(${glowImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: .5;
  position: absolute;
  top: -147px;
  left: -93px;
  z-index: 70;
`;

export const StatusIcon = styled.div`
    position: absolute;
    // top: 23px;
    // left: 437px;
    left:  ${props => props.left ? props.left : "437px"};
    top: ${props => props.top ? props.top : "23px"};
    z-index: 70;
    width: 48px;
    height: 48px;
`;

export const CheckIconMirror = styled.div`
  position: absolute;
  top: -147px;
  left: -93px;
  z-index: 70;
`;
