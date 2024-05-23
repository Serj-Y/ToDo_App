import React from 'react';
import {useTheme} from '../../../app/providers/ThemeProvider';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from '../../../widgets/Header';

const MainScreen: React.FC = () => {
  const {theme} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Header />
      <View style={styles.content}>
        <Text style={[styles.text, {color: theme.primaryColor}]}>
          Main Page
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});
export default MainScreen;
