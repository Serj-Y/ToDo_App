import React, {memo, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {getLoginError} from '../../model/selectors/getLoginError/getLoginError.ts';
import {signIn} from '../../model/services/signIn/signIn.ts';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@app/providers/ThemeProvider';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@app/types/route.ts';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getLoginIsLoading} from '../../model/selectors/getLoginIsLoading/getLoginIsLoading.ts';
import {useAppDispatch, useYupValidationResolver} from '@shared/lib/hooks';
import {PressableOpacity} from '@shared/ui';

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
  const isLoading = useSelector(getLoginIsLoading);
  const navigation = useNavigation<NavigationProp>();
  const [showPassword, setShowPassword] = useState(false);
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
        signIn({email: data.email, password: data.password}),
      );
      if (result.meta.requestStatus === 'fulfilled') {
        navigation.navigate('Main');
      }
    },
    [dispatch, navigation],
  );

  const onForgotPasswordPress = () => {
    navigation.navigate('ForgotPassword');
  };
  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <Text style={[styles.title, {color: theme.primaryColor}]}>
          {t('Sign in')}
        </Text>
        {error && (
          <Text style={styles.errorText}>
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
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
              <View
                style={[
                  styles.inputContainer,
                  {borderColor: theme.primaryColor},
                ]}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: theme.primaryColor,
                      color: theme.primaryColor,
                    },
                  ]}
                  onSubmitEditing={handleSubmit(onSignInPress)}
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
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({field: {onChange, value}}) => (
            <>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password?.message}</Text>
              )}
              <View
                style={[
                  styles.inputContainer,
                  {borderColor: theme.primaryColor},
                ]}>
                <TextInput
                  style={[styles.input, {color: theme.primaryColor}]}
                  placeholderTextColor={theme.invertedBackgroundColor}
                  placeholder={t('Password')}
                  onSubmitEditing={handleSubmit(onSignInPress)}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyIcon}
                  onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    name={showPassword ? 'eye-slash' : 'eye'}
                    size={20}
                    color={theme.primaryColor}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        />
        <PressableOpacity
          onPress={onForgotPasswordPress}
          disabled={isLoading}
          style={[
            styles.button,
            {backgroundColor: theme.invertedBackgroundColor},
          ]}>
          <Text
            style={[styles.buttonText, {color: theme.invertedPrimaryColor}]}>
            {t('Forgot password')}
          </Text>
        </PressableOpacity>
        <PressableOpacity
          onPress={handleSubmit(onSignInPress)}
          disabled={isLoading}
          style={[
            styles.button,
            {backgroundColor: theme.invertedBackgroundColor},
          ]}>
          <Text
            style={[styles.buttonText, {color: theme.invertedPrimaryColor}]}>
            {t('Sign in')}
          </Text>
        </PressableOpacity>
      </KeyboardAvoidingView>
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
    paddingBottom: 10,
  },
  eyIcon: {
    padding: 10,
  },
});

export default SignInForm;
