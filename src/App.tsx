import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Slider from './components/Slider/Slider'
import Table from './components/Table/Table'
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import jsonData from './assets/data.json'
import jsonData2 from './assets/data2.json'
function App() {
  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState([]);
  const [postId, setPostId] = useState(1);
  const { isLoading, error, data } = useQuery(['userData', postId], async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
  
  const handleSliderClick = ({ number }) => {
    setPostId(number);
    if (number === 1) {
      setTableData(jsonData)
      setDate('09.04.2024')
    } else {
      setTableData(jsonData2)
      setDate('10.04.2024')
    }
  };

  return (
    <>
      <Header />
      <Slider handleSliderClick={handleSliderClick} date={date}/>
      <Table data={tableData}/>
    </>
  )
}

export default App