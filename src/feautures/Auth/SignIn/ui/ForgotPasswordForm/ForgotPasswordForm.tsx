import React, {memo, useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {forgotPasswordByEmail} from '../../model/services/forgotPaswordByEmail/forgotPasswordByEmail';
import {sendForgotPasswordToken} from '../../model/services/sendForgotPasswordToken/sendForgotPasswordToken';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch} from '../../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import {useTranslation} from 'react-i18next';
import {useYupValidationResolver} from '../../../../../shared/lib/hooks/useYupValidationResolver/useYupValidationResolver.ts';
import {useTheme} from '../../../../../app/providers/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../../app/types/route.ts';
import {StackNavigationProp} from '@react-navigation/stack';

interface FormData {
  newPassword?: string;
  email?: string;
  emailCode?: string;
}
type NavigationProp = StackNavigationProp<RootStackParamList>;
const ForgotPasswordForm = memo(() => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const {theme} = useTheme();
  const [isErrorSendToken, setIsErrorSendToken] = useState<boolean>(false);
  const [isErrorSendNewPassword, setIsErrorSendNewPassword] =
    useState<boolean>(false);
  const [isSendCode, setIsSendCode] = useState<boolean>(false);

  const validationSchema = yup.object({
    newPassword: yup.string().min(8, t('Minimum 8 symbols')),
    emailCode: yup.string().length(5, t('Code must have 5 symbols')),
    email: yup.string().email(t('Enter valid email')),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: useYupValidationResolver(validationSchema),
  });
  const onSubmit = useCallback(
    async (data: FormData) => {
      if (data.email && !data.emailCode) {
        setIsErrorSendToken(false);
        const result = await dispatch(
          forgotPasswordByEmail({email: data.email.toLowerCase()}),
        );
        if (result.meta.requestStatus === 'fulfilled') {
          setIsSendCode(true);
          setIsErrorSendToken(false);
        }
        if (result.meta.requestStatus === 'rejected') {
          setIsErrorSendToken(true);
        }
      } else if (data.emailCode && data.newPassword && data.email) {
        const result = await dispatch(
          sendForgotPasswordToken({
            email: data.email.toLowerCase(),
            forgotToken: data.emailCode,
            password: data.newPassword,
          }),
        );
        if (result.meta.requestStatus === 'fulfilled') {
          navigation.navigate('SignIn');
          setIsErrorSendNewPassword(false);
        }
        if (result.meta.requestStatus === 'rejected') {
          setIsErrorSendNewPassword(true);
        }
      }
    },
    [dispatch, navigation],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Reset password')}</Text>
      {!isSendCode && (
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({field: {onChange, value}}) => (
            <>
              {isErrorSendToken && (
                <Text style={{color: 'red'}}>
                  {t('Something went wrong, Or User not found')}
                </Text>
              )}
              <TextInput
                style={[styles.input, {borderColor: theme.primaryColor}]}
                onChangeText={onChange}
                placeholder={t('Email')}
                placeholderTextColor={theme.invertedBackgroundColor}
                value={value}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={{color: 'red'}}>{errors.email.message}</Text>
              )}
            </>
          )}
        />
      )}
      {isSendCode && (
        <>
          <Text>{t('Check spam mailbox')}</Text>
          {isErrorSendNewPassword && (
            <Text style={{color: 'red'}}>{t('Something went wrong')}</Text>
          )}
          <Controller
            name="emailCode"
            control={control}
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <>
                <View style={{marginVertical: 16}}>
                  <TextInput
                    style={[styles.input, {borderColor: theme.primaryColor}]}
                    onChangeText={onChange}
                    placeholderTextColor={theme.invertedBackgroundColor}
                    placeholder={t('Enter code from email')}
                    value={value}
                  />
                  {errors.emailCode && (
                    <Text style={{color: 'red'}}>
                      {errors.emailCode.message}
                    </Text>
                  )}
                </View>
              </>
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  style={[styles.input, {borderColor: theme.primaryColor}]}
                  onChangeText={onChange}
                  placeholder={t('Enter new password')}
                  placeholderTextColor={theme.invertedBackgroundColor}
                  value={value}
                  secureTextEntry
                />
                {errors.newPassword && (
                  <Text style={{color: 'red'}}>
                    {errors.newPassword.message}
                  </Text>
                )}
              </>
            )}
          />
        </>
      )}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{
          backgroundColor: theme.invertedBackgroundColor,
          padding: 16,
          borderRadius: 4,
        }}>
        <Text
          style={{
            color: theme.invertedPrimaryColor,
            textAlign: 'center',
            fontSize: 18,
          }}>
          {isSendCode ? t('Send confirm code') : t('Send code to email')}
        </Text>
      </TouchableOpacity>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
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
});

export default ForgotPasswordForm;
