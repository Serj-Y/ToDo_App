import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {StoreProvider} from "./src/app/providers/StoreProvider";
import { Header } from './src/widgets/Header';
import {ThemeProvider} from "./src/app/providers/ThemeProvider";
import {useTheme} from "./src/app/providers/ThemeProvider";

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const { theme, toggleTheme } = useTheme();
  return (
      <StoreProvider>
          <ThemeProvider>
              <View style={ {backgroundColor: theme.invertedBackgroundColor}}>
                  <SafeAreaView >
                      <StatusBar
                          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                      />
                      <View style={{backgroundColor: theme.backgroundColor, height: '120%'}}>
                          <Header/>
                          <ScrollView
                              contentInsetAdjustmentBehavior="automatic"
                          >
                          </ScrollView>
                      </View>

                  </SafeAreaView>
              </View>

          </ThemeProvider>
      </StoreProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {


  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
