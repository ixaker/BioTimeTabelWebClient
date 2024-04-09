import './App.css'
import Header from './components/Header/Header'
import Table from './components/Table/Table'
import jsonData from './assets/data.json'

function App() {
  
  console.log(jsonData)

  return (
    <>
      <Header />
      <Table data={jsonData} />
    </>
  )
}

export default App
