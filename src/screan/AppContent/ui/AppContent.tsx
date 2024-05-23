import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../../../app/types/route.ts';
import {
  useIsDarkMode,
  useTheme,
} from '../../../app/providers/ThemeProvider/ui/ThemeProvider.tsx';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {MainScreen} from '../../Main';
import {
  ForgotPasswordForm,
  SignInForm,
  SignUpForm,
} from '../../../feautures/Auth';
import {Settings} from '../../../feautures/Settings';
import {useTranslation} from 'react-i18next';

const AppContent: React.FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const isDarkMode = useIsDarkMode();
  const {t} = useTranslation();
  const {theme} = useTheme();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.invertedBackgroundColor,
          marginBottom: -35,
        }}>
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
        <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{
                  title: t('Main'),
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignInForm}
                options={{
                  title: t('Sign in'),
                  headerStyle: {
                    backgroundColor: theme.invertedBackgroundColor,
                    height: 60,
                  },
                  headerTintColor: theme.invertedPrimaryColor,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpForm}
                options={{
                  title: t('Sign up'),
                  headerStyle: {
                    backgroundColor: theme.invertedBackgroundColor,
                    height: 60,
                  },
                  headerTintColor: theme.invertedPrimaryColor,
                }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordForm}
                options={{
                  title: t('Forgot password'),
                  headerStyle: {
                    backgroundColor: theme.invertedBackgroundColor,
                    height: 60,
                  },
                  headerTintColor: theme.invertedPrimaryColor,
                }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                  title: t('Settings'),
                  headerStyle: {
                    backgroundColor: theme.invertedBackgroundColor,
                    height: 60,
                  },
                  headerTintColor: theme.invertedPrimaryColor,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
export default AppContent;
