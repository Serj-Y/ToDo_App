import {useTranslation} from 'react-i18next';
import React, {memo, useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {changeUserName} from '../../model/services/changeUserName/changeUserName';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useAppDispatch} from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {useYupValidationResolver} from '../../../../shared/lib/hooks/useYupValidationResolver/useYupValidationResolver.ts';
import PressableOpacity from '../../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {useTheme} from '../../../../app/providers/ThemeProvider';

export interface ChangeUserNameFormProps {
  currentName?: string;
}

interface FormData {
  userName: string;
}
const ChangeUserNameForm = memo(
  ({currentName = 'userName'}: ChangeUserNameFormProps) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {theme} = useTheme();
    const validationSchema = yup.object({
      userName: yup
        .string()
        .required(t('This field is required'))
        .min(3, t('Minimum 3 symbols'))
        .max(15, t('Maximum 15 symbols')),
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
        const result = await dispatch(changeUserName({name: data.userName}));
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
          {t('Change user name')}
        </Text>
        <View>
          <Text style={[styles.text, {color: theme.primaryColor}]}>
            {t('Current user name')}
          </Text>
          <Text style={[styles.text, {color: theme.primaryColor}]}>
            {currentName}
          </Text>
          {isError && (
            <Text style={styles.errorText}>{t('Something went wrong')}</Text>
          )}
        </View>
        <Controller
          name="userName"
          control={control}
          defaultValue=""
          render={({field: {onChange, value}}) => (
            <>
              {errors.userName && (
                <Text style={styles.errorText}>{errors.userName?.message}</Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  {borderColor: theme.primaryColor, color: theme.primaryColor},
                ]}
                placeholderTextColor={theme.invertedBackgroundColor}
                placeholder={t('Enter new user name')}
                onChangeText={onChange}
                value={value}
                keyboardType="default"
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
          <Text
            style={[styles.buttonText, {color: theme.invertedPrimaryColor}]}>
            {t('Save changes')}
          </Text>
        </PressableOpacity>
      </View>
    );
  },
);

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
    padding: 5,
  },
  errorText: {
    color: 'red',
  },
});
export default ChangeUserNameForm;
