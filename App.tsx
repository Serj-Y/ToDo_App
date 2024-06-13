import React from 'react';
import {StoreProvider} from './src/app/providers/StoreProvider';
import {ThemeProvider} from './src/app/providers/ThemeProvider';
import {AppContent} from './src/screen/AppContent';
import {I18Provider} from './src/app/providers/I18Provider';

const App = () => {
  return (
    <StoreProvider>
      <I18Provider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </I18Provider>
    </StoreProvider>
  );
};

export default App;
