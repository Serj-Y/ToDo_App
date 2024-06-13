import {StyleProp, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

type PressableOpacityProps = {
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<TouchableOpacity | any>;
  key?: string;
};
function PressableOpacity({
  children,
  disabled,
  onPress,
  onLongPress,
  style,
}: PressableOpacityProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      onLongPress={onLongPress}
      style={[
        disabled ? styles.defaultDisabledStyle : styles.defaultStyle,
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  defaultDisabledStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    opacity: 0.5,
  },
});

export default PressableOpacity;
