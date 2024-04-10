import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Slider from './components/Slider/Slider'
import Table from './components/Table/Table'
import WebSocket from './components/WebSocket/WebSocket'
import jsonData from './assets/data.json'
import jsonData2 from './assets/data2.json'
import getCurrentDate from './components/utils/getCurrentDate'
import { useAppContext } from './State/AppProvider'

function App() {
  const { state } = useAppContext();
  console.log(state);
  
  const [tableData, setTableData] = useState(jsonData);
  const [date, setDate] = useState<string>(getCurrentDate());
  
  
  const handleSliderClick = ({ number }: { number: number }) => {
    
    if (number === 1) {
      setTableData(jsonData)
      setDate('09.04.2024')
    } else {
      setTableData(jsonData2)
      setDate('11.04.2024')
    }
  };

  

  return (
    <>
      <WebSocket />
      <Header />
      <Slider handleSliderClick={handleSliderClick} date={date}/>
      <Table data={state.data}/>
    </>
  )
}

export default App