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
  const { data, setData } = useContext(DataContext)
  const [search, setSearch] = useState('');
  const current = data.slice(-1)[0]
  const paths = getPaths(current as Record<string, unknown>)
  const json = search ? paths.filter((path) => path.includes(search)) : current;

  return (
    <div id="container">
      <input name="myInput" placeholder='search path (separator: ".")' onChange={(e) => setSearch(e.target.value)} />
      <div id="data-wrapper">
        {json ? 
          <ReactJson src={json} /> : 
          <h1>no data to be shown</h1>
        }
        <button onClick={() => setData([])}>clear</button>
      </div>
    </div>
  )
}

export default JsonViewer;
