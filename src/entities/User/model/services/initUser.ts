import {createAsyncThunk} from '@reduxjs/toolkit';
import {getUserInited} from '@entities/User';
import {fetchUserData} from './fetchUserData';
import {userActions} from '../slice/userSlice';
import {ThunkConfig} from '@app/providers/StoreProvider';

export const initUser = createAsyncThunk<void, void, ThunkConfig<string>>(
  'user/initUser',
  async (_, thunkAPI) => {
    const {getState, dispatch} = thunkAPI;

    const inited = getUserInited(getState());

    if (!inited) {
      dispatch(userActions.initState());
      dispatch(fetchUserData());
    }
  },
);
