import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
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

  const handleDie = (e, id) => {
    setDie(old => old.map(item =>{
      return item.id === id ? {...item, isActive: !item.isActive} : item
    }))
  }
  const getRandom = (e, id) => {
    setDie(old => old.map(item =>{
      return item.isActive ? item : {id: nanoid() , value: Math.ceil(Math.random() * 6), isActive: false}
    }))

    
  }
  let i = 0;
  useEffect(() => {
    
    die.forEach(e => {
      if(e.isActive) i++;
    });

    if(i === 10) alert('you win')
  }, [die])

  const ref = () => {
    i = 0;
    setDie(RandomNum())
  }
  return (
    <div className="App">
      <h1>this is game</h1>
      <button onClick={ref}>Refresh</button>
      <Main die={die} handleDie={handleDie} random={getRandom} />
      
    </div>
  );
}

export default App;
