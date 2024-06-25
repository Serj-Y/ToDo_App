import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import React, {useCallback} from 'react';
import {createTask} from '../model/services/createTask.ts';
import {StyleSheet, TextInput, View} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import Icon from 'react-native-vector-icons/FontAwesome';
import ObjectID from 'bson-objectid';
import {
  useAppDispatch,
  useNetworkAvailability,
  useYupValidationResolver,
} from '@shared/lib/hooks';
import {PressableOpacity} from '@shared/ui';

type CreateTaskProps = {
  toDoId: string;
};
interface FormData {
  taskName: string;
}

export const CreateTask = ({toDoId}: CreateTaskProps) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {theme} = useTheme();
  const isConnected = useNetworkAvailability();

  const validationSchema = yup.object({
    taskName: yup.string().required(t('This field is required')),
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
      if (!isConnected) {
        const offlineId = new ObjectID();
        dispatch(
          createTask({
            taskName: data.taskName,
            toDoId,
            taskId: offlineId.toString(),
          }),
        );
        reset();
      } else {
        dispatch(createTask({taskName: data.taskName, toDoId}));
        reset();
      }
    },
    [dispatch, isConnected, reset, toDoId],
  );

  return (
    <View style={styles.container}>
      <Controller
        name="taskName"
        control={control}
        defaultValue=""
        render={({field}) => (
          <View
            style={[
              styles.inputWrapper,
              {borderColor: theme.invertedPrimaryColor},
            ]}>
            <TextInput
              {...field}
              style={[
                styles.input,
                {
                  color: theme.invertedPrimaryColor,
                  borderColor: theme.invertedPrimaryColor,
                },
              ]}
              placeholderTextColor={
                errors.taskName ? 'red' : theme.invertedPrimaryColor
              }
              placeholder={
                errors.taskName ? errors.taskName.message : t('Enter task name')
              }
              onChangeText={value => field.onChange(value)}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          </View>
        )}
      />
      <PressableOpacity
        style={[styles.button, {backgroundColor: theme.backgroundColor}]}
        onPress={handleSubmit(onSubmit)}>
        <Icon
          style={styles.buttonText}
          name={'plus'}
          color={theme.primaryColor}
        />
      </PressableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 4,
    width: '85%',
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
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
