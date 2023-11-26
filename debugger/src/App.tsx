import Main from './components/Main'

import './App.css'
import { Data, DataContext } from './context'
import { useState } from 'react'

function App() {
  const [data, setData] = useState<Data[]>([])
  const [current, setCurrent] = useState<Data | null>(null)
  return (
    <DataContext.Provider value={{data, setData, current, setCurrent}}>
        <Main />
    </DataContext.Provider>
  )
}

export default App
