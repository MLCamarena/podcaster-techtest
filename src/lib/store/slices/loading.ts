import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const loading = createSlice({
  name: 'loading',
  initialState: {
    navigationLoading: false,
    networkLoading: false,
  },
  reducers: {
    setNavigationLoading: (state, action: PayloadAction<boolean>) => {
      state.navigationLoading = action.payload;
    },
    setNetworkLoading: (state, action: PayloadAction<boolean>) => {
      state.networkLoading = action.payload;
    },
  },
});

export const { setNavigationLoading, setNetworkLoading } = loading.actions;
export default loading.reducer;
