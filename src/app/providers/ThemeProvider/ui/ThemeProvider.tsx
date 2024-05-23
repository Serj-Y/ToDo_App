import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Theme {
  backgroundColor: string;
  invertedBackgroundColor: string;
  primaryColor: string;
  invertedPrimaryColor: string;
  secondaryColor: string;
  invertedSecondaryColor: string;
}

const lightTheme: Theme = {
  backgroundColor: '#FDFDFD',
  invertedBackgroundColor: '#16523c',
  primaryColor: '#183A40',
  invertedPrimaryColor: '#FDFDFD',
  secondaryColor: '#093028',
  invertedSecondaryColor: '#F3F1F1',
};

const darkTheme: Theme = {
  backgroundColor: '#16523c',
  invertedBackgroundColor: '#FDFDFD',
  primaryColor: '#FDFDFD',
  invertedPrimaryColor: '#183A40',
  secondaryColor: '#183A40',
  invertedSecondaryColor: '#F3F1F1',
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
  isDarkMode: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      setIsDarkMode(prevMode => {
        const newMode = !prevMode;
        AsyncStorage.setItem('theme', newMode ? 'dark' : 'light');
        return newMode;
      });
    } catch (error) {
      console.error('Failed to toggle theme:', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: isDarkMode ? darkTheme : lightTheme,
        toggleTheme,
        isDarkMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to get dark mode status
export const useIsDarkMode = () => {
  const {isDarkMode} = useContext(ThemeContext);
  return isDarkMode;
};
