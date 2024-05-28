import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from '../../../../../app/providers/StoreProvider';
import {getToDoHasInited} from '../../../../../entities/ToDo/model/selectors/toDoSelectors.ts';
import {toDoActions} from '../../../../../entities/ToDo/model/slice/toDoSlice.ts';
import {fetchToDo} from '../../../../../entities/ToDo/model/services/fetchToDo/fetchToDo.ts';

export const initToDoPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'toDoPage/initToDo',
  async (_, thunkAPI) => {
    const {getState, dispatch} = thunkAPI;
    const inited = getToDoHasInited(getState());

    if (!inited) {
      dispatch(toDoActions.initState());
      dispatch(fetchToDo({}));
    }
  },
);
