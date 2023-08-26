import React, { useEffect, useState } from 'react'
import { socket } from '../socket';

import './Home.css'

import ReactJson from 'react-json-view'

const onConnect = () => console.log('connected');
const onDisconnect = () => console.log('disconnected');

const Home: React.FC = () => {
  const [data, setData] = useState<unknown[]>([])
  const [current, setCurrent] = useState<unknown>();

  const onRecoilData = (value: unknown) => {
    setData(prev => [...prev, value]);
    setCurrent(value);
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
      {current ? 
        <ReactJson src={current} theme="bright" /> : 
        <h1>no data to be shown</h1>
      }
    </div>
    <div id="history-wrapper">
      {data.map(item => 
        <div>
          <button 
            onClick={() => setCurrent(item)} 
            className="btn default">
              {item.date}
          </button>
        </div>)}
    </div>
  </div>;
}

export default Home;
