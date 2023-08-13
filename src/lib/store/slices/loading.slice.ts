import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const loading = createSlice({
  name: '[@LOADING]',
  initialState: {
    navigationLoading: false,
  },
  reducers: {
    setNavigationLoading: (state, action: PayloadAction<boolean>) => {
      state.navigationLoading = action.payload;
    },
  },
});

export const { setNavigationLoading } = loading.actions;
export default loading.reducer;
