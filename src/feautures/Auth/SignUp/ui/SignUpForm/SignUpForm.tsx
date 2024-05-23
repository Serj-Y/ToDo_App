import React, {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {useSelector} from 'react-redux';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../../../app/providers/ThemeProvider';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../../app/types/route.ts';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {useYupValidationResolver} from '../../../../../shared/lib/hooks/useYupValidationResolver/useYupValidationResolver.ts';
import {getSignUpError} from '../../model/selectors/getSignUpError/getSignUpError.ts';
import {getSignUpIsLoading} from '../../model/selectors/getSignUpIsLoading/getSignUpIsLoading.ts';
import {signUp} from '../../model/services/signUp/signUp.ts';
import PressableOpacity from '../../../../../shared/ui/pressableOpacity/PressableOpacity.tsx';

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main',
  'ForgotPassword'
>;

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUpForm = memo(() => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const {theme} = useTheme();
  const isLoading = useSelector(getSignUpIsLoading);
  const error = useSelector(getSignUpError);

  const validationSchema = yup.object({
    name: yup.string().required(t('This field is required')),
    email: yup
      .string()
      .required(t('This field is required'))
      .email(t('Enter valid email')),
    password: yup
      .string()
      .required(t('This field is required'))
      .min(8, t('Minimum 8 symbols')),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormData>({
    resolver: useYupValidationResolver(validationSchema),
  });
  const onSubmit = useCallback(
    async (data: FormData) => {
      const result = await dispatch(
        signUp({
          email: data.email.toLowerCase(),
          name: data.name,
          password: data.password,
        }),
      );
      if (result.meta.requestStatus === 'fulfilled') {
        navigation.navigate('Main');
      }
      reset();
    },
    [dispatch, navigation, reset],
  );
  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: theme.primaryColor}]}>
        {t('Sign up')}
      </Text>
      {error && (
        <Text style={styles.errorText}>{t('Something went wrong')}</Text>
      )}
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <>
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
            <TextInput
              style={[styles.input, {borderColor: theme.primaryColor}]}
              onChangeText={onChange}
              placeholder={t('Name')}
              placeholderTextColor={theme.invertedBackgroundColor}
              value={value}
              keyboardType="email-address"
            />
          </>
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
            <TextInput
              style={[styles.input, {borderColor: theme.primaryColor}]}
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
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
            <TextInput
              style={[styles.input, {borderColor: theme.primaryColor}]}
              onChangeText={onChange}
              placeholder={t('Password')}
              placeholderTextColor={theme.invertedBackgroundColor}
              value={value}
              keyboardType="visible-password"
            />
          </>
        )}
      />
      <PressableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
        style={[
          styles.button,
          {backgroundColor: theme.invertedBackgroundColor},
        ]}>
        <Text
          disabled={isLoading}
          style={[styles.buttonText, {color: theme.invertedPrimaryColor}]}>
          {t('Sign up')}
        </Text>
      </PressableOpacity>
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
  button: {
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
  },
});

export default SignUpForm;
