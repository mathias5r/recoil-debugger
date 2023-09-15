import React, { useEffect, useState } from 'react'

import { socket } from '../socket';

import './Home.css'

import ReactJson from 'react-json-view'

const onConnect = () => console.log('connected');
const onDisconnect = () => console.log('disconnected');

const getPaths = (obj: Record<string, any>, parentKey: string = ''): string[] => {
  let paths: string[] = [];

  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      const currentPath = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const nestedPaths = getPaths(obj[key], currentPath);
        paths = paths.concat(nestedPaths);
      } else {
        const fullPath = currentPath + '.' + obj[key]; // Concatenate the value
        paths.push(fullPath);
      }
    }
  }

  return paths;
};

const Home: React.FC = () => {
  const [data, setData] = useState<unknown[]>([])
  const [current, setCurrent] = useState<unknown>();
  const [collapseSize, setCollapseSize] = useState(10);
  const [search, setSearch] = useState('');

  const paths = getPaths(current as Record<string, any>)

  const json = search ? paths.filter((path) => path.includes(search)) : current;

  const onRecoilData = (value: unknown) => {
    setData(prev => [...prev, value]);
    setCurrent(value);
  }

  const onSizeChange = () => {
    if(collapseSize > 1) {
      setCollapseSize(1)
    } else {
      setCollapseSize(10)
    }
  }

  useEffect(() => {
    socket.emit('init')
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('content', onRecoilData);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('content', onRecoilData);
    };
  }, [])

  return <div id="container">
    <div id="data-wrapper">
      <button onClick={onSizeChange}>{collapseSize === 1 ? 'inflate': 'collapse'}</button>
      <input name="myInput" placeholder='search path (separator: ".")' onChange={(e) => setSearch(e.target.value)} />
      {json ? 
        <ReactJson src={json} theme="bright" collapsed={collapseSize} /> : 
        <h1>no data to be shown</h1>
      }
    </div>
    <div id="history-wrapper">
      {data.map(item => 
        <div>
          <button 
            onClick={() => setCurrent(item)} 
            className="btn default">
              {item?.date}
          </button>
        </div>)}
    </div>
  </div>;
}

export default Home;
