import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Appearance} from 'react-native';

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

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component
export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'light');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider
      value={{theme: isDarkMode ? darkTheme : lightTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
