import React, {useEffect} from 'react';
import {useTheme} from '../../../app/providers/ThemeProvider';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../../widgets/Header';
import {ToDoList} from '../../../entities/ToDo';
import {useAppDispatch} from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {useSelector} from 'react-redux';
import {
  getToDoError,
  getToDoHasInited,
  getToDoIsLoading,
} from '../../../entities/ToDo/model/selectors/toDoSelectors.ts';
import {getToDo} from '../../../entities/ToDo/model/slice/toDoSlice.ts';
import {CreateToDo} from '../../../feautures/CreateToDo';
import {getUserInited} from '../../../entities/User';
import {ACCESS_TOKEN} from '../../../shared/consts/localStorage.ts';
import {initUser} from '../../../entities/User/model/services/initUser.ts';
import {initToDo} from '../model/initToDo/initToDo.ts';

const MainScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getToDoIsLoading);
  const error = useSelector(getToDoError);
  const inited = useSelector(getToDoHasInited);
  const toDo = useSelector(getToDo.selectAll);
  const userInited = useSelector(getUserInited);

  useEffect(() => {
    if (!ACCESS_TOKEN) {
      dispatch(initUser());
    }
  }, [dispatch]);

  // useEffect(() => {
  //     if (isFocus) {
  //         setTimeout(() => { dispatch(fetchToDo({})); }, 2000);
  //     }
  // }, [dispatch, isFocus]);

  useEffect(() => {
    dispatch(initToDo());
  });
  const {theme} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Header />
      {userInited && (
        <>
          <CreateToDo />
          <View style={styles.content}>
            {inited && <ToDoList toDos={toDo} />}
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});
export default MainScreen;
