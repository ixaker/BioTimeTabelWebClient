import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Slider from './components/Slider/Slider'
import Table from './components/Table/Table'
import WebSocket from './components/WebSocket/WebSocket'
import { getCurrentDate, formatDate, increaseDate, decreaseDate } from './components/utils/dateUtils'
import { useAppContext } from './State/AppProvider'
import Modal from './components/Rodal/Modal'

function App() {
  const { state } = useAppContext();
  console.log(state);
  const [date, setDate] = useState(getCurrentDate());
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    setShowModal(state.modal.visible)
  }, [state.modal.visible])

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
        setShowModal={setShowModal}
      />
      <Header />
      <Slider handleSliderClick={handleSliderClick} date={formatDate(date)}/>
      <Table data={state.data}/>
      <Modal
        
        onClose={() => setShowModal(false)}
        
      />
    </>
  )
}

export default App