import {useTranslation} from 'react-i18next';
import React, {memo, useCallback} from 'react';
import {useForm, Controller} from 'react-hook-form';
// import ObjectId from 'bson-ObjectId';
import * as yup from 'yup';
import {createToDo} from '../model/services/createToDo';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PressableOpacity from '../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {useAppDispatch} from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {useYupValidationResolver} from '../../../shared/lib/hooks/useYupValidationResolver/useYupValidationResolver.ts';
import {useTheme} from '../../../app/providers/ThemeProvider';
import {fetchToDo} from '../../../entities/ToDo/model/services/fetchToDo/fetchToDo.ts';

interface FormData {
  name: string;
}
export const CreateToDo = memo(() => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {theme} = useTheme();

  const validationSchema = yup.object({
    name: yup.string().required(t('This field is required')),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: useYupValidationResolver(validationSchema),
  });

  const onSubmit = useCallback(
    (data: FormData) => {
      if (false) {
        //isOffline
        // const offlineId = new ObjectId();
        // dispatch(createToDo({_id: offlineId.toString(), name: data.name}));
        // reset();
      } else {
        dispatch(createToDo(data)).then(() => {
          dispatch(fetchToDo({})); // toDo refactor this part temporal use
        });
        reset();
      }
    },
    [dispatch, reset],
  );

  return (
    <View style={styles.container}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({field}) => (
          <>
            {errors.name && (
              <Text style={styles.errorText}>{errors.name?.message}</Text>
            )}
            <View
              style={[styles.inputWrapper, {borderColor: theme.primaryColor}]}>
              <TextInput
                {...field}
                style={[
                  styles.input,
                  {
                    color: theme.primaryColor,
                    borderColor: theme.primaryColor,
                  },
                ]}
                placeholderTextColor={theme.invertedBackgroundColor}
                placeholder={t('Enter ToDo list name')}
                onChangeText={value => field.onChange(value)}
              />
            </View>
          </>
        )}
      />
      <PressableOpacity
        style={[
          styles.button,
          {backgroundColor: theme.invertedBackgroundColor},
        ]}
        onPress={handleSubmit(onSubmit)}>
        <Text style={[styles.buttonText, {color: theme.invertedPrimaryColor}]}>
          {t('Create To-Do')}
        </Text>
      </PressableOpacity>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  inputWrapper: {
    minWidth: '64%',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    paddingBottom: 10,
  },
  input: {
    alignItems: 'center',
    height: 40,
    padding: 8,
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
});
