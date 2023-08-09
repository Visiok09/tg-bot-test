import React, { useEffect } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import {Route, Routes} from 'react-router'
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';

const App = () => {
  const {onToggleButton, tg} = useTelegram();
  useEffect( ()=>{
    tg.ready();
  }, [])
  
  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route index element={<ProductList/>} />
        <Route path={'/form'} element={<Form/>}/>
      </Routes>
    </div>
  )
}

export default App