import {useTranslation} from 'react-i18next';
import React, {memo, useCallback, useState} from 'react';
import {emailActivate} from '../../module/services/activeEmail/emailActivate';
import {sendActiveEmailToken} from '../../module/services/sendActiveEmailToken/sendActiveEmailToken';
import PressableOpacity from '../../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {Text, View, StyleSheet} from 'react-native';
import {useAppDispatch} from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import ConfirmCode from '../../../../widgets/ConfirmCode/ui/ConfirmCode.tsx';
import {useTheme} from '../../../../app/providers/ThemeProvider';

const ActivateEmailForm = memo(() => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const [isEnterCode, setEnterCode] = useState<boolean>(false);
  const {theme} = useTheme();

  const activeEmailHandler = () => {
    dispatch(emailActivate());
    setEnterCode(true);
  };

  const onSubmit = useCallback(
    (code: string) => {
      setEnterCode(false);
      dispatch(sendActiveEmailToken({emailToken: code}));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      {!isEnterCode && (
        <>
          <Text style={[styles.title, {color: theme.primaryColor}]}>
            {t('Active email')}
          </Text>
          <PressableOpacity
            style={[
              styles.button,
              {backgroundColor: theme.invertedBackgroundColor},
            ]}
            onPress={activeEmailHandler}>
            <Text
              style={[styles.buttonText, {color: theme.invertedPrimaryColor}]}>
              {t('Send code to email')}
            </Text>
          </PressableOpacity>
        </>
      )}
      {isEnterCode && (
        <>
          <Text style={[styles.title, {color: theme.primaryColor}]}>
            {t('Active email')}
          </Text>
          <Text style={[styles.text, {color: theme.primaryColor}]}>
            {t('Check spam mailbox')}
          </Text>
          <ConfirmCode
            theme={theme}
            onSubmit={onSubmit}
            submitButtonText={t('Send confirm code')}
          />
        </>
      )}
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  button: {
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },

  errorText: {
    color: 'red',
  },
});
export default ActivateEmailForm;
