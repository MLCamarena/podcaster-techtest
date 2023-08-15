import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const loading = createSlice({
  name: '[@LOADING]',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = loading.actions;
export default loading.reducer;
