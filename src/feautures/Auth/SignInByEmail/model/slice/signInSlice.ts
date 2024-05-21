import { createSlice } from '@reduxjs/toolkit';
import { SignInSchema } from '../types/signInSchema';
import { signIn } from '../services/signIn/signIn.ts';

const initialState:SignInSchema = {
    isLoading: false,
    error: undefined,
};
export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signIn.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: signInActions } = signInSlice;
export const { reducer: signInReducer } = signInSlice;
