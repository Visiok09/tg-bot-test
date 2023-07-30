import React, { useEffect } from 'react'
import './App.css'
import { useTelegram } from './components/hooks/useTelegram';
import Header from './components/Header/Header';

const App = () => {
  const {onToggleButton, tg} = useTelegram();
  useEffect( ()=>{
    tg.ready();
  }, [])
  
  return (
    <div className='App'>
      <Header/>
    <button onClick={onToggleButton}>Toggle</button>
    </div>
  )
}

export default App