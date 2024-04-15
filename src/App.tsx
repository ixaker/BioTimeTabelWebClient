import { useState, useEffect } from 'react'
import './App.css'
import Slider from './components/Slider/Slider'
import Table from './components/Table/Table'
import WebSocket from './components/WebSocket/WebSocket'
import { getCurrentDate, formatDate, increaseDate, decreaseDate } from './components/utils/dateUtils'
import { useAppContext } from './State/AppProvider'
import Modal from './components/Rodal/Modal'
import Loader from './components/Loader/Loader'

function App() {
  const { state } = useAppContext();
  const [date, setDate] = useState(getCurrentDate());
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  useEffect(() => {
    if (state.data.length > 0) {
      setIsDataLoaded(true);
    }
  }, [state.data]);

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
      <WebSocket 
        date={formatDate(date)}
      />
      {isDataLoaded 
        ?  <>
              
              <Slider handleSliderClick={handleSliderClick} date={formatDate(date)}/>
              <Table data={state.data}/>
              <Modal/>
          </>
      
        : <Loader/>
      }
      
    </>
  )
}

export default App