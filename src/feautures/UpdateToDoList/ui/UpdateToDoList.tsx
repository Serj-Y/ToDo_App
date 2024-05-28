import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {useAppDispatch} from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import React, {useCallback} from 'react';
import {updateToDoName} from '../model/services/updateToDoName.ts';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PressableOpacity from '../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {useTheme} from '../../../app/providers/ThemeProvider';

type CreateToDoListProps = {
  setIsEditToDoList: React.Dispatch<React.SetStateAction<boolean>>;
  toDoId: string;
  currentToDoName: string;
};
interface FormData {
  name: string;
}
export const UpdateToDoList = ({
  toDoId,
  setIsEditToDoList,
  currentToDoName,
}: CreateToDoListProps) => {
  const {t} = useTranslation();
  const {control, handleSubmit} = useForm<FormData>();
  const dispatch = useAppDispatch();
  const {theme} = useTheme();

  const onSubmit = useCallback(
    (data: FormData) => {
      dispatch(updateToDoName({name: data.name, todoId: toDoId}));
      setIsEditToDoList(false);
    },
    [dispatch, setIsEditToDoList, toDoId],
  );
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <>
          <Controller
            name="name"
            control={control}
            defaultValue={currentToDoName}
            rules={{minLength: 2, maxLength: 50}}
            render={({field}) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.invertedPrimaryColor,
                    borderColor: theme.invertedPrimaryColor,
                  },
                ]}
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
        </>
        <>
          <PressableOpacity
            style={[styles.button, {backgroundColor: theme.backgroundColor}]}
            onPress={handleSubmit(onSubmit)}>
            <Text style={[styles.buttonText, {color: theme.primaryColor}]}>
              {t('Change name')}
            </Text>
          </PressableOpacity>
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 155, /// toDo temporal refactor !!!!!
  },
  input: {
    height: 40,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
  },
  text: {
    fontSize: 20,
  },
});
