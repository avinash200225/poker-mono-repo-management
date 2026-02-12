import React, { useEffect, useState, useRef } from 'react'
import Card from '../Card'
import { Back, Clubs10, Clubs2, Clubs3, Clubs4, Clubs5, Clubs6, Clubs7, Clubs8, Clubs9, ClubsA, ClubsJ, ClubsK, ClubsQ } from './clubs/style'
import { Diamond10, Diamond2, Diamond3, Diamond4, Diamond5, Diamond6, Diamond7, Diamond8, Diamond9, DiamondA, DiamondJ, DiamondK, DiamondQ } from './diamond/style'
import { Hearts10, Hearts2, Hearts3, Hearts4, Hearts5, Hearts6, Hearts7, Hearts8, Hearts9, HeartsA, HeartsJ, HeartsK, HeartsQ } from './hearts/style'
import { Spade10, Spade2, Spade3, Spade4, Spade5, Spade6, Spade7, Spade8, Spade9, SpadeA, SpadeJ, SpadeK, SpadeQ } from './spade/style'

const DraggableComponent = ({
    left, 
    top
}) => {
    const [pressed, setPressed] = useState(false)
    const [position, setPosition] = useState({x: 0, y: 0})
    const ref = useRef();
  
    // Monitor changes to position state and update DOM
    useEffect(() => {
      if (ref.current) {
        ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
      }
    }, [position])
  
    // Update the current position if mouse is down
    const onMouseMove = (event) => {
        console.log(event)

        const {
            clientY,
            clientX,
            target: { offsetHeight, offsetTop }
          } = event.touches[0];


      if (pressed) {
        setPosition({
          x: 0,
          y: clientY + 95  - top 
        })
      }
    }
  
    // Update the current position if mouse is down
    const onMouseEnd = (event) => {
      if (pressed) {
        setPosition({
          x: 0,
          y: 0
        })
      }
      setPressed(false)
    }
  
    return (
      <Back
        ref={ref}
        left={`${left - 3}px`} 
        top={`${top}px`}
        onTouchMove={ onMouseMove }
        onTouchStart={ () => setPressed(true) }
        onContextMenu={(e)=> e.preventDefault()}
        onTouchEnd={ onMouseEnd }>
      </Back>
    )
  }


function DraggableCard({
    name = "xx",
    left = 652,
    top = 432
}) {

    return (
        <React.Fragment>
             <Card name={name} left={`${left}px`} top={`${top}px`}/>
             <DraggableComponent  left={left} top={top} />
        </React.Fragment>
    )

}

export default DraggableCard