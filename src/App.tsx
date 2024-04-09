import './App.css'
import Header from './components/Header/Header'
import Table from './components/Table/Table'
import Slider from './components/Slider/Slider'
import jsonData from './assets/data.json'

function App() {
  
  return (
    <>
      <Header />
      <Slider />
      <Table data={jsonData} />
    </>
  )
}

export default App
