import React from 'react'
import {formatRupee} from '../../utils/functions/formatRupee'

import Fold from '../../primitives/Fold'
import Check from '../../primitives/Check'
import AllIn from '../../primitives/AllIn'
import Call from '../../primitives/Call'
import Bet from '../../primitives/Bet'
import Raise from '../../primitives/Raise'
import { BetIcon, BetIconMirror, StatusIcon } from './style'


function Pocket(props) {
    const {
        id,
        bets,
        gameStatus,
        left,
        top,
        checkButtonRefs,
        allInButtonRefs,
        callButtonRefs,
        betButtonRefs,
        raiseButtonRefs,

    } = props

    const right = [1,2,3,4].includes(id)

    return (
        <> {
            gameStatus.toUpperCase().includes('FOLDED') ? <StatusIcon color={"red"}
                left={left}
                top={top}><Fold/></StatusIcon> : null
        }
            {
            gameStatus.toUpperCase().includes('CHECKED') ? <StatusIcon color={"darkturquoise"}
                left={left}
                top={top}><Check id={id}
                    ref={checkButtonRefs}/></StatusIcon> : null
        }

            {
            gameStatus.toUpperCase().includes('ALL IN') ?
            right ? 
            <BetIconMirror color={"red"}
                left={left}
                top={top}>
                <AllIn id={id}
                    ref={allInButtonRefs}/>    
                <span style={
                    {
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'end'
                    }
                }>
                    {
                    formatRupee(bets[0])
                } </span>
            </BetIconMirror>
            :<BetIcon color={"red"}
                left={left}
                top={top}>
                <span style={
                    {
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'end'
                    }
                }>
                    {
                    formatRupee(bets[0])
                } </span>
                <AllIn id={id}
                    ref={allInButtonRefs}/>
            </BetIcon> : null
        }

            {
            gameStatus.toUpperCase().includes('CALLED') ? 
            right ?
            <BetIconMirror color={"darkturquoise"}
                left={left}
                top={top}>
                <Call id={id}
                    ref={callButtonRefs}/>
                <span style={
                    {
                        display: 'inline-flex',
                        alignItems: 'center'
                    }
                }>
                    {
                    formatRupee(bets[0])
                } </span>
                
            </BetIconMirror>
            :<BetIcon color={"darkturquoise"}
                left={left}
                top={top}>
                <span style={
                    {
                        display: 'inline-flex',
                        alignItems: 'center'
                    }
                }>
                    {
                    formatRupee(bets[0])
                } </span>
                <Call id={id}
                    ref={callButtonRefs}/>
            </BetIcon> : null
        }
            {
            gameStatus.toUpperCase().includes('BET') || gameStatus.toUpperCase().includes('SB') ?
            right ?
            <BetIconMirror color={"yellow"}
                left={left}
                top={top}>
                <Bet id={id}
                    ref={betButtonRefs}/>    
                <span style={
                    {
                        display: 'inline-flex',
                        alignItems: 'center'
                    }
                }>
                    {
                    formatRupee(bets[0])
                } </span>
                
            </BetIconMirror>
            :<BetIcon color={"yellow"}
                left={left}
                top={top}>
                <span style={
                    {
                        display: 'inline-flex',
                        alignItems: 'center'
                    }
                }>
                    {
                    formatRupee(bets[0])
                } </span>
                <Bet id={id}
                    ref={betButtonRefs}/>
            </BetIcon> : null
        }
            {
            gameStatus.toUpperCase().includes('RAISE') || gameStatus.toUpperCase().includes('BB') ? 
            right ?
            <BetIconMirror color={"orange"}
                left={left}
                top={top}>
                <Raise id={id}
                    ref={raiseButtonRefs}/>    
                <span style={
                    {
                        display: 'inline-flex',
                        alignItems: 'center'
                    }
                }>
                    {
                    formatRupee(bets[0])
                } </span>
                
            </BetIconMirror>
            :<BetIcon color={"orange"}
                left={left}
                top={top}>
                <span style={
                    {
                        display: 'inline-flex',
                        alignItems: 'center'
                    }
                }>
                    {
                    formatRupee(bets[0])
                } </span>
                <Raise id={id}
                    ref={raiseButtonRefs}/>
            </BetIcon> : null
        } </>
    )
}

export default Pocket
