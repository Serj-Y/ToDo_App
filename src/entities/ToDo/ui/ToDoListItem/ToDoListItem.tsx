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
            <>
              <UpdateToDoList
                setIsEditToDoList={setIsEditToDoList}
                toDoId={toDo._id}
                currentToDoName={toDo.name}
              />
              <View />
            </>
          ) : (
            <>
              <Text
                onLongPress={setEditToDoListHandler}
                style={[styles.text, {color: theme.invertedPrimaryColor}]}>
                {toDo.name}
              </Text>
              <DeleteToDo toDoIdForDelete={toDo._id} />
            </>
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
    marginHorizontal: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    maxWidth: '80%',
    textAlign: 'left',
    fontSize: 20,
  },
});
