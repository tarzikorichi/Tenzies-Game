import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti'

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
    }
    
    if(Inc.length >= 4){
      if(Inc.every(d => d === Inc[0])){
        setGameLos(gameLos+1)
        setInc([])
      }else{
        setInc([])
      }
    }

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
  }
  return (
    <div className="App">
      {conff && <Confetti className='conf' width="700" height="650"/>}
      <h1>this is game</h1>
      <div className='Info'> 
        <h2>{gameLos}</h2>
        <button onClick={ref}>Refresh</button> 
      </div>
      <Main die={die} handleDie={handleDie} random={getRandom} />
      
    </div>
  );
}

export default App;
