import React from 'react'
import { Back, Clubs10, Clubs2, Clubs3, Clubs4, Clubs5, Clubs6, Clubs7, Clubs8, Clubs9, ClubsA, ClubsJ, ClubsK, ClubsQ } from './clubs/style'
import { Diamond10, Diamond2, Diamond3, Diamond4, Diamond5, Diamond6, Diamond7, Diamond8, Diamond9, DiamondA, DiamondJ, DiamondK, DiamondQ } from './diamond/style'
import { Hearts10, Hearts2, Hearts3, Hearts4, Hearts5, Hearts6, Hearts7, Hearts8, Hearts9, HeartsA, HeartsJ, HeartsK, HeartsQ } from './hearts/style'
import { Spade10, Spade2, Spade3, Spade4, Spade5, Spade6, Spade7, Spade8, Spade9, SpadeA, SpadeJ, SpadeK, SpadeQ } from './spade/style'



function Card({
    name = "xx",
    left = "652px",
    top = "432px"
}) {
    switch(name) {
        case 'c2' : return <Clubs2 left={left} top={top}  />
        case 'c3' : return <Clubs3 left={left} top={top}  />
        case 'c4' : return <Clubs4 left={left} top={top}  />
        case 'c5' : return <Clubs5 left={left} top={top}  />
        case 'c6' : return <Clubs6 left={left} top={top}  />
        case 'c7' : return <Clubs7 left={left} top={top}  />
        case 'c8' : return <Clubs8 left={left} top={top}  />
        case 'c9' : return <Clubs9 left={left} top={top}  />
        case 'c10' : return <Clubs10 left={left} top={top}  />
        case 'cJ' : return <ClubsJ left={left} top={top}  />
        case 'cQ' : return <ClubsQ left={left} top={top}  />
        case 'cK' : return <ClubsK left={left} top={top}  />
        case 'cA' : return <ClubsA left={left} top={top}  />

        case 'd2' : return <Diamond2 left={left} top={top}  />
        case 'd3' : return <Diamond3 left={left} top={top}  />
        case 'd4' : return <Diamond4 left={left} top={top}  />
        case 'd5' : return <Diamond5 left={left} top={top}  />
        case 'd6' : return <Diamond6 left={left} top={top}  />
        case 'd7' : return <Diamond7 left={left} top={top}  />
        case 'd8' : return <Diamond8 left={left} top={top}  />
        case 'd9' : return <Diamond9 left={left} top={top}  />
        case 'd10' : return <Diamond10 left={left} top={top}  />
        case 'dJ' : return <DiamondJ left={left} top={top}  />
        case 'dQ' : return <DiamondQ left={left} top={top}  />
        case 'dK' : return <DiamondK left={left} top={top}  />
        case 'dA' : return <DiamondA left={left} top={top}  />

        case 'h2' : return <Hearts2 left={left} top={top}  />
        case 'h3' : return <Hearts3 left={left} top={top}  />
        case 'h4' : return <Hearts4 left={left} top={top}  />
        case 'h5' : return <Hearts5 left={left} top={top}  />
        case 'h6' : return <Hearts6 left={left} top={top}  />
        case 'h7' : return <Hearts7 left={left} top={top}  />
        case 'h8' : return <Hearts8 left={left} top={top}  />
        case 'h9' : return <Hearts9 left={left} top={top}  />
        case 'h10' : return <Hearts10 left={left} top={top}  />
        case 'hJ' : return <HeartsJ left={left} top={top}  />
        case 'hQ' : return <HeartsQ left={left} top={top}  />
        case 'hK' : return <HeartsK left={left} top={top}  />
        case 'hA' : return <HeartsA left={left} top={top}  />

        case 's2' : return <Spade2 left={left} top={top}  />
        case 's3' : return <Spade3 left={left} top={top}  />
        case 's4' : return <Spade4 left={left} top={top}  />
        case 's5' : return <Spade5 left={left} top={top}  />
        case 's6' : return <Spade6 left={left} top={top}  />
        case 's7' : return <Spade7 left={left} top={top}  />
        case 's8' : return <Spade8 left={left} top={top}  />
        case 's9' : return <Spade9 left={left} top={top}  />
        case 's10' : return <Spade10 left={left} top={top}  />
        case 'sJ' : return <SpadeJ left={left} top={top}  />
        case 'sQ' : return <SpadeQ left={left} top={top}  />
        case 'sK' : return <SpadeK left={left} top={top}  />
        case 'sA' : return <SpadeA left={left} top={top}  />
        default :
            return <Back  left={left} top={top} />
    }

}

export default Card