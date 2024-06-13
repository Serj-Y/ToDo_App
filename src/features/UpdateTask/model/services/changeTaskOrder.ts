import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from '@app/providers/StoreProvider';
import {Task} from '@entities/Task';

interface ChangeTaskOrderProps {
  firstId: string;
  secondId: string;
  toDoId: string;
  replace?: boolean;
}

export const changeTaskOrder = createAsyncThunk<
  Task,
  ChangeTaskOrderProps,
  ThunkConfig<string>
>('toDo/task/changeTaskOrder', async (taskSwap, thunkAPI) => {
  const {extra, dispatch, rejectWithValue} = thunkAPI;
  const forSwap = {
    firstTaskId: taskSwap.firstId,
    secondTaskId: taskSwap.secondId,
    toDoId: taskSwap.toDoId,
  };
  try {
    const response = await extra.api.put<Task>('task/swap-orders', forSwap);
    if (!response.data) {
      rejectWithValue(response.statusText);
    }
    return response.data;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue('error');
  }
});
