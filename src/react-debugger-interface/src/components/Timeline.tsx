import React, { useContext } from 'react';
import { DataContext } from '../context';

import './Timeline.css'

const Timeline: React.FC = () => {
  const { data, setCurrent } = useContext(DataContext)

  return <div className='container'>
    {data.map(item => 
      <div className="btn-wrapper">
        <div className='point-wrapper'>
          <div id="point" />
          <div id="line" />
        </div>
        <div className='btn-container'>
          <button 
            onClick={() => setCurrent(item)} 
            className="default">
              {`${item.date?.toLocaleString()}`}
          </button>
          <button 
            onClick={() => {}} 
            className="dispatch">
              dispatch
          </button>
        </div>
      </div>
    )}
    <div className='bottom-area'>
      <div id="line" />
    </div>
  </div>
};

export default Timeline;