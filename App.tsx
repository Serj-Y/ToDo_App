import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {StoreProvider} from './src/app/providers/StoreProvider';
import {ThemeProvider} from './src/app/providers/ThemeProvider';
import {useTheme} from './src/app/providers/ThemeProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Header} from './src/widgets/Header/';
import {ForgotPasswordForm, SignInForm, SignUpForm} from './src/feautures/Auth';
import {RootStackParamList} from './src/app/types/route.ts';
import {Settings} from './src/feautures/Settings/index.ts';

const MainScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.text}>Main Page</Text>
      </View>
    </View>
  );
};

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {theme} = useTheme();
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <StoreProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <ThemeProvider>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: theme.invertedBackgroundColor,
              marginBottom: -35,
            }}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
                  <Stack.Screen
                    name="Main"
                    component={MainScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="SignIn"
                    component={SignInForm}
                    options={{
                      title: 'Sign In',
                      headerStyle: {
                        backgroundColor: theme.invertedBackgroundColor,
                      },
                      headerTintColor: theme.invertedPrimaryColor,
                    }}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUpForm}
                    options={{
                      title: 'Sign Up',
                      headerStyle: {
                        backgroundColor: theme.invertedBackgroundColor,
                      },
                      headerTintColor: theme.invertedPrimaryColor,
                    }}
                  />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordForm}
                    options={{
                      title: 'Forgot Password',
                      headerStyle: {
                        backgroundColor: theme.invertedBackgroundColor,
                      },
                      headerTintColor: theme.invertedPrimaryColor,
                    }}
                  />
                  <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                      title: 'Settings',
                      headerStyle: {
                        backgroundColor: theme.invertedBackgroundColor,
                      },
                      headerTintColor: theme.invertedPrimaryColor,
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </SafeAreaView>
        </ThemeProvider>
      </GestureHandlerRootView>
    </StoreProvider>
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

export default App;
