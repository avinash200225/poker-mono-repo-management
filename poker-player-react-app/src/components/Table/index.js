import React from 'react'
import { Wrap, WrapItem } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { formatRupee } from '../../utils/functions/formatRupee'
import Card from '../Card'
import { 
    CancelGameBtn,
    ContinueBtn,
    DealerImage,
    FlopCard1, 
    FlopCard2, 
    FlopCard3, 
    GameMessage, 
    MainPotImage, 
    MainPotMeter, 
    MainPotMeterImage, 
    NewGameBtn, 
    NewGameText, 
    ReElectionBtn, 
    RiverCard, 
    SkipElectionBtn, 
    TableHeader, 
    TurnCard ,
    WagerMeter,
    TableLimitsText,
    GameTypeText,
    RakeText,
    GameIdText,
    SidePotsArea,
    BtnTxt,
    BtnTxtAmount,
} from './style'




function Table({
    roundId = 0,
    sidePots = [],
    action = "",
    gameType,
    rake,
    blind,
    potAmount,
    tableWager,
    gameCards,
    stage = "1" ,
    electDealer,
    cancelGame,
    newGame,
    selected
}) {


  return (
    <React.Fragment>
        {/* <GameMessage>{`${action}`}</GameMessage> */}
        {/* <MainPotImage /> */}
        {/* <MainPotMeterImage /> */}
        {/* <MainPotMeter>₹{potAmount}</MainPotMeter> */}
        {/* <WagerMeter>₹{tableWager}</WagerMeter> */}


        <GameTypeText>Type: {gameType}</GameTypeText>
        <TableLimitsText>Blind: ₹{blind/2}-₹{blind}</TableLimitsText>
        <RakeText>Rake: {rake}%</RakeText>
        <GameIdText>Game Id: {roundId}</GameIdText>

        {
        sidePots.length > 0
        ? <SidePotsArea>
            <Wrap>
              {
                sidePots.map((item, index) => (
                  <WrapItem key={index}>
                    <Center w={'250px'} h='100px' bg={'darkseagreen'} style={{flexDirection: 'column', borderRadius: '45%'}}>
                      <BtnTxt style={{width: '100px', color: 'brown', fontWeight: '800'}}>{formatRupee(item.capAmount * item.ids.length + item.foldAmount)}</BtnTxt>
                      <BtnTxtAmount style={{width: '250px', color: 'darkgreen', fontWeight: '800'}}>[{item.ids.map(id => {return String(id + 1) + ","})}]</BtnTxtAmount>
                    </Center>
                  </WrapItem>
                ))
              }
            </Wrap>
          </SidePotsArea>
        : potAmount != 0
        ? <SidePotsArea>
            <Wrap>
              <WrapItem>
                <Center w={'250px'} h='100px' bg={'darkseagreen'} style={{flexDirection: 'column', borderRadius: '45%'}}>
                  <BtnTxt style={{width: '100px', color: 'brown', fontWeight: '800'}}>{formatRupee(potAmount)}</BtnTxt>
                  <BtnTxtAmount style={{width: '250px', color: 'darkgreen', fontWeight: '800'}}>[]</BtnTxtAmount>
                </Center>
              </WrapItem>
            </Wrap>
          </SidePotsArea>
        :null
        }


        {gameCards[0] ? <Card name={gameCards[0]} left={"572px"}/> : <FlopCard1 />}
        {gameCards[1] ? <Card name={gameCards[1]} left={"712px"}/> : <FlopCard2 />}
        {gameCards[2] ? <Card name={gameCards[2]} left={"852px"}/> : <FlopCard3 />}
        {gameCards[3] ? <Card name={gameCards[3]} left={"1002px"}/> : <TurnCard />}
        {gameCards[4] ? <Card name={gameCards[4]} left={"1152px"}/> : <RiverCard />}
        
    </React.Fragment>
  )
}

export default Table