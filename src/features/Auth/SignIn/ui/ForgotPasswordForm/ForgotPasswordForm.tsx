import React, {memo, useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {forgotPassword} from '@features/Auth/SignIn/model/services/forgotPasword/forgotPassword.ts';
import {sendForgotPasswordToken} from '../../model/services/sendForgotPasswordToken/sendForgotPasswordToken';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@app/providers/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@app/types/route.ts';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch, useYupValidationResolver} from '@shared/lib/hooks';
import {PressableOpacity} from '@shared/ui';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      setIsLoading(true);
      if (data.email && !data.emailCode) {
        setIsErrorSendToken(false);
        const result = await dispatch(
          forgotPassword({email: data.email.toLowerCase()}),
        );
        if (result.meta.requestStatus === 'fulfilled') {
          setIsLoading(false);
          setIsSendCode(true);
          setIsErrorSendToken(false);
        }
        if (result.meta.requestStatus === 'rejected') {
          setIsLoading(false);
          setIsErrorSendToken(true);
        }
      } else if (data.emailCode && data.newPassword && data.email) {
        setIsLoading(true);
        const result = await dispatch(
          sendForgotPasswordToken({
            email: data.email.toLowerCase(),
            forgotToken: data.emailCode,
            password: data.newPassword,
          }),
        );
        if (result.meta.requestStatus === 'fulfilled') {
          setIsLoading(false);
          navigation.navigate('SignIn');
          setIsErrorSendNewPassword(false);
        }
        if (result.meta.requestStatus === 'rejected') {
          setIsLoading(false);
          setIsErrorSendNewPassword(true);
        }
      }
    },
    [dispatch, navigation],
  );

  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View>
        <Text style={[styles.title, {color: theme.primaryColor}]}>
          {t('Reset password')}
        </Text>
        {!isSendCode && (
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <>
                {isErrorSendToken && (
                  <Text style={styles.errorText}>
                    {t('Something went wrong, Or User not found')}
                  </Text>
                )}
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
                <View
                  style={[
                    styles.inputContainer,
                    {borderColor: theme.primaryColor},
                  ]}>
                  <TextInput
                    style={[styles.input, {color: theme.primaryColor}]}
                    onChangeText={onChange}
                    placeholder={t('Email')}
                    placeholderTextColor={theme.invertedBackgroundColor}
                    value={value}
                    keyboardType="email-address"
                  />
                </View>
              </>
            )}
          />
        )}
        {isSendCode && (
          <>
            <Text style={[styles.text, {color: theme.primaryColor}]}>
              {t('Check spam mailbox')}
            </Text>
            {isErrorSendNewPassword && (
              <Text style={styles.errorText}>{t('Something went wrong')}</Text>
            )}
            <Controller
              name="emailCode"
              control={control}
              defaultValue=""
              render={({field: {onChange, value}}) => (
                <>
                  {errors.emailCode && (
                    <Text style={styles.errorText}>
                      {errors.emailCode.message}
                    </Text>
                  )}
                  <View
                    style={[
                      styles.inputContainer,
                      {borderColor: theme.primaryColor},
                    ]}>
                    <TextInput
                      style={[styles.input, {color: theme.primaryColor}]}
                      onChangeText={onChange}
                      placeholderTextColor={theme.invertedBackgroundColor}
                      placeholder={t('Enter code from email')}
                      value={value}
                    />
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
                  {errors.newPassword && (
                    <Text style={styles.errorText}>
                      {errors.newPassword.message}
                    </Text>
                  )}
                  <View
                    style={[
                      styles.inputContainer,
                      {borderColor: theme.primaryColor},
                    ]}>
                    <TextInput
                      style={[styles.input, {color: theme.primaryColor}]}
                      onChangeText={onChange}
                      placeholder={t('Enter new password')}
                      placeholderTextColor={theme.invertedBackgroundColor}
                      value={value}
                      secureTextEntry={!showNewPassword}
                    />
                    <TouchableOpacity
                      style={styles.icon}
                      onPress={() => setShowNewPassword(!showNewPassword)}>
                      <Icon
                        name={showNewPassword ? 'eye-slash' : 'eye'}
                        size={20}
                        color={theme.primaryColor}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            />
          </>
        )}
        <PressableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          style={[
            styles.button,
            {backgroundColor: theme.invertedBackgroundColor},
          ]}>
          <Text
            style={[styles.buttonText, {color: theme.invertedPrimaryColor}]}>
            {isSendCode ? t('Send confirm code') : t('Send code to email')}
          </Text>
        </PressableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 8,
    borderRadius: 4,
  },
  icon: {
    padding: 10,
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
    paddingBottom: 10,
  },
  errorText: {
    color: 'red',
    paddingBottom: 10,
  },
});

export default ForgotPasswordForm;
