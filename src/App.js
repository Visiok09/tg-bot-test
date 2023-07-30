import React, { useEffect } from 'react'
import './App.css'
import { useTelegram } from './components/hooks/useTelegram';
import Header from './components/Header/Header';
import Button from './components/Button/Button';

const App = () => {
  const {onToggleButton, tg} = useTelegram();
  useEffect( ()=>{
    tg.ready();
  }, [])
  
  return (
    <div className='App'>
      <Header/>
    <Button onClick={onToggleButton}>Toggle</Button>
    </div>
  )
}

export default App