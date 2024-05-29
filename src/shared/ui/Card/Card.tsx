import {StyleSheet, View, ViewProps} from 'react-native';
import React, {ReactNode} from 'react';
import {useTheme} from '../../../app/providers/ThemeProvider';

interface CardProps extends ViewProps {
  children: ReactNode;
}

export const Card = ({children, ...otherProps}: CardProps) => {
  const {theme} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.invertedBackgroundColor},
      ]}
      {...otherProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 9,
    borderRadius: 6,
    minWidth: '90%',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
});
