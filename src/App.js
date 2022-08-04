import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti'
import { useStopwatch } from 'react-timer-hook';
import './App.css';
import Main from './Main'
function App() {
  const RandomNum = () => {
    const newDies = [];
    for(let i = 0; i< 10; i++){
      newDies.push({id: nanoid() ,value: Math.ceil(Math.random() * 6), isActive: false})
    }
    return newDies
  }

  const [die, setDie] = useState(RandomNum())
  const [gameLos, setGameLos] = useState(10)
  const [conff, setConff] = useState(false)
  const [Inc, setInc] = useState([])
  const [Top, setTop] = useState({h: 59, m: 59, s: 59})
  
  const handleDie = (e, id) => {
    
    setDie(old => old.map(item =>{
      // return item.id === id ? {...item, isActive: !item.isActive} : item
      if(item.id === id){
        setInc([...Inc,item.value])
        return {...item, isActive: !item.isActive}
      } 
      return item
    }))
  }
  const getRandom = (e, id) => {
    setGameLos(gameLos - 1);
    setInc([])
    setDie(old => old.map(item =>{
      return item.isActive ? item : {id: nanoid() , value: Math.ceil(Math.random() * 6), isActive: false}
    }))

    
  }
  console.log(Inc)
  useEffect(() => {
    console.log(gameLos)
    if (die.every(d => d.isActive) && die.every(d => d.value === die[0].value)){
      setConff(true)
      setTop(prev => {
        if(prev.h > hours){
          return {h: hours, m: minutes, s: seconds}
        }else if(prev.m > minutes){
          return {h: hours, m: minutes, s: seconds}
        }else if(prev.s >seconds) return {h: hours, m: minutes, s: seconds}
      })
      pause()
    }
    
    if(Inc.length >= 4){
      if(Inc.every(d => d === Inc[0])){
        setGameLos(gameLos+1)
        setInc([])
      }else{
        setInc([])
      }
    }



    /*
    1- put real dots in dice
    2- track the number of rolls
    3- track the  time it took to win 
    4- save you best time to localst
    
    */ 

    if(gameLos === 0){
      alert('Oh you lost, try again')
      ref()
    }
  }, [die])


  const ref = () => {
    setDie(RandomNum())
    setGameLos(10)
    setConff(false)
    setInc([])
    reset()
  }

// timer
const time = new Date();
time.setSeconds(time.getSeconds() + 600); // 10 minutes timer 
const {
  seconds,
  minutes,
  hours,
  days,
  isRunning,
  start,
  pause,
  reset,
} = useStopwatch({ autoStart: false });


  return (
    <div className="App">
      {conff && <Confetti className='conf' width="700" height="650"/>}
      <h1>this is game</h1>
      <div className='Info'> 
        <div className='plyes'>
          <h2>{hours}:{minutes}:{seconds}</h2>
          <h2>{gameLos}</h2>
          <h2>top: {Top.h}:{Top.m}:{Top.s}</h2>
        </div>
        <div className='plyes'>
          <button className='btn2' onClick={start}>Start</button> 
          <button className='btn2' onClick={ref}>Refresh</button> 
          <button className='btn2' onClick={ref}>Save Information</button> 
        </div>
      </div>
      <Main die={die} handleDie={handleDie} random={getRandom} />
      
    </div>
  );
}

export default App;
