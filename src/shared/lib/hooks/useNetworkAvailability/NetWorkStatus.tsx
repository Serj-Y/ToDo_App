import React from 'react';
import {View, Text} from 'react-native';
import {useNetworkAvailability} from './useNetworkAvailability.ts';
import Icon from 'react-native-vector-icons/FontAwesome';

export const NetworkStatus: React.FC = () => {
  const isConnected = useNetworkAvailability();

  if (isConnected === null) {
    return <Text>Checking network status...</Text>;
  }
  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <Icon name="wifi" color={isConnected ? 'white' : 'red'} size={20} />
    </View>
  );
};
