import {useState, useEffect} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

export const useNetworkAvailability = (): boolean | null => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const checkNetwork = async () => {
      const response: NetInfoState = await NetInfo.fetch();
      setIsConnected(response.isConnected);
    };

    checkNetwork();

    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};
