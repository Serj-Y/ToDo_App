import React, {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {useSelector} from 'react-redux';
import {getLoginError} from '../../model/selectors/getLoginError/getLoginError.ts';
import {signIn} from '../../model/services/signIn/signIn.ts';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../../../app/providers/ThemeProvider';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../../app/types/route.ts';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {useYupValidationResolver} from '../../../../../shared/lib/hooks/useYupValidationResolver/useYupValidationResolver.ts';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main',
  'ForgotPassword'
>;

interface FormData {
  email: string;
  password: string;
}

const SignInForm = memo(() => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const error = useSelector(getLoginError);
  const navigation = useNavigation<NavigationProp>();
  const {theme} = useTheme();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t('Enter valid email'))
      .required(t('This field is required')),
    password: yup
      .string()
      .min(8, t('Minimum 8 symbols'))
      .required(t('This field is required')),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: useYupValidationResolver(validationSchema),
  });

  const onSignInPress = useCallback(
    async (data: FormData) => {
      const result = await dispatch(
        signIn({email: data.email.toLowerCase(), password: data.password}),
      );
      console.log(result);
      if (result.meta.requestStatus === 'fulfilled') {
        navigation.navigate('Main');
      }
    },
    [dispatch, navigation],
  );

  // const onForgotPasswordPress = () => {
  //   navigation.navigate('ForgotPassword');
  // };
  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.title, {color: theme.primaryColor}]}>
        {t('Sign in')}
      </Text>
      {error && (
        <Text style={{color: 'red'}}>
          {t('Incorrect password or username')}
        </Text>
      )}
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <>
            {errors.email && (
              <Text style={{color: 'red'}}>{errors.email.message}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                {borderColor: theme.primaryColor, color: theme.primaryColor},
              ]}
              onChangeText={onChange}
              placeholder={t('Email')}
              placeholderTextColor={theme.invertedBackgroundColor}
              value={value}
              keyboardType="email-address"
            />
          </>
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <>
            {errors.password && (
              <Text style={{color: 'red'}}>{errors.password.message}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                {borderColor: theme.primaryColor, color: theme.primaryColor},
              ]}
              onChangeText={onChange}
              placeholder={t('Password')}
              placeholderTextColor={theme.primaryColor}
              value={value}
              keyboardType="visible-password"
            />
          </>
        )}
      />
      {/*<TouchableOpacity*/}
      {/*    onPress={onForgotPasswordClick}*/}
      {/*    disabled={isLoading}*/}
      {/*    style={{ backgroundColor: theme.invertedBackgroundColor , padding: 16, borderRadius: 4, marginVertical: 8 }}>*/}
      {/*    <Text style={{ color: theme.invertedPrimaryColor, textAlign: 'center', fontSize: 18 }}>*/}
      {/*        {t('Forgot password')}*/}
      {/*    </Text>*/}
      {/*</TouchableOpacity>*/}
      <TouchableOpacity
        onPress={handleSubmit(onSignInPress)}
        style={{
          backgroundColor: theme.invertedBackgroundColor,
          padding: 16,
          borderRadius: 4,
          marginVertical: 8,
        }}>
        <Text
          style={{
            color: theme.backgroundColor,
            textAlign: 'center',
            fontSize: 18,
          }}>
          {t('Sign in')}
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

export default SignInForm;
