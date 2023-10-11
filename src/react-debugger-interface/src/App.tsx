import Main from './components/Main'

import './App.css'
import { Data, DataContext } from './context'
import { useState } from 'react'

function App() {
  const [data, setData] = useState<Data[]>([])
  return (
    <DataContext.Provider value={{data, setData}}>
        <Main />
    </DataContext.Provider>
  )
}

export default App
