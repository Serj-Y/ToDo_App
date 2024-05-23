import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {APP_LANGUAGE} from '../../consts/appLanguage.ts';
import en from './locales/en/translation.json';
import ua from './locales/ua/translation.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'lng';

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      const lng = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (lng) {
        callback(lng);
      } else {
        callback(APP_LANGUAGE.EN);
      }
    } catch (error) {
      console.error('Error fetching language from AsyncStorage:', error);
      callback(APP_LANGUAGE.EN);
    }
  },
  init: () => {},
  cacheUserLanguage: (lng: string) => {
    AsyncStorage.setItem(LANGUAGE_KEY, lng).catch(error => {
      console.error('Error saving language to AsyncStorage:', error);
    });
  },
};

i18next
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: APP_LANGUAGE.EN,
    resources: {
      en: {translation: en},
      ua: {translation: ua},
    },
  });
