import {createSlice} from '@reduxjs/toolkit';
import {UserSchema} from '../types/user';
import {fetchUserData} from '../services/fetchUserData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '../../../../shared/consts/localStorage.ts';
import {signIn} from '../../../../feautures/Auth/SignIn/model/services/signIn/signIn.ts';
import {signUpByEmail} from '../../../../feautures/Auth/SignUp/model/services/signUpByEmail/signUpByEmail.ts';
import {changePassword} from '../../../../feautures/EditUser/model/services/changePassword/changePassword.ts';
import {changeUserName} from '../../../../feautures/EditUser/model/services/changeUserName/changeUserName.ts';

const initialState: UserSchema = {
  error: '',
  isLoading: false,
  authData: undefined,
  _inited: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initState: state => {
      state._inited = true;
    },
    logout: state => {
      state.authData = undefined;
      state._inited = false;
      AsyncStorage.removeItem(ACCESS_TOKEN);
      AsyncStorage.removeItem(REFRESH_TOKEN);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state._inited = true;
        state.authData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signIn.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state._inited = true;
        state.authData = action.payload.user;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpByEmail.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(signUpByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state._inited = true;
        state.authData = action.payload.user;
      })
      .addCase(signUpByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(changePassword.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state._inited = true;
        state.authData = action.payload.user;
        AsyncStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
        AsyncStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(changeUserName.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(changeUserName.fulfilled, (state, action) => {
        state.isLoading = false;
        state._inited = true;
        if (state.authData) {
          state.authData.name = action.payload.name;
        }
      })
      .addCase(changeUserName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {reducer: userReducer, actions: userActions} = userSlice;
