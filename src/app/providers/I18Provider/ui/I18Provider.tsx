import React from 'react';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import {ReactNode} from 'react';

interface I18ProviderProps {
  children?: ReactNode;
}

const I18Provider = ({children}: I18ProviderProps) => {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};

export default I18Provider;
