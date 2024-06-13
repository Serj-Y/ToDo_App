import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserResponse} from '@entities/User/model/types/user.ts';
import {ThunkConfig} from '@app/providers/StoreProvider';
import {baseApi} from '@shared/api/api.ts';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '@shared/consts/localStorage.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchToDo} from '@entities/ToDo';

interface LoginByUsernameProps {
  email: string;
  password: string;
}

export const signIn = createAsyncThunk<
  UserResponse,
  LoginByUsernameProps,
  ThunkConfig<string>
>('signIn/signIn', async (authData, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI;
  try {
    const response = await baseApi.post<UserResponse>('auth/login', authData);
    if (!response.data) {
      throw new Error();
    }
    AsyncStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
    AsyncStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
    dispatch(fetchToDo({}));
    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('error');
  }
});
