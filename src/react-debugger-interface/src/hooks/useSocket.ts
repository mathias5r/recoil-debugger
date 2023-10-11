import { useContext, useEffect } from 'react';
import { socket } from '../socket';
import { Data, DataContext } from '../context';

const onConnect = () => console.log('connected');
const onDisconnect = () => console.log('disconnected');

export default () => {
  const { data, setData } = useContext(DataContext);

  const onRecoilData = (value: unknown) => {
    setData([...data, value as Data])
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