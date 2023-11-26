import React, { useContext, useState } from 'react'

import './JsonViewer.css'

import ReactJson from 'react-json-view'
import { Data, DataContext } from '../context';
import { getObjectPaths } from '../utils/object';


const JsonViewer: React.FC = () => {
  const { setData, current, setCurrent } = useContext(DataContext)
  const [search, setSearch] = useState('');
  const paths = current ? getObjectPaths(current as Record<string, unknown>) : []
  const json = search ? paths.filter((path) => path.includes(search)) : current;
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { diff, type, date, ...rest } = json || {} as Data

  const handleClean = () => {
    setData([]);
    setCurrent({});
  }

  return (
    <div id="container">
      <input name="myInput" placeholder='Search Path (separator: ".")' onChange={(e) => setSearch(e.target.value)} />
      <div id="data-wrapper">
        {json ? 
          <ReactJson src={rest} onEdit={search ? false : (edit) => console.log(edit)} name={null} /> : 
          <h1>no data to be shown</h1>
        }
        <button onClick={handleClean}>clear</button>
      </div>
    </div>
  )
}

export default JsonViewer;
