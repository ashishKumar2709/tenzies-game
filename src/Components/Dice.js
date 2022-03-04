import React from 'react'

function Dice(props) {
    const styles = {backgroundColor:props.isHeld?"lightgreen" : "white"}

  return (
    
    <div className="dice"style={styles}onClick={props.holdDice}>
        <div>{props.value}</div>
    </div>
  )
}

export default Dice