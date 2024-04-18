import { useState, useEffect, useMemo } from 'react'
import './App.css'
import Slider from './components/Slider/Slider'
import Table from './components/Table/Table'
import WebSocket from './components/WebSocket/WebSocket'
import { getCurrentDate, formatDate, increaseDate, decreaseDate } from './components/utils/dateUtils'
import { useAppContext } from './State/AppProvider'
import Modal from './components/Rodal/Modal'
import Loader from './components/Loader/Loader'
import LoaderDisconect from './components/Loader/LoaderDisconect'
// import ScreenWakeLock from './components/WakeLock/WakeLock'

function App() {
  const { state } = useAppContext();
  const [date, setDate] = useState(getCurrentDate());
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [isSocketDisconnect, setIsSocketDisconnect] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const memoizedState = useMemo(() => ({ date, isDataLoaded }), [date, isDataLoaded]);


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

  const memoizedDate = useMemo(() => date, [date]);
  console.log(memoizedDate);
  

  return (
    <>
      <WebSocket 
        date={formatDate(memoizedDate)}
        onSocketDisconnected={() => setIsSocketDisconnect(true)}
        onSocketConnected={() => setIsSocketDisconnect(false)}
        setDate={setDate}
        setSelectedId={setSelectedId}
      />
      {/* <ScreenWakeLock/> */}
      {memoizedState.isDataLoaded 
      ? <>
          <Slider handleSliderClick={handleSliderClick} date={formatDate(memoizedState.date)}/>
          <Table 
            data={state.data}
            selectedId={selectedId}
          />
          <Modal/>
        </>
      : <Loader/>
    }
    
    {isSocketDisconnect 
      ? <LoaderDisconect />
      : null 
    }
    
    </>
  )
}

export default App