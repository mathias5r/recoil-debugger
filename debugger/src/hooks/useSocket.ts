import { useContext, useEffect } from 'react';
import { socket } from '../socket';
import { Data, DataContext } from '../context';
import { getObjectPaths } from '../utils/object';

const onConnect = () => console.log('connected');
const onDisconnect = () => console.log('disconnected');

const getDataType = (list: Data[], current: Data | null, diff: string) => {
  const previous = list.slice(-1)[0]
  if(!previous || !current) return 'unknown'

  const previousDiff = previous?.[diff];
  const currentDiff = current?.[diff];

  if(!previousDiff && currentDiff) return 'addition';
  if(previousDiff && !currentDiff) return 'deletion';
  if(!previousDiff && !currentDiff) return 'unknown';
  
  const previousPaths = getObjectPaths(previousDiff as Record<string, unknown>)
  const currentPaths = getObjectPaths(currentDiff as Record<string, unknown>)

  if(previousPaths.length > currentPaths.length) return 'addition'
  if(previousPaths.length < currentPaths.length) return 'deletion'
  return 'update'
}

export default () => {
  const { setData, setCurrent } = useContext(DataContext);

  const onRecoilData = (value: unknown) => {
    if(value) {
      setCurrent({...value as Data, date: new Date() })
      setData((prev: Data[]) => [
        ...prev, 
        {
          ...value as Data, 
          date: new Date(), 
          type: getDataType(prev, value as Data, (value as Data).diff as string) 
        }
      ])
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}