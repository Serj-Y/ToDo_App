import React, {memo, useState} from 'react';
import {ToDo} from '../../model/types/toDo.ts';
import {Card} from '../../../../shared/ui/Card/Card.tsx';
import {StyleSheet, Text, View} from 'react-native';
import {UpdateToDoList} from '../../../../feautures/UpdateToDoList';
import {DeleteToDo} from '../../../../feautures/DeleteToDo';
import {useTheme} from '../../../../app/providers/ThemeProvider';
import {CreateTask} from '../../../../feautures/CreateTask';
import {sortByOrder} from '../../../../shared/lib/sortByOrder/sortByOrder.ts';
import {DraggableTaskList} from '../../../Task/ui/DraggableTaskList/DraggableTaskList.tsx';
import PressableOpacity from '../../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ToDoListItemProps {
  toDo: ToDo;
}

export const ToDoListItem = memo(({toDo}: ToDoListItemProps) => {
  const [isEditToDoList, setIsEditToDoList] = useState<boolean>(false);
  const {theme} = useTheme();

  const setEditToDoListHandler = () => setIsEditToDoList(prev => !prev);

  const sortedTasks = [...toDo.tasks].sort(sortByOrder);

  return (
    <View style={styles.container} key={toDo._id}>
      <Card>
        <View style={styles.content}>
          {isEditToDoList ? (
            <View>
              <UpdateToDoList
                setIsEditToDoList={setIsEditToDoList}
                toDoId={toDo._id}
                currentToDoName={toDo.name}
              />
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <Text style={[styles.text, {color: theme.invertedPrimaryColor}]}>
                {toDo.name}
              </Text>
              <View style={styles.buttons}>
                <PressableOpacity
                  style={[styles.button]}
                  onPress={setEditToDoListHandler}>
                  <Icon
                    name="edit"
                    color={theme.invertedPrimaryColor}
                    size={24}
                  />
                </PressableOpacity>
                <DeleteToDo toDoIdForDelete={toDo._id} />
              </View>
            </View>
          )}
        </View>
        <DraggableTaskList dragItems={sortedTasks} toDo={toDo} />
        <CreateTask toDoId={toDo._id} />
      </Card>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    marginHorizontal: 15,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    maxWidth: '74%',
    textAlign: 'left',
    fontSize: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    marginHorizontal: 10,
  },
});
