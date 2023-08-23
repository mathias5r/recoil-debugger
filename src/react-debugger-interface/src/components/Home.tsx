import React, { useEffect, useState } from 'react'
import { socket } from '../socket';

import './Home.css'

import ReactJson from 'react-json-view'

const onConnect = () => console.log('connected');
const onDisconnect = () => console.log('disconnected');

const Home: React.FC = () => {
  const [content, setContent] = useState<unknown>({})

  const onRecoilData = (value: unknown) => {
    console.log('new recoil data', value)
    setContent(value)
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
      <ReactJson src={content as object} theme="bright" />
    </div>
    <div id="history-wrapper">
      <div id="test"></div>
    </div>
  </div>;
}

export default Home;
