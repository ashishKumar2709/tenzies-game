import React from 'react'
import Dice from './Dice'
import {nanoid} from "nanoid"


function Main() {
    const[diceValue, setDiceValue]=React.useState(newDice())
    const[tenzies,setTenzies]=React.useState(false);
    const[rolls,setRolls]=React.useState(0)
    function newDiceValue(){
        return {value:Math.ceil(Math.random()*6),isHeld:false,id:nanoid()}
    }
    
    React.useEffect(()=>{
        const allHeld = diceValue.every(ele=>ele.isHeld)
        let val = diceValue[0].value;
        const allVal = diceValue.every(ele=>ele.value===val)
        if(allHeld&&allVal){
            setTenzies(true)
        }
    },[diceValue])

    function newDice(){
        let diceValues=[]
        let count = 0;
        while(count<10){ 
            diceValues.push(newDiceValue())
            count++;
        
        }
        return diceValues;
    }

    function rollDice(){
        setDiceValue(pre=>pre.map(ele=>{
            return tenzies?newDiceValue():ele.isHeld? ele:newDiceValue()
        }))
        setRolls(pre=>pre+1)
        setTenzies(pre=>pre?!pre:pre)
    }
    function holdDice(ids){
        
        setDiceValue(pre=>pre.map(ele=>{
                 
                return ele.id===ids? {...ele,isHeld:!ele.isHeld}:ele;
                
            })
            
        )
        
    }
    
    const diceElement = diceValue.map(ele=>
        <Dice 
         key={ele.id}
         value={ele.value}
         isHeld={ele.isHeld}
         holdDice={()=>holdDice(ele.id)}/>
         
    ) 
        
  return (
    <div className='main'>
        <h1 className='title'>Tenzies</h1>
        {tenzies?<h1 className='won'>You Won!!!</h1>:<p className='discrip'>Roll until all dice until values are same. Click each die to freeze it to the current value.</p>}
        {tenzies?<h3>Total rolls: {rolls}</h3>:""}
        <div>
            {diceElement}
        </div>
        <button className="rollbtn"onClick={rollDice}>{tenzies?"Reset":"Roll"}</button>
    </div>
  )
}

export default Main