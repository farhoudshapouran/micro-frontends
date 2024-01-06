import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//import { RootState } from "../store";

export interface AccountState {
  isAuthenticated: boolean;
  likedVideoList: string[];
  dislikedVideoList: string[];
  watchedVideos: string[];
  isWatchHistoryEnabled: boolean;
}

const initialState: AccountState = {
  likedVideoList: [],
  dislikedVideoList: [],
  isAuthenticated: false,
  watchedVideos: [],
  isWatchHistoryEnabled: true,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login } = accountSlice.actions;

export default accountSlice.reducer;

//export const selectLikedVideos = (state: RootState): string[] => state.account.likedVideoList;
