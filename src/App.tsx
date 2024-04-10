import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Slider from './components/Slider/Slider'
import Table from './components/Table/Table'
import WebSocket from './components/WebSocket/WebSocket'
import { getCurrentDate, formatDate, increaseDate, decreaseDate } from './components/utils/dateUtils'
import { useAppContext } from './State/AppProvider'
import jsonData from './assets/data.json'

function App() {
  const { state } = useAppContext();
  console.log(state);
  
  const [tableData, setTableData] = useState(jsonData);
  const [date, setDate] = useState(getCurrentDate());
  
  
  const handleSliderClick = (update: 'increase' | 'decrease') => {
    if (update === 'increase') {
      console.log('Increasing Date...');
      setDate(increaseDate(date))
      console.log(formatDate(date));
      
    } else {
      setDate(decreaseDate(date));
      console.log(formatDate(date));
    }
  };

  return (
    <>
      <WebSocket date={formatDate(date)}/>
      <Header />
      <Slider handleSliderClick={handleSliderClick} date={formatDate(date)}/>
      <Table data={state.data}/>
    </>
  )
}

export default App