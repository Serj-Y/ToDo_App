import {useTranslation} from 'react-i18next';
import React, {memo, useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {changePassword} from '../../model/services/changePassword/changePassword';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PressableOpacity from '../../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {useAppDispatch} from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {useYupValidationResolver} from '../../../../shared/lib/hooks/useYupValidationResolver/useYupValidationResolver.ts';
import {useTheme} from '../../../../app/providers/ThemeProvider';

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
            <TextInput
              style={[styles.input, {borderColor: theme.primaryColor}]}
              placeholderTextColor={theme.invertedBackgroundColor}
              placeholder={t('Enter current password')}
              onChangeText={onChange}
              value={value}
              keyboardType={'visible-password'}
            />
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
            <TextInput
              style={[styles.input, {borderColor: theme.primaryColor}]}
              placeholderTextColor={theme.invertedBackgroundColor}
              placeholder={t('Enter new password')}
              onChangeText={onChange}
              value={value}
              keyboardType={'visible-password'}
            />
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
            <TextInput
              style={[styles.input, {borderColor: theme.primaryColor}]}
              placeholderTextColor={theme.invertedBackgroundColor}
              placeholder={t('Enter confirm new password')}
              onChangeText={onChange}
              value={value}
              keyboardType={'visible-password'}
            />
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
    paddingVertical: 20,
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
export default ChangeUserPasswordForm;
