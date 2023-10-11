import React from 'react'
import logo from '../assets/imgs/recoil-debugger-logo.png'
import homeIcon from '../assets/imgs/home-icon.png'
import analyticsIcon from '../assets/imgs/analytics-icon.png'

import './Main.css'
import useSocket from '../hooks/useSocket'
import JsonViewer from './JsonViewer'

const Home: React.FC = () => {
  useSocket()

  return <div id="body">
    <div className="box">
      <div className="row header">
        <img src={logo} width={50} height={50}  />
        <a id='title'>recoil debugger</a>
      </div>
      <div className="row content">
        <div id="menu">
          <div id="selected">
            <img id="home-icon" src={homeIcon} width={30} height={28}  />
          </div>
          <div>
            <img id="analytics-icon" src={analyticsIcon} width={30} height={28}  />
          </div>
        </div>
        <div id="json-viewer">
          <JsonViewer />
        </div>
        <div id="timeline">
        </div>
      </div>
    </div>
  </div>;
}

export default Home;
