import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../../app/providers/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUserAuthData, userActions} from '../../../entities/User';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../app/types/route.ts';
import PressableOpacity from '../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
interface HeaderProps {
  appName?: string;
}
type NavigationProp = StackNavigationProp<RootStackParamList>;
const Header: React.FC<HeaderProps> = ({appName = 'ToDo'}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {theme} = useTheme();
  const authData = useSelector(getUserAuthData);

  const navigation = useNavigation<NavigationProp>();
  const handleLogOut = () => {
    dispatch(userActions.logout());
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  // const handleSettings = () => {
  //   navigation.navigate('Settings');
  // };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.invertedBackgroundColor},
      ]}>
      <Text style={[styles.appName, {color: theme.invertedPrimaryColor}]}>
        {appName}
      </Text>
      <View style={styles.buttonsContainer}>
        {!authData && (
          <>
            <PressableOpacity onPress={handleSignUp} style={styles.button}>
              <Text
                style={[
                  styles.buttonText,
                  {color: theme.invertedPrimaryColor},
                ]}>
                {t('Sign up')}
              </Text>
            </PressableOpacity>
            <PressableOpacity onPress={handleSignIn} style={styles.button}>
              <Text
                style={[
                  styles.buttonText,
                  {color: theme.invertedPrimaryColor},
                ]}>
                {t('Sign in')}
              </Text>
            </PressableOpacity>
          </>
        )}

        {authData && (
          <>
            <PressableOpacity onPress={handleLogOut} style={styles.button}>
              <Text
                style={[
                  styles.buttonText,
                  {color: theme.invertedPrimaryColor},
                ]}>
                {t('Sign out')}
              </Text>
            </PressableOpacity>
            {/*<PressableOpacity onPress={handleSettings}>*/}
            {/*  <Icon*/}
            {/*    name="cog"*/}
            {/*    style={[{color: theme.invertedPrimaryColor}]}*/}
            {/*    size={18}*/}
            {/*  />*/}
            {/*</PressableOpacity>*/}
            <Text
              style={[styles.username, {color: theme.invertedPrimaryColor}]}>
              {authData.name}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  username: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Header;
