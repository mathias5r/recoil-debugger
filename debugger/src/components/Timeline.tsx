import React, { useContext, useState } from 'react';
import { DataContext } from '../context';

import './Timeline.css'

const Timeline: React.FC = () => {
  const [search, setSearch] = useState('')
  const { data, setCurrent } = useContext(DataContext)

  const list = search ? data.filter(item => (item.diff as string).includes(search)) : data

  return (
    <div id='container'>
      <input name="myInput" placeholder='Search diff'  onChange={(e) => setSearch(e.target.value)} />
      <div id='header'>
        <p>Time</p>
        <p>Diff</p>
        <p>Type</p>
      </div>
      {list.map(item => 
        <button id="timeline-button" onClick={() => setCurrent(item)}>
          <div id='btn-container'>
            <div className='btn-wrapper'>
              <p id="time">{`${item.date?.toLocaleTimeString()}`}</p>
            </div>
            <div className='btn-wrapper'>
              <p id="diff">{`${item.diff || ''}`}</p>
            </div>
            <div className='btn-wrapper'>
              <div id="type-wrapper">
                <p className={item.type as string}>{`${item.type || ''}`}</p>
              </div>
            </div>
          </div>
        </button>
      )}
    </div>
  )
};

export default Timeline;