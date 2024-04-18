import { useState, useMemo } from 'react'
import './App.css'
import Slider from './components/Slider/Slider'
import Table from './components/Table/Table'
import WebSocket from './components/WebSocket/WebSocket'
import { getCurrentDate, formatDate, increaseDate, decreaseDate } from './components/utils/dateUtils'
import Modal from './components/Rodal/Modal'
import Loader from './components/Loader/Loader'
import LoaderDisconect from './components/Loader/LoaderDisconect'
import DataLoadingComponent from './components/DataLoadingComponent/DataLoadingComponent'
// import ScreenWakeLock from './components/WakeLock/WakeLock'

function App() {
  const [date, setDate] = useState(getCurrentDate());
  // const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [isSocketDisconnect, setIsSocketDisconnect] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // const memoizedState = useMemo(() => ({ date, isDataLoaded }), [date, isDataLoaded]);
  const memoizedDate = useMemo(() => formatDate(date), [date]);
  const isDataLoaded = DataLoadingComponent();
  console.log('App start');
  
  // useEffect(() => {
  //   if (state.data.length > 0) {
  //     setIsDataLoaded(true);
  //   }
  // }, [state.data]);

  const handleSliderClick = (update: 'increase' | 'decrease') => {
    if (update === 'increase') {
      setDate(increaseDate(date))
    } else {
      setDate(decreaseDate(date));
    }
  };

  return (
    <>
      <WebSocket
        date={memoizedDate}
        onSocketDisconnected={() => setIsSocketDisconnect(true)}
        onSocketConnected={() => setIsSocketDisconnect(false)}
        setDate={setDate}
        setSelectedId={setSelectedId}
      />
      {/* <ScreenWakeLock/> */}
      {isDataLoaded
        ? <>
          <Slider
            handleSliderClick={handleSliderClick} 
            date={memoizedDate} 
          />
          <Table
            selectedId={selectedId}
          />
          <Modal />
        </>
        : <Loader />
      }

      {isSocketDisconnect
        ? <LoaderDisconect />
        : null
      }

    </>
  )
}


export default App

