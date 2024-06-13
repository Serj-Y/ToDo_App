import {useTranslation} from 'react-i18next';
import React, {memo, useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {changePassword} from '../../model/services/changePassword/changePassword';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch, useYupValidationResolver} from '@shared/lib/hooks';
import {PressableOpacity} from '@shared/ui';

interface FormData {
  password: string;
  newPassword: string;
  repeatPassword: string;
}

const ChangeUserPasswordForm = memo(() => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {theme} = useTheme();
  const validationSchema = yup.object({
    password: yup.string().required(t('This field is required')),
    newPassword: yup
      .string()
      .required(t('This field is required'))
      .min(8, t('Minimum 8 symbols')),
    repeatPassword: yup
      .string()
      .required(t('This field is required'))
      .oneOf(
        [yup.ref('newPassword')],
        t('Confirm password field does not match with new password'),
      ),
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
      setIsLoading(true);
      setIsError(false);
      const result = await dispatch(changePassword(data));
      if (result.meta.requestStatus === 'fulfilled') {
        setIsError(false);
        setIsLoading(false);
        reset();
      }
      if (result.meta.requestStatus === 'rejected') {
        setIsLoading(false);
        setIsError(true);
      }
    },
    [dispatch, reset],
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: theme.primaryColor}]}>
        {t('Change password')}
      </Text>
      {isError && (
        <Text style={styles.errorText}>{t('Something went wrong')}</Text>
      )}
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
                placeholder={t('Enter current password')}
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
      <Controller
        name="newPassword"
        control={control}
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <>
            {errors.newPassword && (
              <Text style={styles.errorText}>
                {errors.newPassword?.message}
              </Text>
            )}
            <View
              style={[
                styles.inputContainer,
                {borderColor: theme.primaryColor},
              ]}>
              <TextInput
                style={[
                  styles.input,
                  {borderColor: theme.primaryColor, color: theme.primaryColor},
                ]}
                placeholderTextColor={theme.invertedBackgroundColor}
                placeholder={t('Enter new password')}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity
                style={styles.eyIcon}
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
      <Controller
        name="repeatPassword"
        control={control}
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <>
            {errors.repeatPassword && (
              <Text style={styles.errorText}>
                {errors.repeatPassword?.message}
              </Text>
            )}
            <View
              style={[
                styles.inputContainer,
                {borderColor: theme.primaryColor},
              ]}>
              <TextInput
                style={[
                  styles.input,
                  {borderColor: theme.primaryColor, color: theme.primaryColor},
                ]}
                placeholderTextColor={theme.invertedBackgroundColor}
                placeholder={t('Enter confirm new password')}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!showRepeatPassword}
              />
              <TouchableOpacity
                style={styles.eyIcon}
                onPress={() => setShowRepeatPassword(!showRepeatPassword)}>
                <Icon
                  name={showRepeatPassword ? 'eye-slash' : 'eye'}
                  size={20}
                  color={theme.primaryColor}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      />
      <PressableOpacity
        style={[
          styles.button,
          {backgroundColor: theme.invertedBackgroundColor},
        ]}
        disabled={isLoading}
        onPress={handleSubmit(onSubmit)}>
        <Text style={[styles.buttonText, {color: theme.invertedPrimaryColor}]}>
          {t('Save changes')}
        </Text>
      </PressableOpacity>
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
  eyIcon: {
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
  errorText: {
    color: 'red',
    paddingBottom: 10,
  },
});

export default ChangeUserPasswordForm;
