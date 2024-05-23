import React from 'react';
import {StyleSheet, View} from 'react-native';
import PressableOpacity from '../../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '../../../../app/providers/ThemeProvider';
import {useAppDispatch} from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {userActions} from '../../../../entities/User';
import {useIsDarkMode} from '../../../../app/providers/ThemeProvider/ui/ThemeProvider.tsx';
import {useTranslation} from 'react-i18next';
import {APP_LANGUAGE} from '../../../../shared/consts/appLanguage.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../app/types/route.ts';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const BottomButtons: React.FC = () => {
  const {i18n} = useTranslation();
  const {theme, toggleTheme} = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useIsDarkMode();
  const dispatch = useAppDispatch();

  const handleTheme = () => {
    toggleTheme();
  };
  const handleLanguage = () => {
    const currentLang = i18n.language;
    console.log(currentLang);
    if (currentLang === APP_LANGUAGE.EN) {
      AsyncStorage.setItem('lng', APP_LANGUAGE.UA);
      i18n.changeLanguage(APP_LANGUAGE.UA);
    } else if (currentLang === APP_LANGUAGE.UA) {
      AsyncStorage.setItem('lng', APP_LANGUAGE.EN);
      i18n.changeLanguage(APP_LANGUAGE.EN);
    }
  };

  const handleLogOut = () => {
    dispatch(userActions.logout());
    navigation.navigate('Main');
  };
  return (
    <View style={styles.buttonsContainer}>
      <PressableOpacity
        style={[
          styles.button,
          {backgroundColor: theme.invertedBackgroundColor},
        ]}
        onPress={handleTheme}>
        <Icon
          name={isDarkMode ? 'sun-o' : 'moon-o'}
          style={[{color: theme.backgroundColor}]}
          size={18}
        />
      </PressableOpacity>
      <PressableOpacity
        style={[
          styles.button,
          {backgroundColor: theme.invertedBackgroundColor},
        ]}
        onPress={handleLanguage}>
        <Icon
          name="language"
          style={[{color: theme.backgroundColor}]}
          size={18}
        />
      </PressableOpacity>
      <PressableOpacity
        style={[
          styles.button,
          {backgroundColor: theme.invertedBackgroundColor},
        ]}
        onPress={handleLogOut}>
        <Icon
          name="sign-out"
          style={[{color: theme.backgroundColor}]}
          size={18}
        />
      </PressableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    margin: 20,
  },
  button: {
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
  },
});
export default BottomButtons;
