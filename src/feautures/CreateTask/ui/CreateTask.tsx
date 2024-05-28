import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {useYupValidationResolver} from '../../../shared/lib/hooks/useYupValidationResolver/useYupValidationResolver.ts';
import React, {useCallback} from 'react';
import {createTask} from '../model/services/createTask.ts';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PressableOpacity from '../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {useTheme} from '../../../app/providers/ThemeProvider';

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
      if (false) {
        // isOfline
        // const offlineId = new ObjectId();
        // dispatch(
        //   createTask({
        //     taskName: data.taskName,
        //     toDoId,
        //     taskId: offlineId.toString(),
        //   }),
        // );
        // reset();
      } else {
        dispatch(createTask({taskName: data.taskName, toDoId}));
        reset();
      }
    },
    [dispatch, reset, toDoId],
  );

  return (
    <View style={styles.container}>
      <Controller
        name="taskName"
        control={control}
        defaultValue=""
        render={({field}) => (
          <>
            {errors.taskName && (
              <Text style={styles.errorText}>{errors.taskName?.message}</Text>
            )}
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
                placeholderTextColor={theme.invertedPrimaryColor}
                placeholder={t('Enter task name')}
                onChangeText={value => field.onChange(value)}
              />
            </View>
          </>
        )}
      />
      <PressableOpacity
        style={[styles.button, {backgroundColor: theme.backgroundColor}]}
        onPress={handleSubmit(onSubmit)}>
        <Text style={[styles.buttonText, {color: theme.primaryColor}]}>
          {t('Create Task')}
        </Text>
      </PressableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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
