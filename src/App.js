import './App.css';
import React from "react"
import Die from "./Die"
import Confetti from 'react-confetti'

function App() {
const [dice,setDice]=React.useState
(JSON.parse(localStorage.getItem('dieArray')) || allNewDice())

const [tenzies,setTenzies]=React.useState
(JSON.parse(localStorage.getItem('tenzies')) || false)

const [count,setCount]=React.useState(JSON.parse(localStorage.getItem('count')) || 0);

const [score,setScore]=React.useState(JSON.parse(localStorage.getItem('score')) || null)







React.useEffect(()=>{
 localStorage.setItem("dieArray" ,JSON.stringify(dice))
 localStorage.setItem("tenzies",JSON.stringify(tenzies))
 localStorage.setItem("count",JSON.stringify(count))
 localStorage.setItem('score',JSON.stringify(score))
 
const allheld=dice.every(die=>die.isheld)
const allNumbersEqual=dice.every(die=>die.value===dice[0].value)
if(allheld && allNumbersEqual){
  setTenzies(true);
}
},[dice,count,tenzies,score])


function randomNumber(){
  return Math.ceil(Math.random() * 6);
}

function allNewDice(){
  const die=[];
  for(let i=0;i<10;i++){
    die.push({value:randomNumber(),
              id:i+1,
              isheld:false
    })

  }
  return die;
}

function rollDice(){
  if(!tenzies){
    
    setDice(prevDice=>prevDice.map((die,i)=>{
    return  die.isheld ? die : {value: randomNumber(),held:false,id:i+1}
    }))
    setCount(prevCount=>prevCount+1);
  }
  else{
    
    setDice(allNewDice())
    setTenzies(false)
    setCount(0);
    setScore(prevScore=> (prevScore > count) ? count
     : (prevScore || count) )

  }
  
}

function holdingDie(id){
  
  setDice(prevDice=>prevDice.map(die=>{
     return die.id===id ? 
     {...die,isheld:!die.isheld} : 
     die
    })
  )
}

const dieElements=dice.map((die)=>{
  return(<Die 
    key={die.id} 
    {...die} 
    holdingDie={()=>holdingDie(die.id)} />)
  
})




  return (

  
    <div className="App">
    <main>
      {tenzies && <Confetti/>}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        
        <div className="die-container">{dieElements}</div>

        <button onClick={rollDice}>
          {tenzies ? "Reset": "Roll"  }
        </button>
        <div> You need  lessthan {score} Rolls to beat previous challenge</div>
        <small>Number of Rolls :{count}</small>
    </main>  
    </div>
  );
}

export default App;
