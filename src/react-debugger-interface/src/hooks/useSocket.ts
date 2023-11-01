import { useContext, useEffect } from 'react';
import { socket } from '../socket';
import { Data, DataContext } from '../context';

const onConnect = () => console.log('connected');
const onDisconnect = () => console.log('disconnected');

export default () => {
  const { setData, setCurrent } = useContext(DataContext);

  const onRecoilData = (value: unknown) => {
    setCurrent({...value as Data, date: new Date() })
    setData((prev: Data[]) => [...prev, {...value as Data, date: new Date() }])
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}