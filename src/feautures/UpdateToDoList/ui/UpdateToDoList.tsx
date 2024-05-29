import {Controller, useForm} from 'react-hook-form';
import {useAppDispatch} from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import React, {useCallback} from 'react';
import {updateToDoName} from '../model/services/updateToDoName.ts';
import {StyleSheet, TextInput, View} from 'react-native';
import PressableOpacity from '../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {useTheme} from '../../../app/providers/ThemeProvider';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        <Controller
          name="name"
          control={control}
          defaultValue={currentToDoName}
          rules={{minLength: 2, maxLength: 50}}
          render={({field}) => (
            <>
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
              <View />
            </>
          )}
        />
        <View style={styles.buttonWrapper}>
          <PressableOpacity
            style={[styles.button]}
            onPress={handleSubmit(onSubmit)}>
            <Icon
              name="check"
              style={[{color: theme.invertedPrimaryColor}]}
              size={24}
            />
          </PressableOpacity>
          <PressableOpacity
            style={[styles.button]}
            onPress={() => setIsEditToDoList(false)}>
            <Icon name="close" style={[{color: 'red'}]} size={24} />
          </PressableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 10,
  },
});