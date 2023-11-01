/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext, useState } from 'react'

import './JsonViewer.css'

import ReactJson from 'react-json-view'
import { DataContext } from '../context';

const getPaths = (obj: Record<string, unknown>, parentKey: string = ''): string[] => {
  let paths: string[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentPath = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // @ts-ignore
        const nestedPaths = getPaths(obj[key], currentPath);
        paths = paths.concat(nestedPaths);
      } else {
        const fullPath = currentPath + '.' + obj[key];
        paths.push(fullPath);
      }
    }
  }

  return paths;
};

const JsonViewer: React.FC = () => {
  const { setData, current, setCurrent } = useContext(DataContext)
  const [search, setSearch] = useState('');
  const paths = current ? getPaths(current as Record<string, unknown>) : []
  const json = search ? paths.filter((path) => path.includes(search)) : current;

  const handleClean = () => {
    setData([]);
    setCurrent({});
  }

  return (
    <div id="container">
      <input name="myInput" placeholder='search path (separator: ".")' onChange={(e) => setSearch(e.target.value)} />
      <div id="data-wrapper">
        {json ? 
          <ReactJson src={json} onEdit={search ? false : (edit) => console.log(edit)} name={null} /> : 
          <h1>no data to be shown</h1>
        }
        <button onClick={handleClean}>clear</button>
      </div>
    </div>
  )
}

export default JsonViewer;
