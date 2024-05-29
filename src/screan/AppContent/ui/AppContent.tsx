import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../../../app/types/route.ts';
import {
  useIsDarkMode,
  useTheme,
} from '../../../app/providers/ThemeProvider/ui/ThemeProvider.tsx';
import {StatusBar, StyleSheet, View, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {MainScreen} from '../../Main';
import {
  ForgotPasswordForm,
  SignInForm,
  SignUpForm,
} from '../../../feautures/Auth';
import {Settings} from '../../../feautures/Settings';
import {useTranslation} from 'react-i18next';

const isAndroid = Platform.OS === 'android';

const AppContent: React.FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const isDarkMode = useIsDarkMode();
  const {t} = useTranslation();
  const {theme} = useTheme();
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {backgroundColor: theme.invertedBackgroundColor},
      ]}>
      <StatusBar
        backgroundColor={theme.invertedBackgroundColor}
        barStyle={isDarkMode ? 'dark-content' : 'light-content'}
      />
      <View style={{flex: 1}}>
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
                  height: styles.navigationHeaderHeight.height,
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
                  height: styles.navigationHeaderHeight.height,
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
                  height: styles.navigationHeaderHeight.height,
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
                  height: styles.navigationHeaderHeight.height,
                },
                headerTintColor: theme.invertedPrimaryColor,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: isAndroid ? 0 : 30,
  },
  navigationHeaderHeight: {
    height: 57,
  },
});
export default AppContent;
